import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
