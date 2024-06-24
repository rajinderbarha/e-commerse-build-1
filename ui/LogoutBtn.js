import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../store/auth-context";

export default function LogoutButton() {
  const authCtx = useContext(AuthContext);

  function logoutBtnHandler() {
    authCtx.logout();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={logoutBtnHandler}>
      <Ionicons name="log-out" size={18} />
      <Text>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});
