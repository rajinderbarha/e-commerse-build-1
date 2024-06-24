import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import CartScreen from "./Screens/CartScreen";
import PorductScreen from "./Screens/ProductScreen";
import ContextProvider from "./store/context";
import SignupScreen from "./Screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import LogoutButton from "./ui/LogoutBtn";
import CategoriesSceren from "./Screens/CategoriesScreen";
import ProductContextProvider from "./store/productContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrdersScreen from "./Screens/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./ui/loader";
import * as SplashScreen from 'expo-splash-screen'
import OrdersContextProvider from "./store/ordersContext";
import NotificationScreen from "./Screens/Notifications";
import DrawerContentComponent from "./components/DrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
     
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <ProductContextProvider>
      <Drawer.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#a14100" } }}
        drawerContent={(props) => <DrawerContentComponent {...props} />}
      >
        <Drawer.Screen name="Categories" component={CategoriesSceren} />
        <Drawer.Screen
          name="All_Items"
          component={HomeScreen}
          options={{ headerStyle: { backgroundColor: "#a14100" } }}
        />
        <Drawer.Screen name="Notifications" component={NotificationScreen}/>
      </Drawer.Navigator>
    </ProductContextProvider>
  );
}

function AuthenticatedStackk() {
  return (
    <StripeProvider publishableKey="pk_test_51OOddBGF5YtidX1RCNpHw3nCbh8PfjFZMbzuIWwziA9m3ZoMg3SFTYWQGBZJcrWTf3xewruof0UUuYPzrwbltvxy00zjOHrh3a">
      <ContextProvider>
        <Stack.Navigator
          screenOptions={{ headerStyle: { backgroundColor: "#a14100" } }}
        >
          <Stack.Screen
            name="Drawer"
            component={MyDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
          />
          <Stack.Screen name="Product" component={PorductScreen} />
        </Stack.Navigator>
      </ContextProvider>
    </StripeProvider>
  );
}

function CompleteAuthenticatedScreens() {
  return (
    <OrdersContextProvider>
    <Tab.Navigator
      screenOptions={{tabBarStyle : {backgroundColor : "#a14100"}, headerStyle : {backgroundColor : "#a14100"}}}
    >
      <Tab.Screen
        name="Home"
        component={AuthenticatedStackk}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="basket" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
      </OrdersContextProvider>
  );
}

function Navigate() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated && <CompleteAuthenticatedScreens />}
      {!authCtx.isAuthenticated && <AuthStack />}
    </NavigationContainer>
  );
}


function Root(){
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        authCtx.authenticate(token);
      }
      setIsLoggingIn(false)
    }
    fetchToken()
  }, []);


  // const onLayoutRootView = useCallback(async () => {
  //   if (!isLoggingIn) {
    
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isLoggingIn]);

  // if (isLoggingIn) {
  //   return null;
  // }

  if(isLoggingIn){
    return <Loader />
  }

  return( 
  
    <Navigate />

  
  )
};


export default function App() {
 

  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
