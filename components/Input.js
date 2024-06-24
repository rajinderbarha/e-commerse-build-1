import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ children,isInvalid, value, onChange, passwordHide }) {
  return (
    <View style={styles.root}>
      <View style = {styles.textbox}>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput
        textContentType="password"
          style={styles.input}
          placeholder={value}
          onChangeText={onChange}
          secureTextEntry = {passwordHide}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  textbox: {
    width : '100%',
    margin :  6
  },
  text: {
    fontSize: 16,
    textAlign : 'left',
    marginLeft : 20,
    fontWeight : 'bold'
  },
  inputBox: {
    
    width: "100%",
  },
  input : {
    padding : 2,
    borderWidth : 2,
    borderColor : 'grey',
    marginHorizontal : 18,
    fontSize : 16,
    fontStyle : 'italic'
  }
  
});
