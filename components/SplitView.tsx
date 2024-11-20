import { Wallpaper } from "@/hooks/useWallpapers";
import { ThemedView } from "./ThemedView";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { DownloadPicture } from "./BottomSheet";
import ImageCard from "./ImageCard";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from "react-native-reanimated";

export function SplitView({
  wallpapers,
  onScroll,
}: {
  wallpapers: Wallpaper[];
  onScroll?: (yOffset: number) => void;
}) {
  const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(
    null
  );
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
      if (onScroll) {
        runOnJS(onScroll)(event.contentOffset.y); // Safely pass value to JS
      }
    },
  });
  console.log(selectedWallpaper)
  return (
    <>
      <Animated.FlatList
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={wallpapers.reduce<Wallpaper[][]>((acc, _, index) => {
          if (index % 2 === 0) acc.push([wallpapers[index], wallpapers[index + 1]]);
          return acc;
        }, [])}
        renderItem={({ item: [first, second] }) => (
          <ThemedView style={styles.container}>
            <ThemedView style={styles.innerContainer}>
              <View style={styles.imageContainer}>
                <ImageCard
                  onPress={() => setSelectedWallpaper(first)}
                  wallpaper={first}
                />
              </View>
            </ThemedView>
            <ThemedView style={styles.innerContainer}>
              {second && (
                <View style={styles.imageContainer}>
                  <ImageCard
                    onPress={() => setSelectedWallpaper(second)}
                    wallpaper={second}
                  />
                </View>
              )}
            </ThemedView>
          </ThemedView>
        )}
        keyExtractor={(item) => `${item[0].name}-${item[1]?.name ?? "none"}`}
      />
      {selectedWallpaper && 
        <DownloadPicture
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
        />
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    paddingVertical: 10,
  },
});
