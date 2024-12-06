import { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { AppContext } from '../Context';

const Notification = ({ ID, type, value }) => {
  const { achievementNotifydisable,setachievementNotifydisable } = useContext(AppContext);
  const [Notify, setNotify] = useState([]);
  const [disable, setdisable] = useState(true);


  useEffect(() => {
    axios.post('http://172.20.10.4:3000/achievement/check', {
      ID,
      type,
      value,
    }).then(response => {
      setNotify(response.data);
      if (response.data.length > 0 && achievementNotifydisable == true) {
        setdisable(false);
        setachievementNotifydisable(false);
        const timer = setTimeout(() => {
          setdisable(true);
        }, 3000);

        return () => clearTimeout(timer);
      }
    });
  }, [ID, type, value]);

  return (
    <View style={{ flex: 1 }}>
      {!disable &&
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ width: '26%', height: '105%', right: '-10%', borderWidth: 3, borderRadius: 100, borderColor: 'rgba(230,230,210,1)', backgroundColor: 'rgba(255,255,250,1)', zIndex: 1, shadowColor: 'rgba(255,255,255,1)', shadowOpacity: 0.8 }}>

          </View>
          <View style={{ borderWidth: 1, width: '80%', height: '100%', borderColor: 'rgba(100,100,100,0.5)', justifyContent: 'flex-start', alignItems: 'flex-end', paddingHorizontal: '2%', borderTopRightRadius: 100, borderBottomRightRadius: 100, backgroundColor: 'rgba(255,255,235,1)', shadowColor: 'rgba(255,255,255,1)', shadowOpacity: 0.4 }}>
            <View style={{ width: '85%', height: '35%', borderBottomColor: 'rgba(150,150,150,0.5)', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={{ width: '95%', textAlign: 'left', fontSize: 20, fontWeight: 'bold', color: 'rgba(100,100,100,0.7)' }}>{Notify[0].Name}</Text>
            </View>
            <View style={{ width: '85%', height: '60%', justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={{ width: '95%', height: '105%', textAlign: 'left', fontSize: 15 }}>{Notify[0].Discription}</Text>
            </View>
          </View>

        </View>
      }
    </View>
  )
};

export default Notification;