import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
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

  const VehicleUsageOptionCard = ({
    title,
    description,
    icon = "car",
  }: {
    title: string;
    description: string;
    icon?: MaterialIconsName;
  }) => (
    <TouchableOpacity style={styles.vehicleUsageCard}>
      <View style={styles.vehicleUsageCardHeader}>
        <View style={styles.selectorIcon}>
          <MaterialCommunityIcons name={icon} size={24} color="#4A76FF" />
        </View>
        <Text style={styles.vehicleUsageCardTitle}>{title}</Text>
        {/* Check mark */}
        <View style={styles.checkMarkContainer}>
          <MaterialCommunityIcons name="check" size={20} color="#37bc67ff" />
        </View>
      </View>

      <Text style={styles.vehicleUsageCardDescription}>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.quoteForm}>
      <TouchableOpacity
        style={styles.insuranceSelector}
        onPress={() => setShowInsuranceModal(true)}
      >
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
          {/* Vehicle usage selection cards */}
          <VehicleUsageOptionCard
            title="X.1 (Private Individual)"
            description="For personal vehicles used by you or your family."
          />
          <VehicleUsageOptionCard
            title="X.4 (Private Corporate)"
            description="For vehicles used for business purposes."
            icon="car-electric"
          />
          <VehicleUsageOptionCard
            title="Ambulance/Hearse"
            description="For vehicles used for medical or funeral purposes."
            icon="ambulance"
          />
          <VehicleUsageOptionCard
            title="Trade Plate - Class 1 GW.1"
            description="Specialized temporary license plates."
          />
          {/* <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle Year</Text>
            <BottomSheetTextInput
              style={styles.input}
              placeholder="e.g., 2021"
              value={vehicleYear}
              onChangeText={setVehicleYear}
              keyboardType="numeric"
            />
          </View> */}
          {/* <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle Make</Text>
            <BottomSheetTextInput
              style={styles.input}
              placeholder="e.g., Toyota"
              value={vehicleMake}
              onChangeText={setVehicleMake}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle Model</Text>
            <BottomSheetTextInput
              style={styles.input}
              placeholder="e.g., Corolla"
              value={vehicleModel}
              onChangeText={setVehicleModel}
            />
          </View> */}
        </View>
      )}

      <TouchableOpacity style={styles.getQuoteButton}>
        <Text style={styles.getQuoteButtonText}>Continue</Text>
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
    width: "100%",
  },
  vehicleForm: {
    marginBottom: 16,
    gap: 12,
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
  vehicleUsageCard: {
    flex: 1,
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    position: "relative",
  },
  vehicleUsageCardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkMarkContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#37bc67ff",
    position: "absolute",
    top: 0,
    right: 0,
  },
  vehicleUsageCardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginTop: 8,
  },
  vehicleUsageCardDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
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
