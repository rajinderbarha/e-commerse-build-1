import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductItem from "./ProductItem";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../store/context";
import Loader from "../ui/loader";
import { ProductContext } from "../store/productContext";

export default function ProductList() {
  // const URL = "https://fakestoreapi.com/products/";
  // const [products, setProducts] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const ctx = useContext(Context);
  const ProdCtx = useContext(ProductContext)


  const products = ProdCtx.products;
  const isLoading = ProdCtx.isLoading;
  const isError = ProdCtx.isError


 


  function ErrorText() {
    return (
      <View style={styles.errBox}>
        <Text style={styles.error}>
          There is an error.. Unable to display data
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return isError ? (
    <ErrorText />
  ) : (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          images={item.images}
          image={item.image}
          price={item.price}
          title={item.title}
          onPress={() => {
            navigation.navigate("Product", { product: item });
          }}
          cartHandler={()=>ctx.addToCart(item)}
        >Add to Cart</ProductItem>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id.toString() + index.toString()}
    />
  );
}

const styles = StyleSheet.create({

  error: {
    fontSize: 20,
    color: "red",
  },
  errBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
