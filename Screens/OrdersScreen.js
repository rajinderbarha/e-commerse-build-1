import { useRoute } from "@react-navigation/native";
import { FlatList, Text } from "react-native";
import OrderedItems from "../components/OrderItems";
import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../store/ordersContext";

export default function OrdersScreen() {


  const OrdersCtx = useContext(OrdersContext)

  const {orders} = OrdersCtx


  return (
   orders && <FlatList
      data={orders}
      ListEmptyComponent={<Text>You have no Orders yet..</Text>}
      renderItem={({ item }) => (
        <OrderedItems
        images = {item.images}
          image={item.image}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          description={item.description}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
