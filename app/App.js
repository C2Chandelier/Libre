import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import api, { initApi } from "./src/services/api";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

import Home from "./src/scenes/home";
import Auth from "./src/scenes/auth";
import store from "./src/redux/store";
import Actu from "./src/scenes/actu";
import Profil from "./src/scenes/profil";
import Ajoute from "./src/scenes/add";
import Messagerie from "./src/scenes/chat";

initApi();

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
            <Stack.Screen name="Actu" component={Actu} options={{ headerShown: false }} />
            <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
            <Stack.Screen name="Ajoute" component={Ajoute} options={{ headerShown: false }} />
            <Stack.Screen name="Messagerie" component={Messagerie} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </TailwindProvider>
    </Provider>
  );
}
