import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = () => {
    if (
      !firstName ||
      !surname ||
      !gender ||
      !dob ||
      !phone ||
      !email ||
      !address
    ) {
      alert("Please fill in all fields");
      return;
    }
    alert("Registration successful ✅");
  };

  return (
    <LinearGradient
      colors={["#6C63FF", "#4A47FF", "#2B2A6E"]}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill in your details to get started
            </Text>

            {/* First Name */}
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="user"
                size={18}
                color="#6C63FF"
                style={styles.icon}
              />
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#888"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            {/* Surname */}
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="id-card"
                size={18}
                color="#6C63FF"
                style={styles.icon}
              />
              <TextInput
                placeholder="Surname"
                placeholderTextColor="#888"
                style={styles.input}
                value={surname}
                onChangeText={setSurname}
              />
            </View>

            {/* Gender */}
            <View style={styles.pickerContainer}>
              <FontAwesome5
                name="venus-mars"
                size={18}
                color="#6C63FF"
                style={styles.icon}
              />
              <Picker
                selectedValue={gender}
                onValueChange={(value) => setGender(value)}
                style={styles.picker}
                dropdownIconColor="#6C63FF"
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            {/* Date of Birth */}
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <FontAwesome5
                name="birthday-cake"
                size={18}
                color="#6C63FF"
                style={styles.icon}
              />
              <Text style={[styles.input, { color: dob ? "#000" : "#888" }]}>
                {dob ? dob.toDateString() : "Select Date of Birth"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDob(selectedDate);
                }}
              />
            )}

            {/* Phone */}
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="phone"
                size={18}
                color="#6C63FF"
                style={styles.icon}
              />
              <TextInput
                keyboardType="phone-pad"
                placeholder="Phone Number"
                placeholderTextColor="#888"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />
            </View>

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

            {/* Address */}
            <View
              style={[
                styles.inputWrapper,
                { height: 90, alignItems: "flex-start" },
              ]}
            >
              <FontAwesome5
                name="map-marker-alt"
                size={18}
                color="#6C63FF"
                style={[styles.icon, { marginTop: 14 }]}
              />
              <TextInput
                placeholder="Address"
                placeholderTextColor="#888"
                style={[
                  styles.input,
                  { height: "100%", textAlignVertical: "top" },
                ]}
                value={address}
                onChangeText={setAddress}
                multiline
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Already have account? */}
            <TouchableOpacity>
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Link href="/login" style={styles.link}>
                  <Text style={styles.link}>Login</Text>
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
    maxWidth: 450,
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
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f7fb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6f0",
    paddingHorizontal: 8,
    height: 54, // slightly taller to prevent cut-off
    marginBottom: 14,
  },
  picker: {
    flex: 1,
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
  footerText: { fontSize: 14, textAlign: "center", color: "#555" },
  link: { color: "#4A47FF", fontWeight: "600" },
});
