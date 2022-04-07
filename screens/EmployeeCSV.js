import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from "react-native-document-picker";
import axios from "axios";
import Constants from "expo-constants";
import { React, useState, useEffect, useCallback } from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
import { Ionicons } from "@expo/vector-icons";

const EmployeeCSV = ({ navigation, route }) => {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        type: [types.pdf],
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
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
            Upload CSV
          </Text>
        </View>
        <Image
          style={{ width: 165, height: 195 }}
          source={require("../assets/RegisterCompany.png")}
        />
      </View>
      <View style={styles.bodyHeight}>
        <View style={styles.uploadContainer}>
          {fileResponse.map((file, index) => (
            <Text
              key={index.toString()}
              style={styles.uri}
              numberOfLines={1}
              ellipsizeMode={"middle"}
            >
              {file?.uri}
            </Text>
          ))}
          <Button title="Select 📑" onPress={handleDocumentSelection} />
          {/* <TouchableOpacity style={[styles.button]}>
            <Text style={styles.text}>Upload</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeCSV;

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
    elevation: 10,
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

    backgroundColor: colors.background,
  },
  text: {
    color: colors.button,
    fontSize: 18,
    fontWeight: "bold",
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
  uploadContainer: {
    borderColor: colors.accents,
    borderWidth: 3,
    margin: 50,
    borderRadius: 10,
    borderStyle: "dashed",
    height: 310,
    justifyContent: "center",
    alignItems: "center",
  },
});
