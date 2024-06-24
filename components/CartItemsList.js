import { useContext, useEffect, useState } from "react";
import { Context } from "../store/context";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductItem from "./ProductItem";
import CartItem from "./CartItem";

export default function CartItemsList() {
  
  const ctx = useContext(Context);
  const cartProduct = ctx.cartItems;
 
  
  return (
    <FlatList
      data={cartProduct}
      renderItem={({ item, index }) => (
        <CartItem image={item.image} images={item.images} price={item.price} title={item.title} cartHandler={ctx.updatedCartItemQuantity} quantity={item.quantity} id={item.id}>Remove from Cart</CartItem>
      )}
      keyExtractor={(item,index) => `${item.id}-${index}`}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});
