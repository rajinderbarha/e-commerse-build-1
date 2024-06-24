import { Button, StyleSheet, View } from "react-native";
import Input from "./Input";
import Buttonx from "../ui/Buttonx";
import { useNavigation } from "@react-navigation/native";
import { Card } from "@rneui/themed";
import { useState } from "react";

export default function LoginForm({ isLogin,credentialsInvalid,onSubmit }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  console.log(enteredEmail);

  function submitHandler(){
    onSubmit({
      email: enteredEmail,
      confirmEmail: confirmEmail,
      password: enteredPassword,
      confirmPassword: confirmPassword,
    })
  };
  
  return (
    <>
      <Input
        value={"Enter your e-mail "}
        onChange={(text) => setEnteredEmail(text)}
        isInvalid={emailIsInvalid}
      >
        E-mail
      </Input>
      {!isLogin && (
        <Input
          value={"ReEnter your e-mail "}
          onChange={(text) => setConfirmEmail(text)}
          isInvalid={emailsDontMatch}
        >
          Confirm E-mail
        </Input>
      )}
      <Input
        value={"Enter your password"}
        passwordHide={true}
        onChange={(text) => setEnteredPassword(text)}
        isInvalid={passwordIsInvalid}
      >
        Password
      </Input>
      {!isLogin && (
        <Input
          value={"ReEnter your password "}
          passwordHide={true}
          onChange={(text) => setConfirmPassword(text)}
          isInvalid={passwordsDontMatch}
        >
          Confirm Password
        </Input>
      )}
      <View style = {styles.btn}>

      <Button  title={isLogin ? "Login" : "Signup"} onPress={submitHandler} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },btn :{
    marginTop : 18,
    width : '50%',
    marginLeft : '25%'
  }
});
