import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useLikedWallpapers, Wallpaper } from "@/hooks/useWallpapers";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export const DownloadPicture = ({
  onClose,
  wallpaper,
}: {
  onClose: () => void;
  wallpaper: Wallpaper;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useColorScheme();
  const likedWallpapers = useLikedWallpapers();
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose]
  );

  const iconColor = theme === "light" ? Colors.light.icon : Colors.dark.icon;

  const downloadImage = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "This app needs permission to save images to your device."
        );
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}${wallpaper.name}.jpg`;

      const downloadResult = await FileSystem.downloadAsync(
        wallpaper.url,
        fileUri
      );

      await MediaLibrary.createAssetAsync(downloadResult.uri);
      Alert.alert("Download complete", "Wallpaper downloaded successfully.");
    } catch (error) {
      console.error("Download Failed:", error);
      Alert.alert("Download Failed", "Failed to download wallpaper.");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["150%"]}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        onClose={onClose}
        handleIndicatorStyle={{ height: 4, backgroundColor: "#aaa" }}
        backgroundStyle={{
          backgroundColor: theme === "light" ? "white" : "black",
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Image
            style={styles.image}
            source={{ uri: wallpaper?.url || "" }}
            onError={() => console.log("Failed to load image.")}
            accessible
            accessibilityLabel={`Wallpaper image of ${
              wallpaper?.name ?? "unknown"
            }`}
          />
          <View style={styles.headBtn}>
            <Ionicons
              name={"close"}
              size={25}
              color={iconColor}
              onPress={onClose}
            />
            <View style={{ flexDirection: "row", gap: 15 }}>
              <Ionicons
                name={"heart-circle-outline"}
                size={25}
                color={iconColor}
              />
              <Ionicons name={"share-social"} size={25} color={iconColor} />
            </View>
          </View>
          <Text style={styles.title}>{wallpaper?.name}</Text>
          <TouchableOpacity
            style={styles.btn}
            accessible
            accessibilityLabel="Download wallpaper"
            onPress={downloadImage}
          >
            <Ionicons name={"download"} size={25} color={iconColor} />
            <Text style={styles.btnText}>Download</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  btn: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    margin: 10,
  },
  headBtn: {
    position: "absolute",
    top: 10,
    flexDirection: "row",
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
