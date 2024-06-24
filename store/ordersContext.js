import { createContext, useState } from "react";

export const OrdersContext = createContext({
    orders : [],
    sendToOrders : (order)=>{}
});

export default function OrdersContextProvider({children}){
    const [orders, setOrders] = useState([]);

    function sendToOrders(order){
        setOrders(prevOrders=>[...prevOrders, ...order])
        console.log('all orders =',orders)
    }

    const value = {
        orders : orders,
        sendToOrders : sendToOrders
    }

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
