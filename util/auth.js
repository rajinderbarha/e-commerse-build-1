import axios from "axios";

const API_KEY = "AIzaSyBYiNMA5LHkU_F3MOo_VdqiISwQPDUioIw";

async function authUser(mode ,email, password) {
  const URL =
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`; 
 try{
   const response = await axios.post(URL, {
   email: email,
   password: password,
   returnSecureToken: true,
 });

 const Token = response.data.idToken ;
 console.log(response.data.idToken)
 return Token

 } catch (error) {
  console.error("Error during authentication:", error.response?.data || error.message);
  throw error;
}

}

export  function signup(email, password){
  return  authUser('signUp',email,password)
};


export  function login(email, password){
  return  authUser('signInWithPassword',email,password)
}