import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Constants from "expo-constants";
import { React, useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { Feather, Ionicons } from "@expo/vector-icons";
import EmptyScreen from "../components/Empty";

const Company = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { token } = route.params;
  var adminId = jwt_decode(token.toString());

  const getCompanyDetails = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: `http://192.168.0.105:5000/api/v1/company/admin/${adminId.user}`,
      headers: { token: token },
    })
      .then((res) => {
        setCompany(res.data.admin[0]);
        setName(res.data.admin[0].company_name);
        setEmail(res.data.admin[0].company_email);
        setPhone(res.data.admin[0].company_phone);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const handleUpdate = async () => {
    const updatedData = {
      company_name: name,
      company_email: email,
      company_phone: phone,
    };
    await axios({
      method: "put",
      url: `http://192.168.0.105:5000/api/v1/company/${company.company_id}`,
      headers: { token: token },
      data: updatedData,
    })
      .then((res) => {
        showMessage({
          message: "Updated successfully",
          type: "success",
          style: {
            fontFamily: "DMSans-Regular",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const checkEmpty = () => {
    if (loading) {
      return (
        <View style={{ flex: 1, marginTop: 50, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#D46200" />
        </View>
      );
    } else if (company === undefined) {
      return (
        <View>
          <EmptyScreen
            title={"Looks like you don't have any register company."}
          />
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterCompany")}
              style={[styles.button]}
            >
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
            Company
          </Text>
        </View>
        <Image
          style={{ width: 130, height: 180 }}
          source={require("../assets/Group.png")}
        />
      </View>
      <View style={styles.bodyHeight}>
        {company ? (
          <View>
            <View style={tw`mt-4`}>
              <Text
                style={{
                  color: colors.textSecondary,
                  marginLeft: 30,
                  fontSize: 14,
                  fontFamily: "DMSans-Regular",
                }}
              >
                Check/Edit Company details
              </Text>
            </View>
            <View style={styles.textBackground}>
              <Text style={styles.header}>Company Name</Text>
              {!edit ? (
                <Text style={styles.details}>{company.company_name}</Text>
              ) : (
                <TextInput
                  style={styles.details}
                  value={name}
                  onChangeText={setName}
                ></TextInput>
              )}
            </View>
            <View style={styles.textBackground}>
              <Text style={styles.header}>Company Email</Text>
              {!edit ? (
                <Text style={styles.details}>{company.company_email}</Text>
              ) : (
                <TextInput
                  style={styles.details}
                  value={email}
                  onChangeText={setEmail}
                ></TextInput>
              )}
            </View>
            <View style={styles.textBackground}>
              <Text style={styles.header}>Phone Number</Text>
              {!edit ? (
                <Text style={styles.details}>{company.company_phone}</Text>
              ) : (
                <TextInput
                  style={styles.details}
                  value={phone}
                  onChangeText={setPhone}
                ></TextInput>
              )}
            </View>
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
            {name && phone && email && edit ? (
              <View style={styles.iconTick}>
                <TouchableOpacity onPress={() => handleUpdate()}>
                  <Feather name="check" size={32} color="white" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : (
          <View>{checkEmpty()}</View>
        )}
      </View>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

export default Company;

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

  iconEdit: {
    position: "absolute",
    right: 30,
    padding: 12,
    borderRadius: 50,
    backgroundColor: colors.background,
    bottom: -130,
  },
  iconX: {
    position: "absolute",
    right: 30,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.accents,
    bottom: -130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
  iconTick: {
    position: "absolute",
    right: 100,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.accents,
    bottom: -130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
  },
});
