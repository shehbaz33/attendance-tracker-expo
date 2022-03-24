import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import React, { useEffect } from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import AttendanceCard from "../components/AttendanceCard";
import { useIsFocused } from "@react-navigation/native";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AttendanceUpdateStart,
  AttendanceUpdateSuccess,
  AttendanceUpdateError,
} from "../redux/attendanceSlice";
import Empty from "../components/Empty";

const Attendance = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { token } = route.params;
  const dispatch = useDispatch();

  const getAllAttendance = async () => {
    dispatch(AttendanceUpdateStart());
    await axios({
      method: "get",
      url: "http://192.168.0.105:5000/api/v1/todaysattendance",
      headers: { token: token },
    })
      .then((res) => {
        dispatch(AttendanceUpdateSuccess(res.data.attendance));
      })
      .catch((err) => {
        dispatch(AttendanceUpdateError());
        console.log(err.response.data);
      });
  };

  const date = new Date();

  const data = useSelector((state) => state.attendance.attendance);
  const loading = useSelector((state) => state.attendance.pending);

  useEffect(() => {
    getAllAttendance();
  }, [token, isFocused]);

  const checkEmpty = () => {
    if (loading) {
      return (
        <View style={{ flex: 1, marginTop: 50, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#D46200" />
        </View>
      );
    } else if (data.length == 0) {
      return <Empty title={"No attendance marked yet"} />;
    }
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <AttendanceCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        extraData={data}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Dashboard")}>
          <View style={styles.square}>
            <Ionicons name="chevron-back" size={22} />
          </View>
        </Pressable>
        <Text style={styles.textStyle}>
          Manage Users{"\n"}
          from your fingertip!
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginRight: 30,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={[tw`border-b-4 border-[#D46200]`, { marginLeft: 20 }]}>
          <Text
            style={[tw`text-3xl text-black`, { fontFamily: "DMSans-Bold" }]}
          >
            Attendance
          </Text>
        </View>
        <Image
          style={{ width: 180, height: 180 }}
          source={require("../assets/attendance.png")}
        />
      </View>
      <View style={styles.bodyHeight}>
        <View style={tw`mt-4`}>
          <Text
            style={{
              color: colors.textSecondary,
              marginLeft: 30,
              fontSize: 14,
              fontFamily: "DMSans-Regular",
            }}
          >
            Showing attendance for, {date.toDateString()}
          </Text>
        </View>
        <View>{checkEmpty()}</View>
      </View>
    </SafeAreaView>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: Constants.statusBarHeight,
  },
  textStyle: {
    color: colors.accents,
    fontSize: 14,
    marginRight: 20,
    fontFamily: "DMSans-Regular",
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 20,
    borderRadius: 5,
  },
  bodyHeight: {
    height: windowHeight,
    backgroundColor: "white",
    borderRadius: 25,
  },
  square: {
    height: 40,
    marginRight: 15,
    width: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
});
