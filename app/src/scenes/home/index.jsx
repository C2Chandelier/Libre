import api from "../../services/api";
import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../redux/Auth/actions";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import Sidebar from "../sidebar";
import Articles from "../articles";
import FindButton from "./components/findButton";
import { useTailwind } from "tailwind-rn";

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const navigation = useNavigation();
  const tailwind = useTailwind();

     const getMessage = async () => {
    try {
      const {ok, data} = await api.get(`/user`, navigation);
      if(!ok) return;
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
        const res = await api.checkToken(navigation);
        if (!res.ok || !res.user) {
          console.log('res',res);
          api.setToken(null);
          dispatch(setUser(null));
          navigation.navigate("Auth")
        }
        if (res.token) api.setToken(res.token);
        if (res.user) dispatch(setUser(res.user));
      } catch (e) {
        console.log(e);
      }
  };

  useEffect(() => {
    getMessage();
    getUser(navigation);
  }, []);
  console.log('user',user);
  console.log(data);

  return (
    <View style={tailwind("flex h-full w-full")}>
      <View style={tailwind("absolute right-0 z-10 mr-5 mt-5")}>
        <FindButton />
      </View>
      <View style={tailwind("w-full h-full bg-red-500")}>
        <Articles />
      </View>
      <View style={tailwind("absolute right-0 top-1/2 h-2/5 z-10 w-16")}>
        <Sidebar />
      </View>
      <View style={tailwind("flex flex-row bg-gray-500 items-center justify-around h-16 absolute bottom-0 w-full")}>
        <Navbar />
      </View>
    </View>
  );
}
