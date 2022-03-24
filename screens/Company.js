import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import SmallCard from "../components/SmallCard";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Constants from "expo-constants";
import { React, useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { Ionicons } from "@expo/vector-icons";
import EmptyScreen from "../components/Empty";
const Company = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [company, setCompany] = useState();

  const { token } = route.params;
  var adminId = jwt_decode(token.toString());
  // register company and dispatch to store
  const companyDetails = useSelector((state) => state.company.companyDetails);
  const isCompanyRegistered = useSelector(
    (state) => state.company.isCompanyRegistered
  );
  // console.log(companyDetails);
  // console.log(isCompanyRegistered);
  // console.log(company);
  // console.log(adminId);
  const getCompanyDetails = async () => {
    await axios({
      method: "get",
      url: `http://192.168.0.105:5000/api/v1/company/admin/${adminId.user}`,
      headers: { token: token },
    })
      .then((res) => {
        // console.log(res.data);
        setCompany(res.data.admin[0]);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

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
            <View style={styles.textBackground}>
              <Text style={styles.header}>Company Name</Text>
              <Text style={styles.details}>{company.company_name}</Text>
            </View>

            <SmallCard
              title={"Add a Employee"}
              subtitle={"Add Employee manually"}
              image={"person-outline"}
              key={1}
              navigation={navigation}
              link={"Employee"}
            />
            <SmallCard
              title={"Add Employees"}
              subtitle={"Add Employee from a CSV file"}
              image={"people-outline"}
              key={2}
              navigation={navigation}
              link={"EmployeeCSV"}
            />
          </View>
        ) : (
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
        )}
      </View>
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
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
  },
  header: {
    color: colors.accents,
    fontSize: 14,
    fontFamily: "DMSans-Regular",
  },
  details: {
    fontSize: 24,
    fontFamily: "DMSans-Regular",
  },
});
