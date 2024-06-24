import { Image, Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function CategoryTile({ text, image,onPress }) {
  return (
    <Pressable onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <Image source={{uri : image}} style = {styles.img}/> 
        <Text style={styles.text}>{text}</Text>
      
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pressable: {
    margin: 4,
    height: 200,
    width: "20%",
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 2,
    borderColor : '#cccccc',
    backgroundColor: "#9e6565", 
    elevation : 5
  },
 
  text: {
    fontSize: 20, // Slightly smaller font size for better fit
    fontWeight: "500",
    fontStyle : 'italic',
    color: "#333", // Darker text color for better readability
    position : 'absolute',
    bottom : 0,
    color :'#000000ff'
  },
  pressed: {
    opacity: 0.75,
  },
  img : {
    height : '100%',
    width : '100%'
  
  }
});
