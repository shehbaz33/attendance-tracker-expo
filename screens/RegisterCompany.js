import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Constants from "expo-constants";
import { React, useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { Ionicons } from "@expo/vector-icons";
import {
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyError,
} from "../redux/companySlice";

const RegisterCompany = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { token } = route.params;
  const dispatch = useDispatch();
  console.log(token);
  const data = {
    company_name: name,
    company_email: email,
    company_phone: phone,
  };
  const registerCompany = async () => {
    dispatch(updateCompanyStart());
    await axios({
      method: "post",
      url: `http://192.168.0.103:5000/api/v1/company`,
      data: data,
      headers: { token: token },
    })
      .then((res) => {
        console.log(res.data.newCompany);
        dispatch(updateCompanySuccess(res.data.newCompany));
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((err) => {
        dispatch(updateCompanyError());
        console.log(err.response.data.error);
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
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <View style={styles.square}>
            <Ionicons name="chevron-back" size={22} />
          </View>
        </TouchableOpacity>

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
            Register{"\n"}
            Company
          </Text>
        </View>
        <Image
          style={{ width: 165, height: 195 }}
          source={require("../assets/RegisterCompany.png")}
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
            Enter your company details.
          </Text>
        </View>
        <View style={styles.textBackground}>
          <Text style={styles.header}>Company Name</Text>
          <TextInput
            style={styles.details}
            placeholder="GPTW"
            value={name}
            onChangeText={setName}
          ></TextInput>
        </View>
        <View style={styles.textBackground}>
          <Text style={styles.header}>Company Email</Text>
          <TextInput
            style={styles.details}
            placeholder="johndoe@gptw.com"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <View style={styles.textBackground}>
          <Text style={styles.header}>Phone Number</Text>
          <TextInput
            style={styles.details}
            placeholder="+917894567890"
            value={phone}
            onChangeText={setPhone}
          ></TextInput>
        </View>
        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 20 }}>
          <TouchableOpacity onPress={registerCompany} style={[styles.button]}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCompany;

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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.button,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "DMSans-Regular",
  },
  textBackground: {
    marginLeft: 30,
    backgroundColor: colors.background,
    marginTop: 20,
    marginRight: 30,
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accents,
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
});
