import { Text } from "@rneui/themed";
import AuthContent from "../components/AuthContent";
import { signup } from "../util/auth";
import { useContext, useState } from "react";
import Loader from "../ui/loader";
import { AuthContext } from "../store/auth-context";

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function userSignup({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await signup(email, password);
      authCtx.authenticate(token);
      setIsAuthenticating(false);
    } catch (error) {
      console.log("error occured");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <Loader />;
  }

  return <AuthContent onAuthenticate={userSignup} />;
}
