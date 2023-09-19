import React from "react";
import { View, Text } from "react-native";
import Navbar from "../Navbar";
import Logout from "../Auth/components/Logout";

export default function MyAccount() {

  return (
    <View>
      <Text>PROFIL ICI</Text>
      <Logout />
      <Navbar />
    </View>
  );
}
