import axios from "axios";

const handleButtonClick = (Feedcount, setFeedcount) => {
  const newFeedCount = Feedcount + 1;
  axios.post('http://172.20.10.4:3000/feed', {
    Feedcount: newFeedCount
  })
    .then(response => {
      setFeedcount(newFeedCount);
      console.log('後端響應: ', response.data);
    })
    .catch(error => {
      console.error('更新參數出錯(Feedcount): ', error);
    });
};

export default handleButtonClick;