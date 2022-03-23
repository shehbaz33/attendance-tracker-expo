import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import colors from "../assets/colors/colors";
import Constants from "expo-constants";
import tw from "twrnc";
import { Card } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Company = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.greatplacetowork.in/wp-content/uploads/2021/11/GPTW-Corporate-logo-1.png",
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          marginRight: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={[tw`border-b-4 border-[#D46200]`, { marginLeft: 20 }]}>
          <Text
            style={[
              tw`text-2xl text-black`,
              { fontFamily: "DMSans-Bold" },
              { textAlign: "left" },
            ]}
          >
            You Have Not Added, {"\n"}
            Any Company Yet !
          </Text>
        </View>
        <View style={{ width: 120, height: 180 }} />
      </View>
      <View>
        <View style={styles.bodyHeight}>
          <View style={styles.dash}>
            <Image source={require("../assets/dash.png")} />
          </View>
          <Image source={require("../assets/emptyCompany.png")} />
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: "#373A4E",
                },
              ]}
            >
              <Text style={styles.text}>Create</Text>
            </Pressable>
          </View>
        </View>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.button,
    marginTop: 30,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "DMSans-Regular",
  },
  textStyle: {
    fontSize: 18,
    fontFamily: "DMSans-Bold",
    textAlign: "left",
  },
  dash: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
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
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#F8F8F8",
    paddingBottom: 10,
    borderColor: "#373A4E",
  },
  legend: {
    position: "absolute",
    top: -12,
    left: 8,
    fontWeight: "bold",
    backgroundColor: "#F8F8F8",
    color: "#D46200",
    paddingLeft: 3,
    paddingRight: 3,
  },
  input: {
    marginTop: 5,
    color: "black",
  },
});
