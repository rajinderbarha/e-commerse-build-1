import { Text, View } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Avatar,
  Banner,
  Badge,
  Button,
  Card,
  Drawer,
  Title,
  Caption,
  Divider,
  List,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import LogoutButton from "../ui/LogoutBtn";
import IconBtn from "../ui/iconBtn";
import DrawerBtn from "../ui/DrawerBtn";
import { useNavigation } from "@react-navigation/native";

export default function DrawerContentComponent(props) {
  const navigation = useNavigation();

  function homescreenNavigate() {
    navigation.navigate("Categories");
  }

  return (
    <View style={styles.root}>
      <DrawerContentScrollView {...props}>
        <View style={styles.top}>
          <Avatar.Image
            style={styles.avatar}
            source={require("../assets/images.png")}
            size={68}
          />
          <View style={styles.userInfo}>
            <Title style={styles.title}>UserName</Title>
            <Caption style={styles.caption}>username@example.com</Caption>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Drawer.Section style={{ alignItems: "flex-start", paddingLeft: 30 }}>
          <DrawerBtn
            size={18}
            icon={"home"}
            onPress={() => homescreenNavigate("Home")}
          >
            Home
          </DrawerBtn>

          <DrawerBtn
            size={18}
            icon={"bag"}
            onPress={() => navigation.navigate("All_Items")}
          >
            All Items
          </DrawerBtn>
          <DrawerBtn
            size={18}
            icon={"heart"}
            onPress={() => navigation.navigate("Favorites")}
          >
            Favorites
          </DrawerBtn>
          <DrawerBtn
            size={18}
            icon={"settings"}
            onPress={() => navigation.navigate("Settings")}
          >
            Settings
          </DrawerBtn>
          <DrawerBtn
            size={18}
            icon={"help-circle"}
            onPress={() => navigation.navigate("Help")}
          >
            Help
          </DrawerBtn>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomSection}>
        <DrawerItem label={() => <LogoutButton />} />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  top: {
    flexDirection: "row",
    backgroundColor: "#807d7d",
    height: 140,
    padding: 18,
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginTop: 8,
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    fontSize: 14,
    lineHeight: 14,
  },
  divider: {
    marginVertical: 8,
  },
  bottomSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
