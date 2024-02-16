import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { setUser } from "../../../redux/auth/actions";
import Api from "../../../services/api";
import { Button, TextInput, View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import moment from "moment";
import tw from "twrnc";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";

export default function Signup() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const regexPhoneFrenchCountries = /^((00|\+)(33|590|594|262|596|269|687|689|508|681)|0)[1-9]?(\d{8})$/;
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const ValidationSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .matches(passwordRules, "password must contains at least 1 upper case letter, 1 lower case letter, 1 numeric digit")
      .required("Password is required"),
    firstName: yup.string().required("firstName is Required"),
    lastName: yup.string().required("lastName is Required"),
    phone: yup.string().matches(regexPhoneFrenchCountries, "Phone number is not valid").required("phone is required"),
    birthdateAt: yup
      .date()
      .max(new Date(Date.now() - 441504000000), "You must be at least 14 years old")
      .required("Birthdate is required"),
    repassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const errorStyle = { fontSize: 10, color: "red" };

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={ValidationSchema}
        initialValues={{ email: "", password: "", firstName: "", lastName: "", phone: "", birthdateAt: "", repassword: "" }}
        onSubmit={async (values, actions) => {
          try {
            const { firstName, lastName, email, password, phone, birthdateAt } = values || {};
            const { user, token, code, ok } = await Api.post(`/user/signup`, {
              firstName,
              lastName,
              email,
              password,
              phone,
              birthdateAt,
            });
            if (!ok) {
              if (code === "PASSWORD_NOT_VALIDATED") {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "mdp",
                    body: `Votre mot de passe doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un symbole`,
                  },
                  trigger: null,
                });
              }
              if (code === "USER_ALREADY_REGISTERED") {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "activate",
                    body: `Votre compte est déja activé. Veuillez vous connecter`,
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
            dispatch(setUser(user));
            navigation.navigate("Home");
          } catch (e) {
            if (e && e.code === "USER_ALREADY_REGISTERED") {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "already",
                  body: `Le compte existe déja. Veuillez vous connecter`,
                },
                trigger: null,
              });
            }

            Toast.show({
              type: "error",
              text1: `Oups, une erreur est survenue ${e?.code}`,
            });

            actions.setSubmitting(false);
            console.log("e", e);
          }
        }}>
        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <SafeAreaView style={tw`flex absolute bottom-0 w-full`}>
              <View>
                <Text>Vous avez déjà un compte ?</Text>
                <Button title="Se Connecter" onPress={() => navigation.navigate("Signin")}></Button>
              </View>
              <View>
                <View>
                  <Text>ADRESSE EMAIL</Text>
                  <TextInput name="email" textContentType="email" value={values.email} onChangeText={handleChange("email")} placeholder="Email" />
                  {errors.email && touched.email ? <Text style={errorStyle}>{errors.email}</Text> : null}
                </View>

                <View>
                  <View>
                    <Text>PRÉNOM</Text>
                    <TextInput name="firstName" value={values.firstName} onChangeText={handleChange("firstName")} placeholder="Prénom" />
                    {errors.firstName && touched.firstName ? <Text style={errorStyle}>{errors.firstName}</Text> : null}
                  </View>
                  <View>
                    <Text>NOM</Text>
                    <TextInput name="lastName" value={values.lastName} onChangeText={handleChange("lastName")} placeholder="Nom" />
                    {errors.lastName && touched.lastName ? <Text style={errorStyle}>{errors.lastName}</Text> : null}
                  </View>
                </View>
                <View>
                  <Text>DATE DE NAISSANCE</Text>
                  <Text onPress={() => setDatePickerVisibility(true)}>{values.birthdateAt ? moment(values.birthdateAt).format("YYYY-MM-DD") : "select date"}</Text>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                      setFieldValue("birthdateAt", moment(date).format("YYYY-MM-DD"));
                      setDatePickerVisibility(false);
                    }}
                    onCancel={() => setDatePickerVisibility(false)}
                  />
                  {errors.birthdateAt && touched.birthdateAt ? <Text style={errorStyle}>{errors.birthdateAt}</Text> : null}
                </View>
                <View>
                  <Text>PHONE</Text>
                  <TextInput name="phone" value={values.phone} onChangeText={handleChange("phone")} placeholder="Phone" />
                  {errors.phone && touched.phone ? <Text style={errorStyle}>{errors.phone}</Text> : null}
                </View>
                <View>
                  <Text>PASSWORD</Text>
                  <Text>👉 Il doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre</Text>
                  <TextInput
                    name="password"
                    textContentType="password"
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? <Text style={errorStyle}>{errors.password}</Text> : null}
                </View>
                <View>
                  <Text>CONFIRM PASSWORD</Text>
                  <TextInput
                    name="repassword"
                    textContentType="password"
                    secureTextEntry={true}
                    value={values.repassword}
                    onChangeText={handleChange("repassword")}
                    placeholder="Confirm Password"
                  />
                  {errors.repassword && touched.repassword ? <Text style={errorStyle}>{errors.repassword}</Text> : null}
                </View>
                <Button title="S'inscrire" onPress={handleSubmit} />
              </View>
            </SafeAreaView>
          );
        }}
      </Formik>
    </>
  );
}
