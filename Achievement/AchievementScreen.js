import { useEffect, useState, useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { AppContext } from "../Context";

const AchievementScreen = ({ route }) => {
  const { userid } = route.params;
  const { setgetexperience, setgetcoin } = useContext(AppContext);
  const [achievement, setachievement] = useState([]);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/achievement', {
      params: {
        ID: userid
      }
    }).then(response => {
      const sortedAchievement = response.data.sort((a, b) => {
        const sequence1 = a.Condition <= a.schedulevalue;
        const sequence2 = b.Condition <= b.schedulevalue;

        if (sequence1 && !sequence2) return -1;
        if (!sequence1 && sequence2) return 1;
        return 0;
      });
      setachievement(sortedAchievement);
    });
  }, [userid, achievement]);

  const CallContextAndRecordAPI = (experience, coin, Achievement_ID) => {
    setgetexperience(experience);
    setgetcoin(coin);
    axios.post('http://172.20.10.4:3000/achievement/modify', {
      userid,
      Achievement_ID,
    }).then(() => {
      setachievement(Achievement =>Achievement.filter(item => item.Achievement_ID !== Achievement_ID));
    }).catch(error => {
      console.error("Error updating achievement:", error);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/img/Bubbles.png')} style={{ position: 'absolute', width: '100%', height: '300%' }} />

        <ScrollView contentContainerStyle={{ width: '100%', paddingVertical: '8%', paddingHorizontal: '5%' }} style={{ width: '100%', height: '100%' }} scrollEnabled={true}>

          {achievement.map((item, index) => (
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.1)', 'rgba(92, 225, 230, 0.6)']}
              start={{ x: 0.3, y: 0.6 }}
              end={{ x: 0.8, y: 0.1 }}
              style={{ width: '100%', height: '60', borderRadius: 5, marginVertical: '2%' }}
              key={index}
            >
              <View style={{ borderWidth: 4, borderRadius: 5, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0)', width: '100%', height: '60', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }} >
                <View style={{ width: '40%', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 30, textAlign: 'left', color: 'rgba(255,255,255,1)' }}>{item.Name}</Text>
                  <Text style={{ fontSize: 13, textAlign: 'left', color: 'rgba(255,255,255,0.7)' }}>成就目標: {item.Title}</Text>
                </View>
                <View style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, textAlign: 'left', color: 'rgba(255,255,255,0.5)' }}>{item.schedulevalue} / {item.Condition}</Text>
                </View>
                <View style={{ width: '25%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>獎勵:</Text>
                    <View style={{ width: '80%', height: '100%' }}>
                      <View style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                        <Text style={{ width: '29%', height: '100%', fontSize: 20, textAlign: 'left', color: 'rgba(0,0,255,1)' }}>EX</Text>
                        <Text style={{ width: '71%', height: '100%', fontSize: 20, textAlign: 'left', color: 'rgba(255,255,255,1)' }}>{item.Experience}</Text>
                      </View>
                      <View style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                        <Image source={require('../assets/img/Gold_Icon.png')} style={{ width: '30%', height: '100%', right: '20%' }} />
                        <Text style={{ width: '70%', height: '100%', fontSize: 20, textAlign: 'left', color: 'rgba(255,255,255,1)' }}>{item.Coin}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderLeftColor: 'rgba(50,50,50,1)', borderColor: 'rgba(0,0,0,0)', paddingHorizontal: '1%' }}>
                  {item.schedulevalue >= item.Condition ? (
                    <TouchableOpacity style={{ borderWidth: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 2, width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center', marginHorizontal: '5%' }} onPress={() => CallContextAndRecordAPI(item.Experience, item.Coin, item.Achievement_ID)}>
                      <Text style={{ color: 'rgba(255,255,255,1)', textAlign: 'center' }}>領取</Text>
                    </TouchableOpacity>
                  ) : (
                    null
                  )}
                </View>

              </View>
            </LinearGradient>
          ))}

        </ScrollView>
      </View>
    </View>
  )
};

export default AchievementScreen;