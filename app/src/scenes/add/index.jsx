import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Api from "../../services/api";
import { Button, TextInput, View, Text, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import tw from "twrnc";
import { canCreateArticle } from "../../utils/ROLES";
import { Entypo } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

export default function Add() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const ValidationSchema = yup.object().shape({
    theme: yup.string().required("Theme is Required"),
    category: yup.string().required("Category is required"),
    title: yup
      .string()
      .max(100, () => "title is 100 max")
      .required("title is Required"),
    image: yup.string().required("image is Required"),
    content: yup
      .string()
      .max(1000, () => "content is 1000 max")
      .required("content is required"),
  });

  const errorStyle = { fontSize: 10, color: "red" };

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={ValidationSchema}
        initialValues={{ theme: "", category: "", title: "", image: "", content: "" }}
        onSubmit={async (values, actions) => {
          if (!canCreateArticle(user)) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "ban",
                body: `Vous etes bannis`,
              },
              trigger: null,
            });
            return;
          }
          try {
            const { theme, category, title, image, content } = values || {};
            const { ok, data } = await Api.post(`/article`, {
              user_id,
              theme,
              category,
              title,
              image,
            });
            if (!ok) {
              if (code === "INVALID_PARAMS") {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "verif",
                    body: `Vérifiez vos informations`,
                  },
                  trigger: null,
                });
              }
              if (code === "OPERATION_UNAUTHORIZED") {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "ban",
                    body: `Vous etes bannis`,
                  },
                  trigger: null,
                });
              }
              Toast.show({
                type: "error",
                text1: `Oups, une erreur est survenue ${code}`,
                duration: 3000,
              });
            }
          } catch (e) {
            Toast.show({
              type: "error",
              text1: `Oups, une erreur est survenue ${e?.code}`,
              duration: 3000,
            });

            actions.setSubmitting(false);
            console.log("e", e);
          }
        }}>
        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <SafeAreaView style={tw`flex w-full`}>
              <View>
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Entypo name="cross" size={24} color="black" />
                </Pressable>
                <View>
                  <Text>THEME</Text>
                  <TextInput name="theme" value={values.theme} onChangeText={handleChange("theme")} placeholder="Theme" />
                  {errors.theme && touched.theme ? <Text style={errorStyle}>{errors.theme}</Text> : null}
                </View>

                <View>
                  <View>
                    <Text>CATEGORIE</Text>
                    <TextInput name="category" value={values.category} onChangeText={handleChange("category")} placeholder="Prénom" />
                    {errors.category && touched.category ? <Text style={errorStyle}>{errors.category}</Text> : null}
                  </View>
                  <View>
                    <Text>NOM</Text>
                    <TextInput name="title" value={values.title} onChangeText={handleChange("title")} placeholder="Nom" />
                    {errors.title && touched.title ? <Text style={errorStyle}>{errors.title}</Text> : null}
                  </View>
                </View>
                <View>
                  <Text>IMAGE</Text>
                  <TextInput name="image" value={values.image} onChangeText={handleChange("image")} placeholder="image" />
                  {errors.image && touched.image ? <Text style={errorStyle}>{errors.image}</Text> : null}
                </View>
                <View>
                  <Text>CONTENT</Text>
                  <TextInput name="content" value={values.content} onChangeText={handleChange("content")} placeholder="content" />
                  {errors.content && touched.content ? <Text style={errorStyle}>{errors.content}</Text> : null}
                </View>
                <Button title="Ajouter un article" onPress={handleSubmit} />
              </View>
            </SafeAreaView>
          );
        }}
      </Formik>
    </>
  );
}
