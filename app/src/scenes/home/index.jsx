import Api from "../../services/api";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../redux/auth/actions";
import Toast from "react-native-toast-message";
import Articles from "../Articles";
import tw from "twrnc";
import { SafeAreaView, Text } from "react-native";
import * as Notifications from "expo-notifications";
import Navbar from "../Navbar";

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
      console.log(e);
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
      Toast.show({
        type: "error",
        text1: `Oups, une erreur est survenue lors de la recuperation de l'utilisateurs`,
        duration: 5000,
      });
    }
  };

  const sendPushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Bienvenue",
        body: `Bienvenue ${user.firstName}`,
      },
      trigger: null,
    });
  };

  useEffect(() => {
    getUser(navigation);
  }, []);
  useEffect(() => {
    if (user) {
      getMessage();
      sendPushNotification();
    }
  }, [user]);

  return <Articles />;
}
