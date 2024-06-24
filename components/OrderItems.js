import { Ionicons } from "@expo/vector-icons";
import { Card } from "@rneui/themed";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconBtn from "../ui/iconBtn";
import { useContext, useState } from "react";
import { Context } from "../store/context";

export default function OrderedItems({
  
  quantity,
  title,
  image,
  images,
  price,
  description
}) {
  const imageUrl = images && images.length > 0 ? images[0] : image || null;



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
          <View style={styles.quantity}>
            <Text>Quantity :</Text>
            <Text>{quantity}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${newPrice.toFixed(2)}</Text>
          </View>
          <View style = {styles.scroll}>
            <ScrollView>

            <Text>{description}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  scroll : {
    maxHeight : 100,
    // borderWidth :0.5,
    padding : 2,
    elevation : 0.5
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  quantity: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginRight: 6,
    marginBottom: 2,
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbd5d5",
    justifyContent: "space-between",
    width: "40%",
    // alignSelf : 'center'
    top : 0
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row-reverse",
    // alignItems: "center",
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
    // borderWidth :1,
    top : 0
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },
});
