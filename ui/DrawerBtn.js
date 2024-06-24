import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DrawerBtn({icon , color, size,onPress, children}){
  return (
    <TouchableOpacity style = {styles.btn} onPress={onPress}>
      

        
            <Ionicons name={icon} color={color} size={23}/>
        <Text style={[{fontSize : size} ,styles.text]}>{children}</Text>
        
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    btn : {
        flexDirection : 'row',
        padding : 4,
        justifyContent : "center",
        margin : 6
    },
    text : {
        position : "static",
        top : 0,
        marginBottom : 4,
        marginLeft : 6
    
    }
});