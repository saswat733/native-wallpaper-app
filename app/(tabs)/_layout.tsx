import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const theme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === 'light' ? 'black' : 'white',
        tabBarInactiveTintColor: theme === 'light' ? 'gray' : '#888',
        tabBarStyle: {
          backgroundColor: theme === 'light' ? 'white' : '#000',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="forYou"
        options={{
          title: 'For You',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Ionicons
            name="earth"
            size={28}
            color={theme === 'light' ? color : color}
          />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person-circle"
              size={28}
              color={theme === 'light' ? color : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
