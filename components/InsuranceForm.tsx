import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type MaterialIconsName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function InsuranceForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(
    null
  );
  const [selectedUsage, setSelectedUsage] = useState<string | null>(null);
  const [carInfo, setCarInfo] = useState({
    make: "",
    model: "",
    year: "",
  });

  type InsuranceType = {
    id: string;
    title: string;
    description: string;
    icon: MaterialIconsName;
  };

  const insuranceTypes: InsuranceType[] = [
    {
      id: "motor",
      title: "Motor Insurance",
      description: "Coverage for cars, motorcycles, and other vehicles",
      icon: "car",
    },
    {
      id: "fire",
      title: "Fire Insurance",
      description: "Protection against fire damage to property",
      icon: "fire",
    },
    {
      id: "accident",
      title: "Personal Accident",
      description: "Coverage for accidental injuries and death",
      icon: "medical-bag",
    },
  ];

  const usageTypes = [
    { id: "personal", label: "Personal Use" },
    { id: "commercial", label: "Commercial Use" },
    { id: "ride_sharing", label: "Ride Sharing" },
    { id: "rental", label: "Rental Vehicle" },
  ];

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCarInfoChange = (field: string, value: string) => {
    setCarInfo({ ...carInfo, [field]: value });
  };

  const renderStepIndicator = () => {
    const steps = ["Insurance Type", "Usage Type", "Car Details"];

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep + 1) * 33.33}%` },
            ]}
          />
        </View>
        <View style={styles.stepLabels}>
          {steps.map((step, index) => (
            <Text
              key={index}
              style={[
                styles.stepLabel,
                index <= currentStep && styles.stepLabelActive,
              ]}
            >
              {step}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Insurance Type</Text>
      <Text style={styles.stepSubtitle}>
        Choose the type of coverage you need
      </Text>

      <View style={styles.cardsContainer}>
        {insuranceTypes.map((insurance) => (
          <TouchableOpacity
            key={insurance.id}
            style={[
              styles.insuranceCard,
              selectedInsurance === insurance.id &&
                styles.insuranceCardSelected,
            ]}
            onPress={() => setSelectedInsurance(insurance.id)}
          >
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons
                name={insurance.icon}
                size={32}
                color={selectedInsurance === insurance.id ? "#2E86DE" : "#666"}
              />
            </View>
            <Text style={styles.cardTitle}>{insurance.title}</Text>
            <Text style={styles.cardDescription}>{insurance.description}</Text>
            {selectedInsurance === insurance.id && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color="#2E86DE" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Vehicle Usage Type</Text>
      <Text style={styles.stepSubtitle}>
        How will you be using your vehicle?
      </Text>

      <View style={styles.usageContainer}>
        {usageTypes.map((usage) => (
          <TouchableOpacity
            key={usage.id}
            style={[
              styles.usageButton,
              selectedUsage === usage.id && styles.usageButtonSelected,
            ]}
            onPress={() => setSelectedUsage(usage.id)}
          >
            <Text
              style={[
                styles.usageButtonText,
                selectedUsage === usage.id && styles.usageButtonTextSelected,
              ]}
            >
              {usage.label}
            </Text>
            {selectedUsage === usage.id && (
              <Ionicons
                name="checkmark"
                size={20}
                color="#2E86DE"
                style={styles.usageCheckmark}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Vehicle Information</Text>
      <Text style={styles.stepSubtitle}>
        Please provide your vehicle details
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Make</Text>
          <TextInput
            style={styles.textInput}
            value={carInfo.make}
            onChangeText={(text) => handleCarInfoChange("make", text)}
            placeholder="e.g. Toyota, Honda"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Model</Text>
          <TextInput
            style={styles.textInput}
            value={carInfo.model}
            onChangeText={(text) => handleCarInfoChange("model", text)}
            placeholder="e.g. Camry, Civic"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Year of Manufacture</Text>
          <TextInput
            style={styles.textInput}
            value={carInfo.year}
            onChangeText={(text) => handleCarInfoChange("year", text)}
            placeholder="e.g. 2020"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insurance Purchase</Text>
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content}>
        {currentStep === 0 && renderStep1()}
        {currentStep === 1 && renderStep2()}
        {currentStep === 2 && renderStep3()}
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.prevButton,
            currentStep === 0 && styles.navButtonDisabled,
          ]}
          onPress={prevStep}
          disabled={currentStep === 0}
        >
          <Ionicons name="arrow-back" size={20} color="#2E86DE" />
          <Text style={styles.prevButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            ((currentStep === 0 && !selectedInsurance) ||
              (currentStep === 1 && !selectedUsage)) &&
              styles.navButtonDisabled,
          ]}
          onPress={nextStep}
          disabled={
            (currentStep === 0 && !selectedInsurance) ||
            (currentStep === 1 && !selectedUsage)
          }
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 2 ? "Complete Purchase" : "Next"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  progressContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2E86DE",
    borderRadius: 4,
  },
  stepLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepLabel: {
    fontSize: 12,
    color: "#6c757d",
  },
  stepLabelActive: {
    color: "#2E86DE",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  stepSubtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 24,
  },
  cardsContainer: {
    marginBottom: 16,
  },
  insuranceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insuranceCardSelected: {
    borderColor: "#2E86DE",
    shadowColor: "#2E86DE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIconContainer: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  selectedIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  usageContainer: {
    marginBottom: 16,
  },
  usageButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dee2e6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usageButtonSelected: {
    borderColor: "#2E86DE",
    backgroundColor: "#e8f4fd",
  },
  usageButtonText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  usageButtonTextSelected: {
    color: "#2E86DE",
    fontWeight: "500",
  },
  usageCheckmark: {
    marginLeft: 8,
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#2c3e50",
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
});
