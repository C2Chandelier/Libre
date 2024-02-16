import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Navbar from "../Navbar";
import Logout from "../Auth/components/Logout";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import API from "../../services/api";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as Notifications from "expo-notifications";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyAccount() {
  const [selectedImage, setSelectedImage] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const storeImage = async (file) => {
    try {
      const { uri } = await FileSystem.getInfoAsync(file.uri);
      const base64Image = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const { ok, code, data } = await API.put(`/user/${user._id}/avatar`, { avatar: base64Image });
      if (!ok) {
        console.error("Error storing image:", code);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Error",
            body: `Error uploading Image with code : ${code}`,
          },
          trigger: null,
        });
        return;
      }
    } catch (error) {
      console.error("Error storing image:", error);
    }
  };

  const openImagePicker = async () => {
    Alert.alert(
      "Choose an option",
      "",
      [
        { text: "Open Gallery", onPress: () => pickImage("gallery") },
        { text: "Open Camera", onPress: () => pickImage("camera") },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true },
    );
  };

  const pickImage = async (source) => {
    try {
      let result = null;
      if (source === "camera") {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission denied");
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.canceled) {
        const file = result.assets[0];
        setSelectedImage(file.uri);
        storeImage(file);
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  return (
    user && (
      <SafeAreaView style={tw`flex h-full w-full`}>
        <Text style={tw`text-2xl text-center mt-10`}>My Account</Text>
        {selectedImage ? (
          <TouchableOpacity onPress={openImagePicker}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </TouchableOpacity>
        ) : user.avatar.length > 0 ? (
          <TouchableOpacity onPress={openImagePicker}>
            <Image source={{ uri: `data:image/jpeg;base64,${user.avatar}` }} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openImagePicker}>
            <MaterialIcons name="add-a-photo" size={220} color="black" style={styles.image} />
          </TouchableOpacity>
        )}
        <Logout />
        <View style={tw`flex flex-row bg-white border-t border-slate-400 justify-around h-20 absolute bottom-0 w-full`}>
          <Navbar />
        </View>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
