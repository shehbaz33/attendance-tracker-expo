import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Constants from "expo-constants";
import { React, useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { Ionicons, Feather } from "@expo/vector-icons";
import SmallCard from "../components/SmallCard";

const Employee = ({ navigation, route }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const { token } = route.params;
  var adminId = jwt_decode(token.toString());

  const getEmployeesList = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: `http://192.168.0.105:5000/api/v1/employee/company/${adminId.user}`,
      headers: { token: token },
    })
      .then((res) => {
        setEmployees(res.data.employee);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  const renderItem = ({ item }) => (
    <SmallCard
      title={item.name}
      subtitle={item.phone_no}
      image={"person-outline"}
      key={item.employee_id}
      navigation={navigation}
      link={"EmployeeDetails"}
    />
  );

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
            Employees
          </Text>
        </View>
        <Image
          style={{ width: 165, height: 195 }}
          source={require("../assets/RegisterCompany.png")}
        />
      </View>
      <View style={styles.bodyHeight}>
        {loading ? (
          <View style={{ flex: 1, marginTop: 50, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#D46200" />
          </View>
        ) : (
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
                Tap on employee to edit or delete.
              </Text>

              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={true}
                data={employees}
                renderItem={renderItem}
                keyExtractor={(item) => item.employee_id}
              />
            </View>
            <View style={styles.iconEdit}>
              <Pressable onPress={() => navigation.navigate("AddEmployee")}>
                <Feather name="plus" size={32} color={colors.background} />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Employee;

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
    backgroundColor: colors.accents,
    top: 330,
  },
});
