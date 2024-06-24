import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card, Chip, Rating } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

export default function PorductScreen() {
  const route = useRoute();
  const product = route.params.product;
  const images = product.images
  const image = product.image

  const imageUrl = images && images.length > 0 ? images[0] : image || null;

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>No product data available.</Text>
      </View>
    );
  }

  return (
    <>
    <Card>
      <Card.Title>{product.title}</Card.Title>
      <Card.Divider />
      {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text>No Image</Text>
            </View>
          )}
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.category}>{product.category.name}</Text>
      <Rating

        readonly
        startingValue={4}
        imageSize={10}
      />
      
    </Card>
  
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
  category: {
    fontSize: 12,
    color: "#888",
    marginVertical: 10,
  },
  imagePlaceholder : {
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  }
});
