import { useContext, useEffect, useState } from "react";
import { Alert, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CartItemsList from "../components/CartItemsList";
import { Context } from "../store/context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Buttonx from "../ui/Buttonx";
import { useStripe } from "@stripe/stripe-react-native";
import { OrdersContext } from "../store/ordersContext";

const URL = "http://192.168.29.15:5000";

export default function CartScreen() {
  const isFocused = useIsFocused();
  const OrderCtx = useContext(OrdersContext)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const [isPaymentSheetInitialized, setIsPaymentSheetInitialized] =
    useState(false);
  const ctx = useContext(Context);
  const navigation = useNavigation();
  const totalAmount = ctx.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  

  useEffect(() => {
    
    navigation.setOptions({
      headerRight: () => (
        <Buttonx
          style={{ color: "#000000", fontWeight: "700", fontSize: 18 }}
          onPress={onEmptyCart}
        >
          Empty Cart
        </Buttonx>
      ),
      headerStyle: { backgroundColor: "#a14100" },
    });
    fetchPaymentIntent();
  }, [navigation, ctx.cartItems]);

  async function fetchPaymentIntent() {
    if(ctx.cartItems.length > 0 ){
    try {
      const response = await fetch(`${URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response : ", errorText);
        throw new Error(`Error fetching payment intent: ${errorText}`);
      }

      

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "FuvayTech",
      });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setIsPaymentSheetInitialized(true);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }
  }

  function onEmptyCart() {
    ctx.cartItems.length > 0 &&
      Alert.alert("Empty Cart", "Delete the items", [
        {
          text: "cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => ctx.setCartItems([]),
          style: "default",
        },
      ]);
  }

  async function onCheckOut() {
    if (!isPaymentSheetInitialized) {
      Alert.alert("Error", "Payment sheet has not been initialized.");
      return;
    }
    const { error } = await presentPaymentSheet({ clientSecret });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Your payment was successful!");
      await OrderCtx.sendToOrders(ctx.cartItems)
    //  navigation.navigate('Orders',{orderedItems : ctx.cartItems})
     
      ctx.setCartItems([]);
    }
  }

  return (
    <>
      <CartItemsList />
     {totalAmount > 0 && <View style={styles.bottomContainer}>
        <Text style={styles.totalText}>Total : ${totalAmount.toFixed(2)}</Text>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            !isPaymentSheetInitialized && styles.disabledButton,
          ]}
          onPress={onCheckOut}
          disabled={!isPaymentSheetInitialized}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>}
    </>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000b7", // Modern blue color
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor : '#cccccc',
    borderWidth : 2
  },
  totalText: {
    color: "#FFFFFF", // White color for the text
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#28a745", // Green color for the button
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: "center", // Center the text inside the button
    justifyContent: "center",
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC", // Light gray color for disabled button
  },
});
