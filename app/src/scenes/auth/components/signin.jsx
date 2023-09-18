import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field, Form } from "formik";
import { setUser } from "../../../redux/Auth/actions";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../services/api";
import Toast from "react-native-toast-message";
import { Button } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Signin() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const [userIsValid, setUserIsValid] = useState(true);
  const tailwind = useTailwind();

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async ({ email, password }, actions) => {
          try {
            const { user, token, code } = await api.post(
              `/user/signin`,
              {
                email,
                password,
              },
              navigation,
            );
            if (token) api.setToken(token);
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
            <Form onSubmit={handleSubmit} style={tailwind("bg-red-500")}>
              {!userIsValid && <div>E-mail et/ou mot de passe incorrect(s)</div>}

              <div>
                <label htmlFor="email">E-mail</label>
                <Field
                  autoComplete="username"
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Adresse e-mail"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Mot de passe</label>
                <Field autoComplete="password" name="password" type="password" id="signin_password" placeholder="Mot de passe" value={values.password} onChange={handleChange} />
              </div>
              <button type="submit">Se Connecter</button>
            </Form>
          );
        }}
      </Formik>
      <Button title="S'inscrire" onPress={() => navigation.navigate("Signup")}></Button>
    </>
  );
}
