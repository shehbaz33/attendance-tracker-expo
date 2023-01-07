import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useState, useEffect } from "react";
import fetchFonts from "./useFonts";
import colors from "./assets/colors/colors";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Company from "./screens/Company";
import RegisterCompany from "./screens/RegisterCompany";
import Employee from "./screens/Employee";
import AddEmployee from "./screens/AddEmployee";
import EmployeeCSV from "./screens/EmployeeCSV";
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
import { updateStart, updateSuccess, updateError } from "./redux/userSlice";

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const [localToken, setLocalToken] = useState();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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
        dispatch(updateSuccess(value));
        setLocalToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {isLoggedIn ? ( */}
          <Stack.Group>
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
              name="RegisterCompany"
              component={RegisterCompany}
              options={{ headerShown: false }}
              initialParams={{ token: localToken }}
            />
            <Stack.Screen
              name="Employee"
              component={Employee}
              options={{ headerShown: false }}
              initialParams={{ token: localToken }}
            />
            <Stack.Screen
              name="AddEmployee"
              component={AddEmployee}
              options={{ headerShown: false }}
              initialParams={{ token: localToken }}
            />
            <Stack.Screen
              name="EmployeeCSV"
              component={EmployeeCSV}
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
          </Stack.Group>
        {/* ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        )} */}
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
