import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
// import { Wallpaper } from "@/hooks/useWallpapers";
import { ThemedText } from "./ThemedText";
import { Fullwallpaper } from "@/hooks/useWallpapers";

export default function ImageCard({
  wallpaper,
  onToggleLike,
  onPress
}: {
  wallpaper: Fullwallpaper ;
  onPress: () => void;
  onToggleLike: (wallpaper:Fullwallpaper ) => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: wallpaper.url }} style={styles.image} />
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>{wallpaper.name}</ThemedText>
          <Pressable onPress={() => onToggleLike(wallpaper)}>
            <Ionicons
              name={wallpaper.liked ? "heart" : "heart-outline"}
              size={18}
              color="red"
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 300,
    borderRadius: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {
    color: "white",
  },
});
