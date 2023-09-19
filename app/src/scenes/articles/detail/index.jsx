import React from "react";
import { View, Text } from "react-native";
import Navbar from "../../Navbar";
import tw from "twrnc";


export default function Detail() {
  return (
    <View style={tw`flex-1`}>
      <Text>Detail ICI</Text>
      <Navbar style={tw`absolute bottom-0 w-[100%] `} />
    </View>
  );
}
