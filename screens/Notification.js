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
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import tw from "twrnc";
import { Card } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState } from "react";
import colors from "../assets/colors/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
TextInput.defaultProps.selectionColor = "black";

const weekDays = [
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  },
  {
    label: "Saturday",
    value: "saturday",
  },
  {
    label: "Sunday",
    value: "sunday",
  },
];

const Notification = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  // const [selectedDay, setselectedDay] = useState();
  // const [selectedHours, setSelectedHours] = useState(0);
  // const [selectedMinutes, setSelectedMinutes] = useState(0);

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
      <ScrollView>
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
              value={title}
              onChangeText={(title) => settitle(title)}
              placeholder={"Enter Title"}
              style={([styles.input], { paddingTop: 10, paddingBottom: 10 })}
            />
          </View>

          <View style={([styles.textStyle], [styles.fieldSet])}>
            <Text style={styles.legend}>Description</Text>
            <TextInput
              value={description}
              style={
                (styles.input, { textAlignVertical: "top", paddingTop: 15 })
              }
              includeFontPadding={false}
              multiline={true}
              numberOfLines={7}
              onChangeText={(description) => setdescription(description)}
            />
          </View>
          {/* <View style={([styles.textStyle], [styles.fieldSet])}>
            <Text style={styles.legend}>Select Day</Text>
            <RNPickerSelect
              placeholder={{}}
              items={weekDays}
              selectedDay={selectedDay}
              onChange={(dayName) => {
                setselectedDay(dayName);
              }}
              InputAccessoryView={() => null}
            />
          </View>
          <View style={([styles.textStyle], [styles.fieldSet])}>
            <Text style={styles.legend}>Select Time</Text>
            <View>
              <View style={{ marginTop: 10, marginRight: 100 }}>
                <TimePicker
                  selectedHours={selectedHours}
                  selectedMinutes={selectedMinutes}
                  onChange={(hours, minutes) => {
                    setSelectedHours(hours);
                    setSelectedMinutes(minutes);
                  }}
                />
              </View>
              <View>
                <Image source={require("../assets/clock.png")} />
              </View>
            </View>
          </View> */}
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: "#373A4E",
                },
              ]}
            >
              <Text style={styles.text}>Send</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
