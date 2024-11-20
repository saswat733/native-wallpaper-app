import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useColorScheme,
  Appearance,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";

export default function Account() {
  const [pictureOpen, setPictureOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "white" : "#121212",
      }}
    >
      <Header />
        <ThemedView>
          <AuthButton
            label={"Sign in with Google"}
            icon={
              <Ionicons
                name="logo-google"
                size={24}
                color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
              />
            }
          />
          <AuthButton
            label={"Sign in with GitHub"}
            icon={
              <Ionicons
                name="logo-github"
                size={24}
                color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
              />
            }
          />
        </ThemedView>
        <ThemeSelector />
        <About/>
    </SafeAreaView>
  );
}

function About() {
  const theme = useColorScheme() ?? "light";

  return <>
  <ThemedView style={styles.container}>
    <View style={{}}>
    <Text  style={{ color:theme==='light'?Colors.light.text:Colors.dark.text,textAlign: "center", marginTop: 20,fontWeight:'bold',fontSize:35 }}>About</Text>
    <Text style={{ color:theme==='light'?Colors.light.text:Colors.dark.text,textAlign: "center", marginHorizontal: 20, marginTop: 10 }}>
      This is a simple example of a settings page with a theme selector and authentication buttons.
    </Text>
    </View>
  </ThemedView>
  </>;
}

function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | null>(
    "light"
  );

  const handleThemeChange = (theme: "light" | "dark" | null) => {
    setSelectedTheme(theme);
    Appearance.setColorScheme(theme);
  };

  const theme = useColorScheme() ?? "light";

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.header,
          { color: theme === "light" ? "black" : "white" },
        ]}
      >
        Settings
      </Text>
      <Text style={[styles.subheader]}>Theme</Text>
      <View style={styles.themes}>
        <ThemedButton
          title="Light"
          selected={selectedTheme === "light"}
          onPress={() => handleThemeChange("light")}
        />
        <ThemedButton
          title="Dark"
          selected={selectedTheme === "dark"}
          onPress={() => handleThemeChange("dark")}
        />
        <ThemedButton
          title="System"
          selected={selectedTheme === null}
          onPress={() => handleThemeChange(null)}
        />
      </View>
    </View>
  );
}

function ThemedButton({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.btnStyle,
        selected && { borderColor: "blue", borderWidth: 2 },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Set theme to ${title}`}
    >
      <ThemedText style={{ color: "black" }}>{title}</ThemedText>
    </Pressable>
  );
}

function Header() {
  const theme = useColorScheme() ?? "light";
  return (
    <View>
      <Text
        style={[
          styles.header,
          { color: theme === "light" ? "black" : "white" },
        ]}
      >
        Account
      </Text>
      <Text style={[styles.subheader]}>Sign in to save your data</Text>
    </View>
  );
}

function AuthButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  const theme = useColorScheme() ?? "light";
  return (
    <Pressable
      style={[
        styles.authButton,
        { backgroundColor: theme === "light" ? "black" : "white" },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Authenticate using ${label}`}
    >
      {icon}
      <Text
        style={[
          styles.authButtonText,
          { color: theme === "light" ? "white" : "black" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  btnStyle: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 100,
    backgroundColor: "white",
    justifyContent: "center",
    borderWidth: 1,
    alignItems: "center",
  },
  themes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  authButton: {
    padding: 10,
    marginHorizontal: 40,
    marginVertical: 5,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
  },
  authButtonText: {
    marginLeft: 10,
    fontSize: 20,
  },
});
