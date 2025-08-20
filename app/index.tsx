import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* Background with subtle gradient */}
      <LinearGradient
        colors={["#f8f9ff", "#eef0ff", "#ffffff"]}
        style={styles.background}
      />

      {/* Decorative elements */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.content}>
        {/* Card with modern design */}
        <View style={styles.card}>
          {/* Logo with container */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Image
                source={require("../assets/images/insurance.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Title + Subtitle */}
          <Text style={styles.heading}>Welcome Back</Text>
          <View style={styles.waveContainer}>
            <Ionicons name="hand-left" size={24} color="#4A76FF" />
          </View>
          <Text style={styles.subHeading}>
            Protecting what matters most to you
          </Text>

          {/* Benefits list */}
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Ionicons name="shield-checkmark" size={18} color="#4A76FF" />
              </View>
              <Text style={styles.benefitText}>Comprehensive coverage</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Ionicons name="time" size={18} color="#4A76FF" />
              </View>
              <Text style={styles.benefitText}>24/7 claims support</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Ionicons name="cash" size={18} color="#4A76FF" />
              </View>
              <Text style={styles.benefitText}>Competitive pricing</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Link href="/register" asChild>
              <TouchableOpacity style={styles.registerButton}>
                <View style={styles.buttonContent}>
                  <FontAwesome name="user-plus" size={20} color="white" />
                  <Text style={styles.registerText}>Get Started</Text>
                </View>
              </TouchableOpacity>
            </Link>

            <Link href="/login" asChild>
              <TouchableOpacity style={styles.loginButton}>
                <View style={styles.buttonContent}>
                  <MaterialIcons name="login" size={20} color="#4A76FF" />
                  <Text style={styles.loginText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Footer text */}
        <Text style={styles.footerText}>
          © 2025 GlicoInsure • Privacy Policy • Terms of Service
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  circle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(74, 118, 255, 0.05)",
    top: -100,
    left: -100,
  },
  circle2: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(74, 118, 255, 0.03)",
    bottom: -70,
    right: -70,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBackground: {
    backgroundColor: "#f0f4ff",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    alignSelf: "center",
  },
  logo: {
    width: 60,
    height: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  waveContainer: {
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748B",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  benefitsContainer: {
    width: "100%",
    marginBottom: 32,
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  benefitIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  benefitText: {
    fontSize: 15,
    color: "#475569",
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    backgroundColor: "#4A76FF",
    borderRadius: 16,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  registerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A76FF",
    marginLeft: 10,
  },
  footerText: {
    position: "absolute",
    bottom: 32,
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
  },
});
