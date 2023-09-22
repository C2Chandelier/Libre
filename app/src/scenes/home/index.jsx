import Api from "../../services/api";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../redux/auth/actions";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";
import Sidebar from "../Sidebar";
import Articles from "../Articles";
import FindButton from "./components/FindButton";
import tw from "twrnc";
import { Platform } from "react-native";

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();

  const getMessage = async () => {
    try {
      const { ok, data } = await Api.get(`/user`, navigation);
      if (!ok) return;
      setData(data);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: `Oups, une erreur est survenue lors de la recuperation des messages`,
        duration: 3000,
      });
    }
  };

  const getUser = async (navigation) => {
    try {
      const res = await Api.checkToken(navigation);
      console.log("res", res);
      if (!res.ok || !res.user) {
        Api.setToken(null);
        dispatch(setUser(null));
        navigation.navigate("Auth");
      }
      if (res.token) Api.setToken(res.token);
      if (res.user) dispatch(setUser(res.user));
      if (res.token && res.user) getMessage();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser(navigation);
  }, []);
  useEffect(() => {
    if (user) getMessage();
  }, [user]);

  console.log("user", user);
  console.log("data", data);

  return (
    <View style={tw`flex h-full w-full`}>
      <View style={tw`absolute right-0 z-10 mr-5 mt-5`}>
        <FindButton />
      </View>
      <View style={tw`w-full h-[91%] bg-red-500`}>
        <Articles />
      </View>
      <View style={tw`absolute right-0 top-[45%] h-2/5 z-10 w-16`}>
        <Sidebar />
      </View>
      <View style={tw`flex flex-row bg-black justify-around h-16 absolute bottom-0 w-full`}>
        <Navbar />
      </View>
    </View>
  );
}
