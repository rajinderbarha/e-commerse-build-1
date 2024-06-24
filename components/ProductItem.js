import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Buttonx from "../ui/Buttonx";

export default function ProductItem({ children,images = [], image, title, price, onPress, cartHandler }) {
  
  const imageUrl = images && images.length > 0 ? images[0] : image || null

  return (
    <Pressable style={({pressed})=> pressed && styles.press} onPress={onPress}>
     <View style={styles.card}>
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> :  <View style={styles.imagePlaceholder}><Text>No Image</Text></View>} 
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
      <TouchableOpacity style={styles.button} onPress={cartHandler}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    elevation: 4,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff8c00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
});
