import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

export default function Search() {
  const searchRef = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const handleSearchSubmit = () => {
    console.log("Search submitted:", search);
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <SafeAreaView style={tw`flex h-full w-full`}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="black" />
      </Pressable>
      <Searchbar placeholder="Search" onChangeText={(newVal) => setSearch(newVal)} value={search} ref={searchRef} onSubmitEditing={handleSearchSubmit} />
      <Text>RECHERCHE ICI</Text>
    </SafeAreaView>
  );
}
