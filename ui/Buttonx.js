import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../Colors/colors";

export default function Buttonx({children, onPress, style}) {
  return (
    <Pressable style = {({pressed})=> pressed && styles.press} onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.text, style]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems : 'center',
    color: "grey",
    margin: 6,
  },
  text: {
    color: colors.blue2,
    fontSize : 15
  },
  press: {
    opacity : 0.5
  }
});
