import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Navbar from "../Navbar";
import tw from "twrnc";

export default function Add() {
  return (
    <SafeAreaView style={tw`flex h-full w-full`}>
      <Text>ADD ICI</Text>
      <View style={tw`flex flex-row bg-black justify-around h-16 absolute bottom-0 w-full`}>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}
