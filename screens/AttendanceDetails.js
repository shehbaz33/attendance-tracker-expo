import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import React, { useEffect } from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import { Dimensions } from "react-native";
import { Dropdown } from "../components/Dropdown";
const windowHeight = Dimensions.get("window").height;
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import {
  AttendanceUpdateStart,
  AttendanceUpdateSuccess,
  AttendanceUpdateError,
} from "../redux/attendanceSlice";

const AttendanceDetails = (props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(null);
  const [updated, setUpdated] = useState(false);
  const { item } = props.route.params;
  const dispatch = useDispatch();
  const { token } = props.route.params;
  const navigation = props.navigation;
  const status = {
    status: value,
  };

  const id = item.id;

  const handleUpdate = async () => {
    await axios({
      method: "put",
      url: `http://192.168.0.105:5000/api/v1/attendance/${id}`,
      headers: { token: token },
      data: status,
    })
      .then((res) => {
        showMessage({
          message: "Updated successfully",
          type: "success",
          style: {
            fontFamily: "DMSans-Regular",
          },
        });
        setUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Pressable onPress={() => navigation.navigate("Attendance")}>
          <View style={styles.square}>
            <Ionicons name="chevron-back" size={22} />
          </View>
        </Pressable>
        <Text style={styles.textStyle}>
          Manage Users{"\n"}
          at your fingertips
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
            Check/Edit attendance details
          </Text>
        </View>
        <View style={styles.textBackground}>
          <Text style={styles.header}>Name</Text>
          <Text style={styles.details}>{item.name}</Text>
        </View>
        <View style={styles.textBackground}>
          <Text style={styles.header}>Company</Text>
          <Text style={styles.details}>{item.company_name}</Text>
        </View>
        {edit ? (
          <>
            <View style={styles.dropdownBackground}>
              <Text style={styles.header}>Status</Text>
              <Dropdown value={value} setValue={setValue} />
            </View>
          </>
        ) : (
          <View style={styles.textBackground}>
            <Text style={styles.header}>Status</Text>
            <Text style={styles.details}>{item.attendance_type}</Text>
          </View>
        )}
        {!edit ? (
          <View style={styles.iconEdit}>
            <Pressable onPress={() => setEdit(!edit)}>
              <Feather name="edit-2" size={32} color={colors.accents} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.iconX}>
            <Pressable onPress={() => setEdit(!edit)}>
              <Feather name="x" size={32} color="white" />
            </Pressable>
          </View>
        )}
        {value && edit ? (
          <View style={styles.iconTick}>
            <TouchableOpacity onPress={() => handleUpdate()}>
              <Feather name="check" size={32} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

export default AttendanceDetails;

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
  textBackground: {
    marginLeft: 30,
    backgroundColor: colors.background,
    marginTop: 10,
    marginRight: 30,
    padding: 10,
    borderRadius: 10,
  },
  header: {
    color: colors.accents,
    fontSize: 14,
    fontFamily: "DMSans-Regular",
  },
  details: {
    fontSize: 18,
    fontFamily: "DMSans-Regular",
  },
  iconEdit: {
    position: "absolute",
    right: 40,
    padding: 12,
    borderRadius: 50,
    backgroundColor: colors.background,
    bottom: windowHeight - 450,
  },
  iconX: {
    position: "absolute",
    right: 40,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.accents,
    bottom: windowHeight - 450,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  iconTick: {
    position: "absolute",
    right: 120,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.accents,
    bottom: windowHeight - 450,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  dropdownBackground: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
  },
});
