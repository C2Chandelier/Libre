import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { setUser } from "../../../redux/auth/actions";
import Api from "../../../services/api";
import { Button, TextInput, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
//phone
//import DateTimePickerModal from "react-native-modal-datetime-picker";
//web
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
                Toast.show({
                  type: "error",
                  text1: "Mot de passe incorrect",
                  text2: "Votre mot de passe doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un symbole",
                  duration: 10000,
                });
              }
              if (code === "USER_ALREADY_REGISTERED") {
                Toast.show({
                  type: "error",
                  text1: "Votre compte est déja activé. Veuillez vous connecter",
                  duration: 10000,
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
              Toast.show({
                type: "error",
                text1: "Le compte existe déja. Veuillez vous connecter",
                duration: 2000,
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
            <div>
              <div>
                Vous avez déjà un compte ? <Button title="Se Connecter" onPress={() => navigation.navigate("Signin")}></Button>
              </div>

              <div>
                <View>
                  <div>
                    <label>
                      <span>*</span>ADRESSE EMAIL
                    </label>
                    <TextInput name="email" textContentType="email" value={values.email} onChangeText={handleChange("email")} placeholder="Email" />
                    {errors.email && touched.email && <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>}
                  </div>
                  <div>
                    <div>
                      <label htmlFor="firstName">
                        <span>*</span>Prénom
                      </label>
                      <TextInput name="firstName" value={values.firstName} onChangeText={handleChange("firstName")} placeholder="Prénom" />
                      {errors.firstName && touched.firstName && <Text style={{ fontSize: 10, color: "red" }}>{errors.firstName}</Text>}
                    </div>
                    <div>
                      <label htmlFor="lastName">
                        <span>*</span>Nom
                      </label>
                      <TextInput name="lastName" value={values.lastName} onChangeText={handleChange("lastName")} placeholder="Nom" />
                      {errors.lastName && touched.lastName && <Text style={{ fontSize: 10, color: "red" }}>{errors.lastName}</Text>}
                    </div>
                  </div>
                  <div>
                    <label>
                      <span>*</span>Date de naissance
                    </label>
                    {/* For Web */}
{/*                     <DatePicker
                      name="birthdateAt"
                      selected={values.birthdateAt}
                      onChange={(newDate) => setFieldValue("birthdateAt", newDate)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select a date"
                    /> */}
                    {/* For Phone */}
                    {/* a venir */}
                    {errors.birthdateAt && touched.birthdateAt && <Text style={{ fontSize: 10, color: "red" }}>{errors.birthdateAt}</Text>}
                  </div>
                  <div>
                    <label htmlFor="phone">
                      <span>*</span>Téléphone
                    </label>
                    <TextInput name="phone" value={values.phone} onChangeText={handleChange("phone")} placeholder="Phone" />
                    {errors.phone && touched.phone && <Text style={{ fontSize: 10, color: "red" }}>{errors.phone}</Text>}
                  </div>
                  <div>
                    <label>
                      <span>*</span>Mot de passe
                    </label>
                    <Text>👉 Il doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre</Text>
                    <TextInput
                      name="password"
                      textContentType="password"
                      secureTextEntry={true}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Password"
                    />
                    {errors.password && touched.password && <Text style={{ fontSize: 10, color: "red" }}>{errors.password}</Text>}
                  </div>
                  <div>
                    <label>
                      <span>*</span>Confirmation mot de passe
                    </label>
                    <TextInput
                      name="repassword"
                      textContentType="password"
                      secureTextEntry={true}
                      value={values.repassword}
                      onChangeText={handleChange("repassword")}
                      placeholder="Confirm Password"
                    />
                    {errors.repassword && touched.repassword && <Text style={{ fontSize: 10, color: "red" }}>{errors.repassword}</Text>}
                  </div>
                  <Button title="S'inscrire" onPress={handleSubmit} />
                </View>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
}
