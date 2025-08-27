import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Define proper types for icon names
type IoniconsName = keyof typeof Ionicons.glyphMap;
type GenderOption = {
  label: string;
  value: string;
  icon: IoniconsName;
};

type FormStep = "personal" | "contact";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [currentStep, setCurrentStep] = useState<FormStep>("personal");
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    surname: false,
    phone: false,
    email: false,
    address: false,
  });
  const router = useRouter();
  const { signIn } = useAuth();

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
    // alert("Registration successful ✅");
    signIn(email, "123"); // TODO: Temporary
    router.navigate("/(tabs)");
  };

  const handleFocus = (field: string) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleNextStep = () => {
    // Validate personal info before proceeding
    if (!firstName || !surname || !gender || !dob) {
      alert("Please fill in all personal information");
      return;
    }
    setCurrentStep("contact");
  };

  const handlePreviousStep = () => {
    setCurrentStep("personal");
  };

  // Use proper Ionicons names with type safety
  const genderOptions: GenderOption[] = [
    { label: "Male", value: "male", icon: "male" },
    { label: "Female", value: "female", icon: "female" },
    // { label: "Other", value: "other", icon: "person" },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get the appropriate icon based on gender selection
  const getGenderIcon = (): IoniconsName => {
    if (!gender) return "transgender";
    if (gender === "male") return "male";
    if (gender === "female") return "female";
    return "person";
  };

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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Header with back button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#64748B" />
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <Ionicons name="person-add" size={32} color="#4A76FF" />
              </View>
            </View>

            {/* <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us to protect what matters most
            </Text> */}

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Personal Information Step - Always in DOM but conditionally shown */}
              <View
                style={{
                  display: currentStep === "personal" ? "flex" : "none",
                }}
              >
                <Text style={styles.stepTitle}>Personal Information</Text>
                <Text style={styles.stepSubtitle}>Step 1 of 2</Text>

                {/* First Name */}
                <View
                  style={[
                    styles.inputWrapper,
                    isFocused.firstName && styles.inputFocused,
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={isFocused.firstName ? "#4A76FF" : "#94A3B8"}
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    onFocus={() => handleFocus("firstName")}
                    onBlur={() => handleBlur("firstName")}
                  />
                </View>

                {/* Surname */}
                <View
                  style={[
                    styles.inputWrapper,
                    isFocused.surname && styles.inputFocused,
                  ]}
                >
                  <Ionicons
                    name="people-outline"
                    size={20}
                    color={isFocused.surname ? "#4A76FF" : "#94A3B8"}
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                    onFocus={() => handleFocus("surname")}
                    onBlur={() => handleBlur("surname")}
                  />
                </View>

                {/* Gender Selector */}
                <TouchableOpacity
                  style={[
                    styles.inputWrapper,
                    gender ? styles.inputFocused : {},
                  ]}
                  onPress={() => setShowGenderModal(true)}
                >
                  <Ionicons
                    name={getGenderIcon()}
                    size={20}
                    color={gender ? "#4A76FF" : "#94A3B8"}
                    style={styles.icon}
                  />
                  <Text
                    style={[
                      styles.input,
                      { color: gender ? "#0F172A" : "#94A3B8" },
                    ]}
                  >
                    {gender
                      ? genderOptions.find((g) => g.value === gender)?.label
                      : "Select Gender"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#94A3B8" />
                </TouchableOpacity>

                {/* Date of Birth */}
                <TouchableOpacity
                  style={[styles.inputWrapper, dob ? styles.inputFocused : {}]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={dob ? "#4A76FF" : "#94A3B8"}
                    style={styles.icon}
                  />
                  <Text
                    style={[
                      styles.input,
                      { color: dob ? "#0F172A" : "#94A3B8" },
                    ]}
                  >
                    {dob ? formatDate(dob) : "Select Date of Birth"}
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

                {/* Next Button */}
                <TouchableOpacity
                  onPress={handleNextStep}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>Next</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Contact Information Step - Always in DOM but conditionally shown */}
              <View
                style={{ display: currentStep === "contact" ? "flex" : "none" }}
              >
                <View style={styles.stepHeader}>
                  <TouchableOpacity
                    onPress={handlePreviousStep}
                    style={styles.backButtonStep}
                  >
                    <Ionicons name="arrow-back" size={24} color="#4A76FF" />
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.stepTitle}>Contact Information</Text>
                    <Text style={styles.stepSubtitle}>Step 2 of 2</Text>
                  </View>
                </View>

                {/* Phone */}
                <View
                  style={[
                    styles.inputWrapper,
                    isFocused.phone && styles.inputFocused,
                  ]}
                >
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={isFocused.phone ? "#4A76FF" : "#94A3B8"}
                    style={styles.icon}
                  />
                  <TextInput
                    keyboardType="phone-pad"
                    placeholder="Phone Number"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => handleFocus("phone")}
                    onBlur={() => handleBlur("phone")}
                  />
                </View>

                {/* Email */}
                <View
                  style={[
                    styles.inputWrapper,
                    isFocused.email && styles.inputFocused,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={isFocused.email ? "#4A76FF" : "#94A3B8"}
                    style={styles.icon}
                  />
                  <TextInput
                    keyboardType="email-address"
                    placeholder="Email Address"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    autoCapitalize="none"
                  />
                </View>

                {/* Address */}
                <View
                  style={[
                    styles.inputWrapper,
                    styles.addressInput,
                    isFocused.address && styles.inputFocused,
                  ]}
                >
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={isFocused.address ? "#4A76FF" : "#94A3B8"}
                    style={[styles.icon, { marginTop: 12 }]}
                  />
                  <TextInput
                    placeholder="Address"
                    placeholderTextColor="#94A3B8"
                    style={[styles.input, styles.addressTextInput]}
                    value={address}
                    onChangeText={setAddress}
                    onFocus={() => handleFocus("address")}
                    onBlur={() => handleBlur("address")}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.registerButton}
                >
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Already have account? - Only show on first step */}
            {currentStep === "personal" && (
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowGenderModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderOption,
                    gender === option.value && styles.genderOptionSelected,
                  ]}
                  onPress={() => {
                    setGender(option.value);
                    setShowGenderModal(false);
                  }}
                >
                  <Ionicons
                    name={option.icon}
                    size={20}
                    color={gender === option.value ? "#4A76FF" : "#64748B"}
                  />
                  <Text
                    style={[
                      styles.genderOptionText,
                      gender === option.value &&
                        styles.genderOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {gender === option.value && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color="#4A76FF"
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 24,
    left: 24,
    zIndex: 10,
    padding: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoBackground: {
    backgroundColor: "#f0f4ff",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
  },
  formContainer: {
    width: "100%",
    marginBottom: 24,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonStep: {
    marginRight: 12,
    padding: 4,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#F1F5F9",
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: "#4A76FF",
    backgroundColor: "#FFFFFF",
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "500",
  },
  addressInput: {
    height: 100,
    alignItems: "flex-start",
  },
  addressTextInput: {
    height: "100%",
    textAlignVertical: "top",
    paddingTop: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 56,
    backgroundColor: "#4A76FF",
    borderRadius: 16,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
    gap: 8,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    backgroundColor: "white",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: "#2E86DE",
  },
  prevButtonText: {
    color: "#2E86DE",
    fontWeight: "500",
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: "#2E86DE",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "500",
    marginRight: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  registerButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#4A76FF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#64748B",
  },
  loginLink: {
    fontSize: 14,
    color: "#4A76FF",
    fontWeight: "700",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
    textAlign: "center",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  genderOptionSelected: {
    backgroundColor: "#f0f4ff",
  },
  genderOptionText: {
    fontSize: 16,
    color: "#64748B",
    marginLeft: 12,
    flex: 1,
  },
  genderOptionTextSelected: {
    color: "#4A76FF",
    fontWeight: "600",
  },
  checkIcon: {
    marginLeft: "auto",
  },
});
