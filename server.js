const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const fs = require('fs');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const mariadb = require('mariadb');

const app = express();
const upload = multer();
const port = 3000;

const streamURL = 'http://172.20.10.4:8080/hls/stream.m3u8';

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'a123',
  database: 'Parameter',
  connectionLimit: 20
});

const pool2 = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'a123',
  database: 'testdb',
  connectionLimit: 20
});



app.use(express.json());

//---------------------------------------------------------------------------------------------------------------------

//Conversion to JPG
ffmpeg.setFfprobePath(ffmpegPath);//'D:\\ffmpeg-7.0.2-full_build\\bin\\ffprobe.exe'


app.post('/VideoParameter', upload.none(), (req, res) => {
  const { timestamp, x, y } = req.body;

  if (!streamURL || !timestamp || !x || !y) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const tempFilePath = path.join(__dirname, '/Image/VideoToImg.jpg');

  ffmpeg(streamURL)
    .seekInput(timestamp)
    .frames(1)
    .outputOptions('-q:v 2')
    .save(tempFilePath)
    .on('end', () => {
      //console.log(tempFilePath);

      const image = fs.readFileSync(tempFilePath, { encoding: 'base64' });

      axios.post("https://detect.roboflow.com/illustrated-book/11", image, {
        params: {
          api_key: "tepF6pPS3aR3JHkLc7p9"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(async (response) => {
          predictions = (response.data).predictions;
          const matchingPredictions = predictions.filter(prediction => {
            const distance = Math.sqrt(Math.pow((x - prediction.x), 2) + Math.pow((y - prediction.y), 2));
            if (distance < 20) {
              return prediction;
            }
          })
          try {
            const testdata = 'Nannostomus digrammus';
            const sql = "SELECT * FROM fish_information  WHERE Scientific_name = ?";
            const conn = await pool.getConnection();
            const result = await conn.query(sql, [testdata]);//matchingPredictions[0]['class']
            conn.release();
            //console.log(result);
            if (result.length > 0) {
              res.json({
                data: result,
                image: `data:image/jpeg;base64,${image}`
              });
            } else {
              res.status(200).send('Database not find this class..');
            }
          } catch (error) {
            res.status(500).send('Server error');
          }
        })
        .catch((error) => {
          console.log('Connect to roboflow Error:', error.message);
        });
    })
    .on('error', (err) => {
      console.error('Error extracting frame:', err);
      res.status(500).json({ error: 'Failed to process video' });
    });
});

//---------------------------------------------------------------------------------------------------------------------

//POST Account&Password
app.post('/login', async (req, res) => {
  const { account, password } = req.body;
  try {
    const sql = 'SELECT * FROM user_account WHERE email = ? AND password = ?';
    const conn = await pool2.getConnection();
    const result = await conn.query(sql, [account, password]);
    conn.release();
    if (result.length > 0) {
      res.json(result);
      console.log(result);
      try {
        const pool_conn = await pool.getConnection();
        const update_sql = 'UPDATE personaldata SET Days = Days + 1, Login = "TRUE" WHERE ID = ? AND Login = "FALSE";';
        await pool_conn.query(update_sql, [result[0].id]);

        const Personaldata_sql = 'SELECT * FROM personaldata WHERE ID = ?;';
        const Personaldata_result = await pool_conn.query(Personaldata_sql, [result[0].id]);

        if (Personaldata_result.length === 0) {
          console.log(Personaldata_result.length);
          const INSERT_Personaldata_sql = 'INSERT INTO personaldata(ID) VALUE(?)';
          await pool_conn.query(INSERT_Personaldata_sql, [result[0].id]);

          const INSERT_coin_sql = 'INSERT INTO coin(ID) VALUE(?)';
          await pool_conn.query(INSERT_coin_sql, [result[0].id]);

          const INSERT_experiencebar_sql = 'INSERT INTO experiencebar(ID) VALUE(?)';
          await pool_conn.query(INSERT_experiencebar_sql, [result[0].id]);

          const esp32_response = await axios.get('http://172.20.10.10:80/ESP32ID');
          const INSERT_feed_sql = 'INSERT INTO feed(ID,esp32_name) VALUE(?, ?)';
          await pool_conn.query(INSERT_feed_sql, [result[0].id, esp32_response.data.ESP32ID]);

          pool_conn.release();
        }
      } catch (error) {
        console.error('Error inserting:', error);
      }
    } else {
      res.status(200).send('Invalid account or password');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

//---------------------------------------------------------------------------------------------------------------------



//GET Day FROM personaldata
app.get('/personaldata/days', async (req, res) => {
  const { ID } = req.query;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT Days FROM personaldata WHERE ID = ?', [ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Upload AvatarURI Error: ', err);
    res.status(500).send('Upload AvatarURI Error...');
  }
});

//POST Tasknum TO personaldata
app.post('/personaldata/Tasknum', async (req, res) => {
  const { ID } = req.body;

  const sql = 'UPDATE personaldata SET Tasknum = Tasknum + 1 WHERE ID = ?';
  const select_tasknum = 'SELECT Tasknum FROM personaldata WHERE ID = ?';

  try {
    const conn = await pool.getConnection();
    await conn.query(sql, [ID]);
    const result = await conn.query(select_tasknum, [ID]);
    conn.release();
    //console.log('SET Tasknum Success!');
    res.json(result)
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});

//---------------------------------------------------------------------------------------------------------------------

//POST achievement TO Achievement
app.post('/achievement/check', async (req, res) => {
  const { ID, type, value } = req.body;
  const SELECT_sql = 'SELECT Achievement_ID, Name, Discription FROM achievement WHERE Type = ? AND `Condition` = ?';
  const INSERT_sql = 'INSERT INTO achievementrecord(ID, Achievement_ID) VALUE(?, ?)';
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(SELECT_sql, [type, value]);
    console.log('will INSERT to Achievementrecord', result);
    if (result.length > 0) {
      res.json(result);
      await conn.query(INSERT_sql, [ID, result[0].Achievement_ID]);
    };
    conn.release();
  } catch (error) {
    console.error(error);
  }
});

//GET AchievementRecord
app.get('/AchievementRecord', async (req, res) => {
  const { ID } = req.query;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT Name FROM Achievementrecord WHERE ID = ? AND FINISH = "TRUE"', [ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Upload AvatarURI Error: ', err);
    res.status(500).send('Upload AvatarURI Error...');
  }
});

//POST FINISH FROM AchievementRecord
app.post('/achievement/modify', async (req, res) => {
  const { userid, Achievement_ID } = req.body;

  const sql = 'UPDATE achievementrecord SET FINISH = "TRUE" WHERE ID = ? AND Achievement_ID = ?';
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [userid, Achievement_ID]);
    conn.release();
    //console.log('SET FINISH Success!');
    //res.send('SET FINISH Success!');
  } catch (err) {
    console.error('Update FINISH Unsuccess: ', err);
    res.status(500).send('Update FINISH Unsuccess...');
  }
});
//---------------------------------------------------------------------------------------------------------------------

//POST AvatarURI
app.post('/AvatarURI', async (req, res) => {
  const { ID, localPhotoUri } = req.body;

  const sql = 'UPDATE personaldata SET AvatarURI = ? WHERE ID = ?';

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [localPhotoUri, ID]);
    conn.release();
    //console.log('SET AvatarURI Success!');
    res.send('SET AvatarURI Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});

//GET AvatarURI
app.get('/AvatarURI', async (req, res) => {
  const { ID } = req.query;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT AvatarURI FROM personaldata WHERE ID = ?', [ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Upload AvatarURI Error: ', err);
    res.status(500).send('Upload AvatarURI Error...');
  }
});

//---------------------------------------------------------------------------------------------------------------------

//POST ScreenCapture
app.post('/ScreenCapture', upload.none(), (req, res) => {
  const { timestamp } = req.body;

  if (!streamURL || !timestamp) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const ScreenCaptureIMGPath = path.join(__dirname, '/Image/ScreenCaptureIMG.jpg');

  ffmpeg(streamURL)
    .seekInput(timestamp)
    .frames(1)
    .outputOptions('-q:v 2')
    .save(ScreenCaptureIMGPath)
    .on('end', () => {
      //console.log(ScreenCaptureIMGPath);

      const ScreenCaptureIMG = fs.readFileSync(ScreenCaptureIMGPath, { encoding: 'base64' });
      try {
        res.json({ image: `data:image/jpeg;base64,${ScreenCaptureIMG}` });
      } catch (error) {
        res.status(200).send("Can't send CaptureIMG...");
      }
    })
    .on('error', (err) => {
      console.error('Error extracting frame:', err);
      res.status(500).json({ error: 'Failed to process video' });
    });
});

//---------------------------------------------------------------------------------------------------------------------

// GET API for Coins
app.get('/coin', async (req, res) => {
  const { ID } = req.query;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM coin WHERE ID = ?', [ID]);
    conn.release();
    res.json(result);
  } catch (err) {
    console.error('Update Coins Error: ', err);
    res.status(500).send('Update Coins Error...');
  }
});

//POST API for Coins
app.post('/coin', async (req, res) => {
  const { ID, coin } = req.body;
  //console.log(req.body);

  const sql = `UPDATE coin SET Coins = ? WHERE ID = ?`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [coin, ID]);
    conn.release();
    //console.log('Update coin Success!');
    res.send('Update coin Success!');
  } catch (err) {
    console.error('Update coin Unsuccess: ', err);
    res.status(500).send('Update coin Unsuccess...');
  }
})

//---------------------------------------------------------------------------------------------------------------------

// GET API for Name
app.get('/personaldata/Name', async (req, res) => {
  const { ID } = req.query;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT Name FROM personaldata WHERE ID = ?', [ID]);
    conn.release();
    res.status(200).json(result);
    //console.log(result);
  } catch (err) {
    console.error('Update Error: ', err);
    res.status(500).send('Update Error...');
  }
});

// POST API for Name
app.post('/personaldata/Name', async (req, res) => {
  const { ID, Name } = req.body;
  //console.log('Request Body:', req.body);

  const sql = `UPDATE personaldata SET Name = ? WHERE ID = ?`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [Name.toString(), ID]);
    conn.release();
    //console.log('Update Introduction Success!');
    res.send('Update Introduction Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});

//---------------------------------------------------------------------------------------------------------------------

// GET API for Introdution
app.get('/personaldata/Introduction', async (req, res) => {
  const { ID } = req.query;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT Introduction FROM personaldata', [ID]);
    conn.release();
    res.status(200).json(result)
    //console.log(result);
  } catch (err) {
    console.error('Update Error: ', err);
    res.status(500).send('Update Error...');
  }
});

// POST API for Introdution
app.post('/personaldata/Introduction', async (req, res) => {
  const { ID, Introduction } = req.body;
  //console.log('Data(Introduction):', req.body);

  const sql = `UPDATE personaldata SET Introduction = ? WHERE ID = ?`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [Introduction.toString(), ID]);
    conn.release();
    //console.log('Update Introduction Success!');
    res.send('Update Introduction Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});
//---------------------------------------------------------------------------------------------------------------------

// GET API for feed
app.get('/feed', async (req, res) => {
  const { ID } = req.query;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT Feedcount FROM feed WHERE ID = ?', [ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Update Error: ', err);
    res.status(500).send('Update Error...');
  }
});

// POST API for feed
app.post('/feed', async (req, res) => {
  const { ID, Feedcount } = req.body;

  const sql = `UPDATE feed SET Feedcount = ? WHERE ID = ?`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [Feedcount, ID]);
    conn.release();
    //console.log('Update Feed Success!');
    res.send('Update Feed Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});

// ESP32 GET API for feed
app.get('/feed/ESP32', async (req, res) => {
  const { ESP32ID } = req.query;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT Feedcount FROM feed WHERE esp32_name = ?', [ESP32ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Update Error: ', err);
    res.status(500).send('Update Error...');
  }
});

// ESP32 POST API for feed
app.post('/feed/ESP32', async (req, res) => {
  const { ID, Feedcount } = req.body;

  const sql = `UPDATE feed SET Feedcount = ? WHERE ID = ?`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [Feedcount, ID]);
    conn.release();
    //console.log('Update Feed Success!');
    res.send('Update Feed Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});
//---------------------------------------------------------------------------------------------------------------------

//GET API for target
app.get('/targets', async (req, res) => {
  const { ID } = req.body;
  const sql = `
                (
                SELECT Target FROM user_add_task
                WHERE ID = ? ORDER BY RAND() LIMIT 2
                )
                UNION ALL
                (
                    SELECT Target FROM target
                    WHERE Type = 'DEFAULT' ORDER BY RAND() LIMIT 3
                )
                LIMIT 3;`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Update target False: ', err);
    res.status(500).send('Update target Unsuccess...');
  }
});



// POST API for Select USER TARGET
app.post('/usertarget', async (req, res) => {
  const { ID, Select_Target } = req.body;
  //console.log(req.body);

  const sql = `INSERT INTO user_target (ID, SELECTED_Target) VALUES(?,?)`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [ID, Select_Target]);
    conn.release();
    //console.log('Update usertarget Success!');
    res.send('Update usertarget Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});

//GET API of USER TARGET
app.get('/usertarget', async (req, res) => {
  const { ID } = req.query;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM user_target WHERE ID = ?', [ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Update taskmodal False: ', err);
    res.status(500).send('Update taskmodal Unsuccess...');
  }
});

//POST API of USER TARGET
app.post('/usertarget/rewardstatus', async (req, res) => {
  const { ID, Serialnumber } = req.body;
  //console.log(req.body);

  const sql = `UPDATE user_target SET ${Serialnumber} = ? WHERE ID = ?`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, ['TRUE', ID]);
    conn.release();
    //console.log('Update usertarget Success!');
    res.send('Update usertarget Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});
//---------------------------------------------------------------------------------------------------------------------

// GET API for experiencebar
app.get('/experiencebar', async (req, res) => {
  const { ID } = req.query;

  const sql = 'SELECT * FROM experiencebar WHERE ID = ?';

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [ID]);
    conn.release();
    res.json(result);
    //console.log(result);
  } catch (err) {
    console.error('Update False: ', err);
    res.status(500).send('Update False...');
  }
});

// POST API for experiencebar
app.post('/experiencebar', async (req, res) => {
  const { ID, currentExperience, totalExperience, level } = req.body;
  //console.log('Data(experiencebar):', req.body);

  const sql = `UPDATE experiencebar SET 
               currentExperience = ?,
               totalExperience = ?,
               level = ? WHERE ID = ?`;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [currentExperience, totalExperience, level, ID]);
    conn.release();
    //console.log('Update Experience Success!');
    res.send('Update Experience Success!');
  } catch (err) {
    console.error('Update Unsuccess: ', err);
    res.status(500).send('Update Unsuccess...');
  }
});

//---------------------------------------------------------------------------------------------------------------------

// GET API for Store
app.get('/store', async (req, res) => {
  const { ID } = req.query;
  try {
    const conn = await pool2.getConnection();
    const result = await conn.query('SELECT * FROM products WHERE id = ?', [ID]);
    conn.release();
    res.status(200).json(result);
    //console.log(result);
  } catch (err) {
    console.error('Update Store Error: ', err);
    res.status(500).send('Update Store Error...');
  }
});

// POST API for store
app.post('/store', async (req, res) => {
  const { ID, name, stock } = req.body;
  //console.log('Data(store):', req.body);

  const sql = 'UPDATE products SET stock = ? WHERE id = ? AND name = ?';

  try {
    const conn = await pool2.getConnection();
    const result = await conn.query(sql, [stock, ID, name]);
    conn.release();
    //console.log('Update store Success!');
    res.send('Update store Success!');
  } catch (err) {
    console.error('Update storeUnsuccess: ', err);
    res.status(500).send('Update store Unsuccess...');
  }
});

//---------------------------------------------------------------------------------------------------------------------

// GET API for achievement
app.get('/achievement', async (req, res) => {
  const { ID } = req.query;
  try {
    const conn = await pool.getConnection();
    const result_achievement = await conn.query(`SELECT * FROM achievement WHERE Achievement_ID NOT IN (
           SELECT Achievement_ID 
           FROM achievementrecord 
           WHERE ID = ? AND FINISH = "TRUE"
       )`, [ID]);

    for (let achievement of result_achievement) {
      let value;

      switch (achievement.Type) {
        case 'Tasknum':
          const personalData = await conn.query('SELECT Tasknum FROM personaldata WHERE ID = ?', [ID]);
          value = personalData[0].Tasknum;
          break;

        case 'Days':
          const personalDays = await conn.query('SELECT Days FROM personaldata WHERE ID = ?', [ID]);
          value = personalDays[0].Days;
          break;

        case 'Level':
          const experienceData = await conn.query('SELECT level FROM experiencebar WHERE ID = ?', [ID]);
          value = experienceData[0].level;
          break;
      }
      achievement.schedulevalue = value;
    }

    conn.release();
    res.status(200).json(result_achievement);
    //console.log(result_achievement);

  } catch (err) {
    console.error('Update achievement Error: ', err);
    res.status(500).send('Update achievement Error...');
  }
});

const sharp = require('sharp'); // 用於圖像裁剪
app.post('/VideoParameter/test', async (req, res) => {
  const { x, y, width, height } = req.body;
  const tempFilePath = path.join(__dirname, '/Image/VideoToImg.jpg');
  const image = fs.readFileSync(outputFilePath, { encoding: 'base64' });
  const outputFilePath = path.join(__dirname, '/Image/CroppedImage.jpg');

  await sharp(tempFilePath)
    .extract({ left: Math.round(x), top: Math.round(y), width: Math.round(width), height: Math.round(height) }) // 裁剪
    .toFile(outputFilePath);
    axios.post("https://detect.roboflow.com/illustrated-book/11", image, {
      params: {
        api_key: "tepF6pPS3aR3JHkLc7p9"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(async (response) => {
        predictions = (response.data).predictions;
        console.log('prediction_json:', predictions);
      })
      .catch((error) => {
        console.log('Connect to roboflow Error:', error.message);
      });
  })
  .on('error', (err) => {
    console.error('Error extracting frame:', err);
    res.status(500).json({ error: 'Failed to process video' });
});
//---------------------------------------------------------------------------------------------------------------------

// Start server
app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
