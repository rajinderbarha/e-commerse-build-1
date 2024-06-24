import { Ionicons } from "@expo/vector-icons";
import { Card } from "@rneui/themed";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconBtn from "../ui/iconBtn";
import { useContext, useState } from "react";
import { Context } from "../store/context";

export default function CartItem({
  id,
  quantity,
  title,
  image,
  images = [],
  price,
  cartHandler,
  children,
}) {
  const imageUrl = images && images.length > 0 ? images[0] : image || null;

  const ctx = useContext(Context);

  function increaseQuantity() {
    cartHandler(id, quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      cartHandler(id, quantity - 1);
    }
  }

  function removeFromCart() {
    ctx.removeFromCart(id);
  }
  const newPrice = quantity * price;
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.row}>
        <View style={styles.imgBox}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.img} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text>No Image</Text>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${newPrice.toFixed(2)}</Text>
            <View style={styles.quantity}>
              <IconBtn icon={"add"} size={16} onPress={increaseQuantity} />
              <Text>{quantity}</Text>
              <IconBtn icon={"remove"} size={16} onPress={decreaseQuantity} />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={removeFromCart}>
            <Text style={styles.buttonText}>{children}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantity: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginRight: 6,
    marginBottom: 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbd5d5",
    justifyContent: "space-between",
    width: "25%",
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgBox: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  imagePlaceholder: {
    // width: 150,
    // height: 150,
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    
    
  },
});
