import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import validator from "validator";
import { setUser } from "../../../redux/Auth/actions";
import api from "../../../services/api";
import { Button, Modal, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [newUser, setNewUser] = useState(null);

  const user = useSelector((state) => state.Auth.user);
  if (user) return navigation.navigate("Home");

  const regexPhoneFrenchCountries = /^((00|\+)(33|590|594|262|596|269|687|689|508|681)|0)[1-9]?(\d{8})$/;

  const BirthdateField = ({ field, form, ...props }) => {
    return <DatePicker selected={field.value} onChange={(date) => form.setFieldValue(field.name, date)} {...props} />;
  };

  return (
    <div>
      {newUser ? (
        <Modal visible={newUser} transparent animationType="slide">
          <Text>Utilisateur et structure créés avec succès.</Text>
          <Button title="Continuer" onPress={() => dispatch(setUser(newUser))} />
        </Modal>
      ) : null}
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ user: {} }}
        onSubmit={async (values, actions) => {
          try {
            const { firstName, lastName, email, password, phone, birthdateAt } = values?.user || {};
            const { user, token, code, ok } = await api.post(`/user/signup`, {
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
            setNewUser(user);
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
        {({ values, errors, handleChange, handleSubmit }) => {
          return (
            <div>
              <div>
                Vous avez déjà un compte ? <Button title="Se Connecter" onPress={() => navigation.navigate("Signin")}></Button>
              </div>

              <div>
                <Form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      <span>*</span>ADRESSE EMAIL
                    </label>
                    <Field
                      validate={(v) => (!v && "Ce champ est obligatoire") || (!validator.isEmail(v) && "Veuillez renseigner votre email")}
                      name="user.email"
                      type="email"
                      value={values.user.email || ""}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    <p>{errors.user?.email}</p>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="firstName">
                        <span>*</span>Prénom
                      </label>
                      <Field
                        validate={(v) => !v && "Ce champ est obligatoire"}
                        name="user.firstName"
                        id="firstName"
                        value={values.user.firstName || ""}
                        onChange={handleChange}
                        placeholder="Prénom"
                      />
                      <p>{errors.user?.firstName}</p>
                    </div>
                    <div>
                      <label htmlFor="lastName">
                        <span>*</span>Nom
                      </label>
                      <Field
                        validate={(v) => !v && "Ce champ est obligatoire"}
                        name="user.lastName"
                        id="lastName"
                        value={values.user.lastName || ""}
                        onChange={handleChange}
                        placeholder="Nom"
                      />
                      <p>{errors.user?.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <label>
                      <span>*</span>Date de naissance
                    </label>
                    <Field
                      name="user.birthdateAt"
                      component={BirthdateField}
                      handleChange={handleChange}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="Sélectionnez une date"
                      selected={values.user.birthdateAt}
                    />
                    <p>{errors.user?.birthdateAt}</p>
                  </div>
                  <div>
                    <label htmlFor="phone">
                      <span>*</span>Téléphone
                    </label>
                    <Field
                      name="user.phone"
                      type="tel"
                      id="phone"
                      value={values.user.phone || ""}
                      onChange={handleChange}
                      placeholder="06 00 00 00 00"
                      validate={(v) =>
                        !validator.matches(v, regexPhoneFrenchCountries) && "Le numéro de téléphone est au mauvais format. Format attendu : 06XXXXXXXX ou +33XXXXXXXX"
                      }
                    />
                    <p>{errors.user?.phone}</p>
                  </div>
                  <div>
                    <label>
                      <span>*</span>Mot de passe
                    </label>
                    <p>👉 Il doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un symbole</p>
                    <Field type="password" id="signup_password" value={values.user.password || ""} onChange={handleChange} name="user.password" placeholder="Mot de passe" />
                    <p>{errors.user?.password}</p>
                  </div>
                  <div>
                    <label>
                      <span>*</span>Confirmation mot de passe
                    </label>
                    <Field
                      validate={() => values.user.password !== values.user.repassword && "Les mots de passe ne correspondent pas."}
                      type="password"
                      id="repassword"
                      value={values.user.repassword || ""}
                      onChange={handleChange}
                      name="user.repassword"
                      placeholder="Confirmez votre mot de passe"
                    />
                    <p>{errors.user?.repassword}</p>
                  </div>
                  <button type="submit">S'inscrire</button>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
