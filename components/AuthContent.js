import { Alert, Button, StyleSheet } from "react-native";
import LoginForm from "./LoginForm";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import Buttonx from "../ui/Buttonx";
import { Card } from "@rneui/themed";
import { login, signup } from "../util/auth";
import { useState } from "react";

export default function AuthContent({ isLogin,onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function submitHandler(credentials) {
    let { email, password, confirmEmail, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid Input", "Please check your credentials");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
    }
    onAuthenticate({email, password}) 
  }

  const navigation = useNavigation();


  

  function accountHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  const text = isLogin ? "New User, Click here..." : "Login Instead..";

  return (
    <Card>
      <LoginForm isLogin={isLogin} credentialsInvalid={credentialsInvalid} onSubmit={submitHandler}/>

      <View style={styles.btn}>
        
        <Buttonx onPress={accountHandler}>{text}</Buttonx>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  btn: {
    marginLeft: "25%",
    marginVertical: 6,
    width: "50%",
  },
});
