import { useAuth } from "@/providers/AuthProvider";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    signIn(email, password);
  };

  return (
    <LinearGradient
      colors={["#6C63FF", "#4A47FF", "#2B2A6E"]}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back 👋</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="envelope"
                size={18}
                color="#6C63FF"
                style={styles.icon}
              />
              <TextInput
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#888"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="lock"
                size={18}
                color="#6C63FF"
                style={styles.icon}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                style={styles.input}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome5
                  name={showPassword ? "eye-slash" : "eye"}
                  size={18}
                  color="#6C63FF"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerWrapper}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={20} color="#DB4437" />
                <Text style={styles.socialText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="apple1" size={20} color="#000" />
                <Text style={styles.socialText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.footerText}>
                {"Don't"} have an account?{" "}
                <Link href="/register" style={styles.link}>
                  <Text style={styles.link}>Register</Text>
                </Link>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f7fb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6f0",
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 14,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 54,
    backgroundColor: "#4A47FF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
    shadowColor: "#4A47FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: { fontSize: 18, fontWeight: "600", color: "white" },
  forgotPassword: {
    fontSize: 14,
    color: "#4A47FF",
    fontWeight: "500",
    textAlign: "right",
  },
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#ddd" },
  dividerText: {
    marginHorizontal: 10,
    color: "#777",
    fontSize: 14,
    fontWeight: "500",
  },
  socialContainer: { gap: 12 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  socialText: { marginLeft: 8, fontSize: 15, fontWeight: "500", color: "#333" },
  footerText: { fontSize: 14, textAlign: "center", color: "#555" },
  link: { color: "#4A47FF", fontWeight: "600" },
});
