import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";
const appURL = "http://localhost:19006";

export { apiURL, appURL };
