import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Empty = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 180, marginTop: 50 }}
        source={require("../assets/empty.png")}
      />
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 40,
    marginRight: 40,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "DMSans-Regular",
    margin: 20,
  },
});
