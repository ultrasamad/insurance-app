import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#6C63FF", "#4A47FF", "#2B2A6E"]}
      style={styles.container}
    >
      <View style={styles.card}>
        {/* Logo */}
        <Image
          source={require("../assets/images/insurance.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title + Subtitle */}
        <Text style={styles.heading}>Welcome Back 👋</Text>
        <Text style={styles.subHeading}>Protecting what matters most</Text>

        {/* Intro */}
        <Text style={styles.introText}>
          Sign in or create an account in just minutes to access{"\n"}
          the best insurance policies tailored for you.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Link href="/register" asChild>
            <TouchableOpacity style={styles.registerButtonLink}>
              <FontAwesome name="user-plus" size={22} color="white" />
              <Text style={styles.registerText}>Get Started</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/login" asChild>
            <TouchableOpacity style={styles.loginButtonLink}>
              <MaterialIcons name="login" size={22} color="#4A47FF" />
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 22,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4A47FF",
    textAlign: "center",
    marginBottom: 16,
  },
  introText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,
  },
  registerButtonLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    backgroundColor: "#4A47FF",
    borderRadius: 14,
  },
  loginButtonLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    backgroundColor: "#eef0ff",
    borderRadius: 14,
  },
  registerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginLeft: 10,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A47FF",
    marginLeft: 10,
  },
});
