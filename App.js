import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Home from './Home/Home';
import ShoppingScreen from './Store/ShoppingScreen';
import AchievementScreen from './Achievement/AchievementScreen';
import WareHouseScreen from './WareHouse/WareHouseScreen';
import { AppProvider } from './Context';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ title: ' ', headerTransparent: true, headerStyle: { height: 0 } }} />
          <Stack.Screen name="Home" component={Home} options={{ title: ' ', headerTransparent: true, headerStyle: { height: 0 } }} />
          <Stack.Screen name="store" component={ShoppingScreen} options={{ title: ' ',headerTransparent: true, headerBackTitle: '返回' }} />
          <Stack.Screen name="warehouse" component={WareHouseScreen} options={{ title: ' ', presentation: 'modal', headerTransparent: true, headerBackTitle: '返回' }} />
          <Stack.Screen name="achievement" component={AchievementScreen} options={{ title: ' ', headerTransparent: true, headerBackTitle: '返回' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};