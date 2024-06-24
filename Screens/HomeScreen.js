import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import IconBtn from "../ui/iconBtn";
import { useContext, useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { StyleSheet } from "react-native";
import { Context } from "../store/context";
import { Badge } from "@rneui/themed";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const ctx = useContext(Context);
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <IconBtn
            style={{ marginRight: 18, marginTop: 8 }}
            icon={"cart"}
            size={24}
            onPress={() => navigation.navigate("Cart")}
          />
          <Badge
            containerStyle={{ position: "absolute" }}
            value={ctx.cartItems.length}
          />
        </>
      ),
    });
  }, [navigation, ctx.cartItems]);
  return <ProductList />;
}

const styles = StyleSheet.create({
  text: {
    color: "blue",
    marginBottom: 5,
    fontWeight: "bold",
  },
});
