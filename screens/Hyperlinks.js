import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import tw from "twrnc";
import { Card, IconButton, FAB } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState } from "react";
import HyperlinkCard from "../components/HyperlinkCard";
import Constants from "expo-constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Hyperlinks = () => {
  const data = [
    { id: 1, title: "New Form", subtitle: "www.greatplacetowork.com" },
    { id: 2, title: "Meeting Review", subtitle: "www.QaizenX.com" },
    { id: 3, title: "Weekly Form", subtitle: "www.Lissen.io" },
  ];

  const renderItem = ({ item }) => (
    <HyperlinkCard
      title={item.title}
      subtitle={item.subtitle}
      image={item.image}
      key={item.id}
      link={item.link}
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
            Add {"\n"}
            Sidebar Link
          </Text>
        </View>
        <Image
          style={{ width: 120, height: 180 }}
          source={require("../assets/Hyperlink.png")}
        />
      </View>
      <ScrollView>
        <View style={styles.bodyHeight}>
          <View style={styles.dash}>
            <Image source={require("../assets/dash.png")} />
          </View>
          <View style={tw`mt-4`}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.fabPosition}>
              <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{
                  colors: {
                    accent: "#373A4E",
                  },
                }}
                onPress={() => console.log("Pressed")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Hyperlinks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: Constants.statusBarHeight,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabPosition: {
    bottom: -170,
  },
});
