import api from "../../../services/api";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../../redux/Auth/actions";
import Toast from "react-native-toast-message";
import { Button } from "react-native";

export default function Logout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function logout() {
    try {
      await api.post(`/user/logout`);
      dispatch(setUser(null));
      Toast.show({
        type: "info",
        text1: `Vous avez bien été déconnecté`,
        duration: 10000,
      });
      navigation.navigate("Auth");
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: `Une erreur est survenue`,
        duration: 10000,
      });
    }
  }
  return <Button title="Se déconnecter" onPress={() => logout()} />;
}
