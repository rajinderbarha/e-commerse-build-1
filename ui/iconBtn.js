import { Pressable, Text } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { StyleSheet } from "react-native";

export default function IconBtn({icon, size, color,style, onPress}){
  return (
    <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
        <Ionicons style={style} name={icon} size={size} color={color}/>
    </Pressable>
  );
};

const styles = StyleSheet.create({
pressed : {
  opacity : 0.5
}

});