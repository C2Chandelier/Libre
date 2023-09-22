import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Api, { initApi } from "./src/services/api";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";


import Home from "./src/scenes/Home";
import Auth from "./src/scenes/Auth";
import Store from "./src/redux/store";
import Actu from "./src/scenes/Actu";
import Ajoute from "./src/scenes/Add";
import Chat from "./src/scenes/Chat";
import Share from "./src/scenes/Share";
import Comment from "./src/scenes/Comment";
import Detail from "./src/scenes/Articles/components/Detail";
import Search from "./src/scenes/Search";
import MemberProfil from "./src/scenes/MemberProfil";
import MyAccount from "./src/scenes/MyAccount";

initApi();

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
            <Stack.Screen name="Actu" component={Actu} options={{ headerShown: false }} />
            <Stack.Screen name="Ajoute" component={Ajoute} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
            <Stack.Screen name="Share" component={Share} options={{ headerShown: false }} />
            <Stack.Screen name="Comment" component={Comment} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: false }} />
            <Stack.Screen name="MemberProfil" component={MemberProfil} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
