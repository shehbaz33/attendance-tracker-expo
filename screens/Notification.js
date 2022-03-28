import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import tw from "twrnc";
import axios from "axios";

import { Card } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState } from "react";
import colors from "../assets/colors/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
TextInput.defaultProps.selectionColor = "black";

const Notification = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const { token } = route.params;
  var adminId = jwt_decode(token.toString());

  const data = {
    title: title,
    description: description,
  };

  const createNotification = async () => {
    await axios({
      method: "post",
      url: `http://192.168.1.101:5000/api/v1/notification`,
      data: data,
      headers: { token: token },
    })
      .then((res) => {
        console.log(res.data);
        settitle("");
        setdescription("");
        showMessage({
          message: "Notification Added Successfully",
          type: "success",
          style: {
            fontFamily: "DMSans-Regular",
          },
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
        showMessage({
          message: err.response.data.message,
          type: "warning",
          style: {
            fontFamily: "DMSans-Regular",
          },
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <View style={styles.square}>
          <Ionicons name="chevron-back" size={22} />
        </View>
      </TouchableOpacity> */}
      <View style={styles.mainView}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.greatplacetowork.in/wp-content/uploads/2021/11/GPTW-Corporate-logo-1.png",
            }}
          />
        </View>
      </View>
      <View style={styles.heading}>
        <View style={[tw`border-b-4 border-[#D46200]`, { marginLeft: 20 }]}>
          <Text
            style={[tw`text-3xl text-black`, { fontFamily: "DMSans-Bold" }]}
          >
            Send {"\n"}
            Notification
          </Text>
        </View>
        <Image
          style={{ width: 120, height: 180 }}
          source={require("../assets/notification.png")}
        />
      </View>
      <View>
        <View style={styles.bodyHeight}>
          <View style={styles.dash}>
            <Image source={require("../assets/dash.png")} />
          </View>
          <Text
            style={[
              tw`text-xl text-black`,
              { fontFamily: "DMSans-Bold" },
              { margin: 20 },
            ]}
          >
            Add Notice
          </Text>
          <View style={([styles.textStyle], [styles.fieldSet])}>
            <Text style={styles.legend}>Title</Text>
            <TextInput
              type="text"
              name="title"
              required
              id="title"
              value={title}
              onChangeText={settitle}
              placeholder={"Enter Title"}
              style={([styles.input], { paddingTop: 10, paddingBottom: 10 })}
            />
            <Text style={{ color: "red" }}>{title}</Text>
          </View>

          <View style={([styles.textStyle], [styles.fieldSet])}>
            <Text style={styles.legend}>Description</Text>
            <TextInput
              value={description}
              style={
                (styles.input, { textAlignVertical: "top", paddingTop: 15 })
              }
              placeholder={"Enter description here..."}
              includeFontPadding={false}
              multiline={true}
              numberOfLines={7}
              onChangeText={setdescription}
            />
            <Text style={{ color: "red" }}>{description}</Text>
          </View>
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: "#373A4E",
                },
              ]}
              onPress={createNotification}
            >
              <Text style={styles.text}>Send</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: Constants.statusBarHeight,
  },
  textStyle: {
    color: colors.accents,
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    textAlign: "left",
  },
  heading: {
    marginTop: 20,
    alignItems: "center",
    marginRight: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dash: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#F8F8F8",
    paddingBottom: 10,
    borderColor: "#373A4E",
    marginRight: 20,
    marginLeft: 20,
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
    marginTop: 10,
    color: "black",
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
});
