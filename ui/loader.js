import { ActivityIndicator, StyleSheet } from "react-native";

export default function Loader(){
  return (
    <ActivityIndicator size={28} color={"blue"} style={styles.loader} />
  );
};

const styles = StyleSheet.create({
    loader: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      },
});