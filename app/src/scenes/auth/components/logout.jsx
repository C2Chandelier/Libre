import Api from "../../../services/api";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../../redux/auth/actions";
import Toast from "react-native-toast-message";
import { Button } from "react-native";
import * as Notifications from "expo-notifications";

export default function Logout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const sendPushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Log out",
        body: `Vous avez bien été déconnecté`,
      },
      trigger: null,
    });
  };

  async function logout() {
    try {
      await Api.post(`/user/logout`);
      dispatch(setUser(null));
      sendPushNotification();
      navigation.navigate("Auth");
    } catch (e) {
      console.log(e);
      navigation.navigate("Auth");
      Toast.show({
        type: "error",
        text1: `Une erreur est survenue`,
        duration: 10000,
      });
    }
  }
  return <Button title="Se déconnecter" onPress={() => logout()} />;
}
