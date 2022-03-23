import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useState, useEffect } from "react";
import fetchFonts from "./useFonts";
import colors from "./assets/colors/colors";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Company from "./screens/Company";
import Attendance from "./screens/Attendance";
import Hyperlinks from "./screens/Hyperlinks";
import Notification from "./screens/Notification";
import StatusReport from "./screens/StatusReport";
import AttendanceDetails from "./screens/AttendanceDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [localToken, setLocalToken] = useState();
  const token = useSelector((state) => state.user.token);
  const loadFont = async () => {
    await fetchFonts();
  };
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => setDataLoaded(true)}
        onError={() => {}}
      />
    );
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setLocalToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  console.log(localToken);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Company"
              component={Company}
              options={{ headerShown: false }}
              initialParams={{ token: localToken }}
            />
            <Stack.Screen
              name="Attendance"
              component={Attendance}
              options={{ headerShown: false }}
              initialParams={{ token: localToken }}
            />
            <Stack.Screen
              name="Hyperlinks"
              component={Hyperlinks}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StatusReport"
              component={StatusReport}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AttendanceDetails"
              component={AttendanceDetails}
              options={{ headerShown: false }}
              initialParams={{ token: localToken }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.accents,
    alignItems: "center",
    justifyContent: "center",
  },
});
