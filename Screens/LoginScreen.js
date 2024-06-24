import { Text } from "react-native";
import LoginForm from "../components/LoginForm";
import { useNavigation } from "@react-navigation/native";
import AuthContent from "../components/AuthContent";
import { login } from "../util/auth";
import { useContext, useState } from "react";
import Loader from "../ui/loader";
import { AuthContext } from "../store/auth-context";

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext)
  async function userLogin({ email, password }) {
    setIsAuthenticating(true);
    try {
    const token =  await login(email, password);
      authCtx.authenticate(token)
      setIsAuthenticating(false);
    } catch (error) {
      console.log("error occured");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <Loader />;
  }
  return <AuthContent isLogin onAuthenticate={userLogin}/>;
}
