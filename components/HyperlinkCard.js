import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import colors from "../assets/colors/colors";

import { Feather, Ionicons } from "@expo/vector-icons";

const HyperlinkCard = ({ title, subtitle, image, navigation, link }) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: colors.background,
        borderRadius: 10,
        marginRight: 30,
        marginLeft: 30,
        justifyContent: "center",
        borderLeftWidth: 3,
        marginBottom: 20,
        borderLeftColor: colors.accents,
      }}
    >
      <View style={{ backgroundColor: "#F8F8F8", padding: 10 }}>
        <View
          style={[
            tw`m-0`,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <View style={{ width: 50 }}>
            <Ionicons
              name={image}
              size={28}
              color={colors.textSecondary}
              style={tw`ml-4`}
            />
          </View>
          <View style={{ width: 180 }}>
            <Text style={styles.textDetails}>{title}</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>
              {subtitle}
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate()}>
            <View style={styles.rounded}>
              <Image
                style={styles.images}
                source={require("../assets/Delete.png")}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HyperlinkCard;

const styles = StyleSheet.create({
  textDetails: {
    fontSize: 18,
    fontFamily: "DMSans-Regular",
    color: "black",
  },
  rounded: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    height: 30,
    marginRight: 20,
    width: 30,
  },
});
