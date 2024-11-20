import { SplitView } from '@/components/SplitView';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import useWallpapers, { Fullwallpaper, useLibraryWallpapers, useLikedWallpapers, useSuggestedWallpapers } from '@/hooks/useWallpapers';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import React, { memo } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  const theme = useColorScheme() || 'light';

  return (
    <ThemedSafeAreaView style={styles.container}>
      <Tab.Navigator screenOptions={tabBarStyles(theme)}>
        <Tab.Screen
          name="Library"
          children={() => <WallpapersScreen useWallpapersHook={useLibraryWallpapers} />}
        />
        <Tab.Screen
          name="Liked"
          children={() => {
            const { likedWallpapers } = useLikedWallpapers();
            return <WallpapersScreen useWallpapersHook={() => likedWallpapers} />;
          }}
        />
        <Tab.Screen
          name="Suggested"
          children={() => <WallpapersScreen useWallpapersHook={useSuggestedWallpapers} />}
        />
      </Tab.Navigator>
    </ThemedSafeAreaView>
  );
}

const WallpapersScreen = memo(({ useWallpapersHook }: { useWallpapersHook: () => Fullwallpaper[] }) => {
  const wallpapers = useWallpapersHook();

  if (!wallpapers.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No wallpapers available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SplitView wallpapers={wallpapers} />
    </View>
  );
});

const tabBarStyles = (theme: 'light' | 'dark') => ({
  tabBarStyle: {
    backgroundColor: theme === 'light' ? 'white' : '#121212',
  },
  tabBarActiveTintColor: theme === 'light' ? 'black' : 'white',
  tabBarIndicatorStyle: {
    backgroundColor: theme === 'light' ? 'black' : 'red',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});
