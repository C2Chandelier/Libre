import Api from "../../services/api";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../redux/auth/actions";
import Toast from "react-native-toast-message";
import { SafeAreaView, View } from "react-native";
import Articles from "../Articles";
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
    <SafeAreaView style={tw`w-full h-full bg-red-500`}>
      <Articles />
    </SafeAreaView>
  );
}
