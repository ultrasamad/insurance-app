import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const QuoteCalculator = () => {
  const [selectedInsuranceType, setSelectedInsuranceType] = useState("auto");
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  type MaterialIconsName = keyof typeof MaterialCommunityIcons.glyphMap;

  type InsuranceType = {
    id: string;
    name: string;
    icon: MaterialIconsName;
  };

  const insuranceTypes: InsuranceType[] = [
    { id: "auto", name: "Auto Insurance", icon: "car" },
    { id: "home", name: "Home Insurance", icon: "home" },
    { id: "health", name: "Health Insurance", icon: "medical-bag" },
    { id: "life", name: "Life Insurance", icon: "heart" },
  ];

  const InsuranceTypeOption = ({ type }: { type: InsuranceType }) => (
    <TouchableOpacity
      style={[
        styles.insuranceOption,
        selectedInsuranceType === type.id && styles.insuranceOptionSelected,
      ]}
      onPress={() => {
        setSelectedInsuranceType(type.id);
        setShowInsuranceModal(false);
      }}
    >
      <View
        style={[
          styles.insuranceOptionIcon,
          selectedInsuranceType === type.id &&
            styles.insuranceOptionIconSelected,
        ]}
      >
        <MaterialCommunityIcons
          name={type.icon}
          size={20}
          color={selectedInsuranceType === type.id ? "#4A76FF" : "#64748B"}
        />
      </View>
      <Text
        style={[
          styles.insuranceOptionText,
          selectedInsuranceType === type.id &&
            styles.insuranceOptionTextSelected,
        ]}
      >
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  const selectedInsurance = insuranceTypes.find(
    (type) => type.id === selectedInsuranceType
  );

  return (
    <View style={styles.quoteForm}>
      <Text style={styles.sectionTitle}>Get a New Quote</Text>

      <TouchableOpacity style={styles.insuranceSelector} onPress={() => null}>
        <View style={styles.selectorContent}>
          <View style={styles.selectorLeft}>
            <View style={styles.selectorIcon}>
              <MaterialCommunityIcons
                name={selectedInsurance?.icon}
                size={20}
                color="#4A76FF"
              />
            </View>
            <Text style={styles.selectorText}>{selectedInsurance?.name}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#64748B" />
        </View>
      </TouchableOpacity>

      {selectedInsuranceType === "auto" && (
        <View style={styles.vehicleForm}>
          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Vehicle Year</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 2021"
                value={vehicleYear}
                onChangeText={setVehicleYear}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Vehicle Make</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Toyota"
                value={vehicleMake}
                onChangeText={setVehicleMake}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle Model</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Corolla"
              value={vehicleModel}
              onChangeText={setVehicleModel}
            />
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.getQuoteButton}>
        <Text style={styles.getQuoteButtonText}>Get Quote</Text>
      </TouchableOpacity>

      {/* Insurance Type Modal */}
      <Modal
        visible={showInsuranceModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInsuranceModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowInsuranceModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Insurance Type</Text>
              {insuranceTypes.map((type) => (
                <InsuranceTypeOption key={type.id} type={type} />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default QuoteCalculator;

const styles = StyleSheet.create({
  quoteForm: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  vehicleForm: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
  },
  getQuoteButton: {
    backgroundColor: "#4A76FF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  getQuoteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  insuranceSelector: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  selectorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectorIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
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
    maxWidth: 400,
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
  insuranceOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  insuranceOptionSelected: {
    backgroundColor: "#F0F4FF",
  },
  insuranceOptionText: {
    fontSize: 16,
    color: "#64748B",
  },
  insuranceOptionTextSelected: {
    color: "#4A76FF",
    fontWeight: "600",
  },
  insuranceOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  insuranceOptionIconSelected: {
    backgroundColor: "#FFFFFF",
  },
});
