import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Screens/HomeScreen";
import FoodDetails from './Screens/FoodDetails';
const Stack = createNativeStackNavigator();
export default function App(){
  return (
    <NavigationContainer>
    {/* Initial page load in Stack with header styling and statubar styling */}
      <Stack.Navigator initialRouteName='Home'  screenOptions={{
          headerTitleAlign : "center",
          headerTitleStyle : { fontWeight : "bold", },
          statusBarColor : "white",
          statusBarStyle : "dark"
        }}>
        {/* Stacks in App */}
        <Stack.Screen name = "Home" component={HomeScreen}/>
        <Stack.Screen name = "Food Details" component={FoodDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}