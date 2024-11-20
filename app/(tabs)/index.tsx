import { DownloadPicture } from "@/components/BottomSheet";
import ImageCard from "@/components/ImageCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import useWallpapers, { useLikedWallpapers, Wallpaper } from "@/hooks/useWallpapers";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

export default function Explore() {
  const wallpapers = useWallpapers();
  const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null);
  const { likedWallpapers, toggleLike } = useLikedWallpapers();
  return (
    <ThemedSafeAreaView style={styles.container}>

      <ParallaxScrollView
        headerBackgroundColor={{ dark: "black", light: "white" }}
        headerImage={
          wallpapers.length > 0 ? (
            <Image style={{ flex: 1 }} source={{ uri: selectedWallpaper?.url ?? wallpapers[0].url }} />
          ) : (
            <Text>No wallpapers available</Text>
          )
        }
      >
        <ThemedView style={styles.container}>
          <ThemedView style={styles.innerContainer}>
            <FlatList
              data={wallpapers.filter((_, index) => index % 2 === 0)}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <ImageCard
                    wallpaper={item}
                    onToggleLike={toggleLike}
                    onPress={() => setSelectedWallpaper(item)}
                  />
                </View>
              )}
              keyExtractor={(item) => item.name.toString()}  // Ensure a unique identifier
            />
          </ThemedView>

          <ThemedView style={styles.innerContainer}>
            <FlatList
              data={wallpapers.filter((_, index) => index % 2 === 1)}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <ImageCard
                    wallpaper={item}
                    onToggleLike={toggleLike}
                    onPress={() => setSelectedWallpaper(item)}
                  />
                </View>
              )}
              keyExtractor={(item) => item.name.toString()}  // Ensure a unique identifier
            />
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>

      {selectedWallpaper && 
        <DownloadPicture
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
        />
      }
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    gap: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
  imageContainer: {
    paddingVertical: 10,
  },
});
