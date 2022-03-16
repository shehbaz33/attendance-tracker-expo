import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading  from 'expo-app-loading';
import { useState } from 'react';
import fetchFonts from './useFonts';
import colors from './assets/colors/colors';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './redux/store';
import { Provider } from 'react-redux';
const Stack = createNativeStackNavigator();
import { useSelector, useDispatch } from 'react-redux';


function App () {
  const [dataLoaded,setDataLoaded] = useState(false)
  const token = useSelector((state) => state.user.token)
  const loadFont = async () => {
    await fetchFonts();
  }
  if(!dataLoaded){
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => setDataLoaded(true)}
        onError={() => {}}
      />
    );
  }
  
  return (
    <NavigationContainer>
        <Stack.Navigator>
          {
            token ?
              <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
            : <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
          }
            
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Wrapper  () {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.accents,
    alignItems: 'center',
    justifyContent: 'center',
  },
});