import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { setUser } from "../../../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../services/api";
import Toast from "react-native-toast-message";
import { Button, TextInput, View } from "react-native";

export default function Signin() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userIsValid, setUserIsValid] = useState(true);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async ({ email, password }, actions) => {
          try {
            const { user, token, code } = await Api.post(
              `/user/signin`,
              {
                email,
                password,
              },
              navigation,
            );
            if (token) Api.setToken(token);
            if (user) {
              dispatch(setUser(user));
              navigation.navigate("Home");
            }
          } catch (e) {
            console.log("ERROR", e);
            if (e && ["EMAIL_OR_PASSWORD_INVALID", "USER_NOT_EXISTS", "EMAIL_AND_PASSWORD_REQUIRED"].includes(e.code)) {
              return setUserIsValid(false);
            }
            Toast.show({
              type: "error",
              text1: `Oups, une erreur est survenue ${e.code}`,
              duration: 3000,
            });
          }
          actions.setSubmitting(false);
        }}>
        {({ values, handleChange, handleSubmit }) => {
          return (
            <View>
              {!userIsValid && <div>E-mail et/ou mot de passe incorrect(s)</div>}

              <div>
                <label htmlFor="email">E-mail</label>
                <TextInput 
                autoComplete="username"
                textContentType="email" 
                placeholder="Adresse e-mail" 
                value={values.email} 
                onChangeText={handleChange('email')}
                />
              </div>
              <div>
                <label htmlFor="password">Mot de passe</label>
                <TextInput
                  autoComplete="current-password"
                  textContentType="password"
                  placeholder="Mot de passe"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
              </div>
              <Button onPress={handleSubmit} title="Se Connecter" />
            </View>
          );
        }}
      </Formik>
      <Button title="S'inscrire" onPress={() => navigation.navigate("Signup")}></Button>
    </>
  );
}
