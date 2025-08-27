import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type MaterialIconsName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function ModalScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInsurance, setSelectedInsurance] = useState<number | null>(
    null
  );
  const [selectedUsage, setSelectedUsage] = useState<number | null>(null);
  const [carInfo, setCarInfo] = useState({
    make: "",
    model: "",
    year: "",
    chassisNumber: "",
    color: "",
    bodyType: "",
  });
  const [riskDetails, setRiskDetails] = useState({
    seats: "",
    currency: "GHS",
    carValue: "",
    accessoriesValue: "",
  });
  const [policyStartDate, setPolicyStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBodyTypeModal, setShowBodyTypeModal] = useState(false);

  type InsuranceType = {
    id: number;
    title: string;
    description: string;
    icon: MaterialIconsName;
  };

  const insuranceTypes: InsuranceType[] = [
    {
      id: 1,
      title: "Motor Insurance",
      description: "Coverage for cars, motorcycles, and other vehicles",
      icon: "car",
    },
    {
      id: 2,
      title: "Fire Insurance",
      description: "Protection against fire damage to property",
      icon: "fire",
    },
    {
      id: 3,
      title: "Personal Accident",
      description: "Coverage for accidental injuries and death",
      icon: "medical-bag",
    },
  ];

  type VehicleUsageType = {
    id: number;
    name: string;
    description: string;
    icon: MaterialIconsName;
  };

  const vehicleUsageTypes: VehicleUsageType[] = [
    {
      id: 1,
      name: "Private Individual",
      description: "For personal vehicles used by you or your family.",
      icon: "account",
    },
    {
      id: 2,
      name: "Private Corporate",
      description: "For vehicles used for business purposes.",
      icon: "briefcase",
    },
    {
      id: 3,
      name: "Taxi",
      description: "For vehicles used as taxis.",
      icon: "taxi",
    },
    {
      id: 4,
      name: "Hiring cars",
      description: "For vehicles rented out to customers.",
      icon: "car-connected",
    },
    {
      id: 5,
      name: "Mini Bus",
      description: "For vehicles designed to carry multiple passengers.",
      icon: "bus",
    },
    {
      id: 6,
      name: "Maxi Bus",
      description: "For larger vehicles designed to carry more passengers.",
      icon: "bus-double-decker",
    },
    {
      id: 7,
      name: "Motor Cycle",
      description: "For two-wheeled vehicles.",
      icon: "motorbike",
    },
    {
      id: 8,
      name: "Ambulance",
      description: "For vehicles used for medical purposes.",
      icon: "ambulance",
    },
  ];

  const bodyTypes = [
    "Sedan",
    "Hatchback",
    "SUV",
    "Coupe",
    "Convertible",
    "Wagon",
    "Van",
    "Pickup Truck",
    "Minivan",
    "Crossover",
  ];

  const currencies = [
    { code: "GHS", name: "Ghana Cedi", symbol: "₵" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      // Show success alert when completing purchase
      showSuccessAlert();
    }
  };

  const showSuccessAlert = () => {
    Alert.alert(
      "Purchase Successful!",
      "Your insurance policy has been purchased successfully. You will receive a confirmation email shortly.",
      [
        {
          text: "OK",
          onPress: () => {
            // You could add navigation logic here to go back to the home screen
            router.navigate("/(tabs)");
          },
        },
      ]
    );
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCarInfoChange = (field: string, value: string) => {
    setCarInfo({ ...carInfo, [field]: value });
  };

  const handleRiskDetailsChange = (field: string, value: string) => {
    setRiskDetails({ ...riskDetails, [field]: value });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPolicyStartDate(selectedDate);
    }
  };

  const selectBodyType = (bodyType: string) => {
    handleCarInfoChange("bodyType", bodyType);
    setShowBodyTypeModal(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderStepIndicator = () => {
    const steps = [
      "Insurance Type",
      "Risk Details",
      "Usage Type",
      "Car Details",
    ];

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep + 1) * 25}%` },
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
      <Text style={styles.stepTitle}>Risk Details</Text>
      <Text style={styles.stepSubtitle}>
        Please provide details about your vehicle
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Number of Seats</Text>
          <TextInput
            style={styles.textInput}
            value={riskDetails.seats}
            onChangeText={(text) => handleRiskDetailsChange("seats", text)}
            placeholder="e.g. 5"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Currency</Text>
          <View style={styles.currencyContainer}>
            {currencies.map((currency) => (
              <TouchableOpacity
                key={currency.code}
                style={[
                  styles.currencyButton,
                  riskDetails.currency === currency.code &&
                    styles.currencyButtonSelected,
                ]}
                onPress={() =>
                  handleRiskDetailsChange("currency", currency.code)
                }
              >
                <Text
                  style={[
                    styles.currencyButtonText,
                    riskDetails.currency === currency.code &&
                      styles.currencyButtonTextSelected,
                  ]}
                >
                  {currency.code} ({currency.symbol})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Value of Car</Text>
          <View style={styles.valueInputContainer}>
            <View style={styles.currencySymbol}>
              <Text style={styles.currencySymbolText}>
                {
                  currencies.find((c) => c.code === riskDetails.currency)
                    ?.symbol
                }
              </Text>
            </View>
            <TextInput
              style={[styles.textInput, styles.valueInput]}
              value={riskDetails.carValue}
              onChangeText={(text) => handleRiskDetailsChange("carValue", text)}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Value of Accessories</Text>
          <View style={styles.valueInputContainer}>
            <View style={styles.currencySymbol}>
              <Text style={styles.currencySymbolText}>
                {
                  currencies.find((c) => c.code === riskDetails.currency)
                    ?.symbol
                }
              </Text>
            </View>
            <TextInput
              style={[styles.textInput, styles.valueInput]}
              value={riskDetails.accessoriesValue}
              onChangeText={(text) =>
                handleRiskDetailsChange("accessoriesValue", text)
              }
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Vehicle Usage Type</Text>
      <Text style={styles.stepSubtitle}>
        How will you be using your vehicle?
      </Text>

      <View style={styles.usageContainer}>
        {vehicleUsageTypes.map((usage) => (
          <TouchableOpacity
            key={usage.id}
            style={[
              styles.usageButton,
              selectedUsage === usage.id && styles.usageButtonSelected,
            ]}
            onPress={() => setSelectedUsage(usage.id)}
          >
            <View style={styles.usageIconContainer}>
              <MaterialCommunityIcons
                name={usage.icon}
                size={24}
                color={selectedUsage === usage.id ? "#2E86DE" : "#666"}
              />
            </View>
            <View style={styles.usageTextContainer}>
              <Text
                style={[
                  styles.usageButtonText,
                  selectedUsage === usage.id && styles.usageButtonTextSelected,
                ]}
              >
                {usage.name}
              </Text>
              <Text style={styles.usageDescription}>{usage.description}</Text>
            </View>
            {selectedUsage === usage.id && (
              <View style={styles.usageCheckmark}>
                <Ionicons name="checkmark-circle" size={24} color="#2E86DE" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
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

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Body Type</Text>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => setShowBodyTypeModal(true)}
          >
            <Text style={carInfo.bodyType ? {} : { color: "#6c757d" }}>
              {carInfo.bodyType || "Select body type"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Chassis Number</Text>
          <TextInput
            style={styles.textInput}
            value={carInfo.chassisNumber}
            onChangeText={(text) => handleCarInfoChange("chassisNumber", text)}
            placeholder="Enter chassis number"
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Color</Text>
          <TextInput
            style={styles.textInput}
            value={carInfo.color}
            onChangeText={(text) => handleCarInfoChange("color", text)}
            placeholder="e.g. Red, Blue, Black"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Policy Start Date</Text>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{formatDate(policyStartDate)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={policyStartDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>
      </View>

      <Modal
        visible={showBodyTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBodyTypeModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowBodyTypeModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Body Type</Text>
          <ScrollView>
            {bodyTypes.map((bodyType, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalOption,
                  carInfo.bodyType === bodyType && styles.modalOptionSelected,
                ]}
                onPress={() => selectBodyType(bodyType)}
              >
                <Text style={styles.modalOptionText}>{bodyType}</Text>
                {carInfo.bodyType === bodyType && (
                  <Ionicons name="checkmark" size={20} color="#2E86DE" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Insurance Quote</Text>
        </View>

        {renderStepIndicator()}

        <ScrollView style={styles.content}>
          {currentStep === 0 && renderStep1()}
          {currentStep === 1 && renderStep2()}
          {currentStep === 2 && renderStep3()}
          {currentStep === 3 && renderStep4()}
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
                (currentStep === 1 &&
                  (!riskDetails.seats || !riskDetails.carValue)) ||
                (currentStep === 2 && !selectedUsage) ||
                (currentStep === 3 &&
                  (!carInfo.make ||
                    !carInfo.model ||
                    !carInfo.year ||
                    !carInfo.bodyType ||
                    !carInfo.chassisNumber ||
                    !carInfo.color))) &&
                styles.navButtonDisabled,
            ]}
            onPress={nextStep}
            disabled={
              (currentStep === 0 && !selectedInsurance) ||
              (currentStep === 1 &&
                (!riskDetails.seats || !riskDetails.carValue)) ||
              (currentStep === 2 && !selectedUsage) ||
              (currentStep === 3 &&
                (!carInfo.make ||
                  !carInfo.model ||
                  !carInfo.year ||
                  !carInfo.bodyType ||
                  !carInfo.chassisNumber ||
                  !carInfo.color))
            }
          >
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? "Complete" : "Next"}
            </Text>
            {currentStep < 3 && (
              <Ionicons name="arrow-forward" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
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
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dee2e6",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  usageButtonSelected: {
    borderColor: "#2E86DE",
    backgroundColor: "#e8f4fd",
    shadowColor: "#2E86DE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  usageIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f5ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  usageTextContainer: {
    flex: 1,
  },
  usageButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 4,
  },
  usageButtonTextSelected: {
    color: "#2E86DE",
  },
  usageDescription: {
    fontSize: 12,
    color: "#6c757d",
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
    justifyContent: "center",
  },
  currencyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  currencyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "white",
  },
  currencyButtonSelected: {
    borderColor: "#2E86DE",
    backgroundColor: "#e8f4fd",
  },
  currencyButtonText: {
    fontSize: 14,
    color: "#6c757d",
  },
  currencyButtonTextSelected: {
    color: "#2E86DE",
    fontWeight: "500",
  },
  valueInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    width: 40,
    height: 48,
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: "#dee2e6",
    justifyContent: "center",
    alignItems: "center",
  },
  currencySymbolText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6c757d",
  },
  valueInput: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "50%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalOptionSelected: {
    backgroundColor: "#e8f4fd",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#2c3e50",
  },
});
