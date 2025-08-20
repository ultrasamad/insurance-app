import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [activePolicy, setActivePolicy] = useState("Comprehensive");

  type MaterialIconsName = keyof typeof MaterialCommunityIcons.glyphMap;

  type Policy = {
    type: string;
    holder: string;
    car: string;
    plate: string;
    policyType: string;
    expiry: string;
    premium: string;
    status: string;
    icon: MaterialIconsName;
  };

  const policies: Policy[] = [
    {
      type: "Comprehensive",
      holder: "Samad Ibrahim",
      car: "Toyota Corolla 2021",
      plate: "ABC-1234",
      policyType: "Full Coverage",
      expiry: "Dec 31, 2025",
      premium: "GHS145.50",
      status: "Active",
      icon: "car",
    },
    {
      type: "Third Party",
      holder: "Samad Ibrahim",
      car: "Honda Civic 2020",
      plate: "XYZ-5678",
      policyType: "Third Party Liability",
      expiry: "Aug 01, 2025",
      premium: "GHS89.75",
      status: "Active",
      icon: "car",
    },
    {
      type: "Health",
      holder: "Samad Ibrahim",
      car: "-",
      plate: "-",
      policyType: "Medical Coverage",
      expiry: "Mar 15, 2026",
      premium: "GHS210.00",
      status: "Active",
      icon: "medical-bag",
    },
  ];

  const selectedPolicy = policies.find((p) => p.type === activePolicy);

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

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.welcome}>Welcome back</Text>
              <Text style={styles.username}>Samad Ibrahim</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#64748B" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Main Policy Card */}
        <View style={styles.mainPolicyCard}>
          <LinearGradient
            colors={["#4A76FF", "#6C8DFF"]}
            style={styles.policyGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.policyHeader}>
              <View>
                <Text style={styles.policyType}>
                  {selectedPolicy?.type} Insurance
                </Text>
                <Text style={styles.policyStatus}>
                  <View style={styles.statusIndicator} />
                  {selectedPolicy?.status}
                </Text>
              </View>
              <MaterialCommunityIcons
                name={selectedPolicy?.icon}
                size={32}
                color="rgba(255,255,255,0.8)"
              />
            </View>

            <View style={styles.policyDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Policy Holder</Text>
                  <Text style={styles.detailValue}>
                    {selectedPolicy?.holder}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Expiry Date</Text>
                  <Text style={styles.detailValue}>
                    {selectedPolicy?.expiry}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Vehicle</Text>
                  <Text style={styles.detailValue}>{selectedPolicy?.car}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Premium</Text>
                  <Text style={styles.detailValue}>
                    {selectedPolicy?.premium}/mo
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.policyActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryAction]}
              >
                <Text style={styles.primaryActionText}>Renew Policy</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Policy Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Policies</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.policySelector}
          >
            {policies.map((policy) => (
              <TouchableOpacity
                key={policy.type}
                style={[
                  styles.policyOption,
                  activePolicy === policy.type && styles.policyOptionActive,
                ]}
                onPress={() => setActivePolicy(policy.type)}
              >
                <MaterialCommunityIcons
                  name={policy.icon}
                  size={20}
                  color={activePolicy === policy.type ? "#4A76FF" : "#64748B"}
                />
                <Text
                  style={[
                    styles.policyOptionText,
                    activePolicy === policy.type &&
                      styles.policyOptionTextActive,
                  ]}
                >
                  {policy.type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <View style={styles.quickActionsRow}>
              <ActionBtn icon="add-circle-outline" label="New Claim" />
              <ActionBtn icon="document-text-outline" label="Documents" />
            </View>
            <View style={styles.quickActionsRow}>
              <ActionBtn icon="card-outline" label="Payments" />
              <ActionBtn icon="chatbubble-outline" label="Support" />
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View
                style={[styles.activityIcon, { backgroundColor: "#ECFDF5" }]}
              >
                <Ionicons name="checkmark-done" size={18} color="#10B981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Payment Received</Text>
                <Text style={styles.activityDesc}>
                  December premium payment
                </Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <Text style={styles.activityAmount}>GHS145.50</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.activityItem}>
              <View
                style={[styles.activityIcon, { backgroundColor: "#FFFBEB" }]}
              >
                <Ionicons name="time" size={18} color="#F59E0B" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Policy Update</Text>
                <Text style={styles.activityDesc}>
                  Documents require review
                </Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

type IoniconsName = keyof typeof Ionicons.glyphMap;

const ActionBtn = ({ icon, label }: { icon: IoniconsName; label: string }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <View style={styles.actionIconContainer}>
      <Ionicons name={icon} size={22} color="#4A76FF" />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

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
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  welcome: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
  },
  username: {
    color: "#1E293B",
    fontSize: 18,
    fontWeight: "700",
  },
  notificationBtn: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  mainPolicyCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  policyGradient: {
    padding: 24,
  },
  policyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  policyType: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  policyStatus: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "500",
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },
  policyDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 16, // Added gap between items
  },
  detailItem: {
    flex: 1,
    minWidth: 0, // Prevents flex items from overflowing
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  policyActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  primaryAction: {
    backgroundColor: "#fff",
  },
  primaryActionText: {
    color: "#4A76FF",
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A76FF",
  },
  policySelector: {
    paddingVertical: 4,
  },
  policyOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    marginRight: 12,
    backgroundColor: "#FFFFFF",
  },
  policyOptionActive: {
    borderColor: "#4A76FF",
    backgroundColor: "#F0F4FF",
  },
  policyOptionText: {
    color: "#64748B",
    fontWeight: "500",
    marginLeft: 6,
    fontSize: 14,
  },
  policyOptionTextActive: {
    color: "#4A76FF",
    fontWeight: "700",
  },
  quickActions: {
    marginBottom: 8,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actionBtn: {
    width: (width - 60) / 2, // Calculate width for 2 items with proper spacing
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
    textAlign: "center",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  activityDesc: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#94A3B8",
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#10B981",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 4,
  },
});
