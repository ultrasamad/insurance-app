import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function PoliciesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  type MaterialIconsName = keyof typeof MaterialCommunityIcons.glyphMap;

  type Policy = {
    id: string;
    type: string;
    status: string;
    premium: string;
    renewalDate: string;
    vehicle: string;
    plate: string;
    coverage: string;
    icon: MaterialIconsName;
    color: string;
  };

  // Sample policies data
  const policies: Policy[] = [
    {
      id: "POL-123456",
      type: "Motor Insurance",
      status: "active",
      premium: "GHS530.50",
      renewalDate: "Dec 31, 2023",
      vehicle: "Toyota Corolla 2021",
      plate: "ABC-1234",
      coverage: "Comprehensive",
      icon: "car",
      color: "#4A76FF",
    },
    {
      id: "POL-789012",
      type: "Motor Insurance",
      status: "active",
      premium: "GHS89.75",
      renewalDate: "Aug 01, 2024",
      vehicle: "Honda Civic 2020",
      plate: "XYZ-5678",
      coverage: "Third Party",
      icon: "car",
      color: "#10B981",
    },
    {
      id: "POL-345678",
      type: "Personal Accident",
      status: "active",
      premium: "GHS210.00",
      renewalDate: "Mar 15, 2024",
      vehicle: "N/A",
      plate: "N/A",
      coverage: "Family Plan",
      icon: "medical-bag",
      color: "#EF4444",
    },
    {
      id: "POL-901234",
      type: "Fire",
      status: "expired",
      premium: "GHS85.25",
      renewalDate: "Jan 05, 2023",
      vehicle: "N/A",
      plate: "N/A",
      coverage: "Property Damage",
      icon: "home",
      color: "#F59E0B",
    },
    // {
    //   id: "POL-567890",
    //   type: "Life Insurance",
    //   status: "pending",
    //   premium: "$55.30",
    //   renewalDate: "Nov 20, 2023",
    //   vehicle: "N/A",
    //   plate: "N/A",
    //   coverage: "Term Life",
    //   icon: "heart",
    //   color: "#8B5CF6",
    // },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const filteredPolicies = policies.filter((policy) => {
    if (activeFilter === "all") return true;
    return policy.status === activeFilter;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "#10B981";
      case "expired":
        return "#EF4444";
      case "pending":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "active":
        return "Active";
      case "expired":
        return "Expired";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  const PolicyCard = ({ policy }: { policy: Policy }) => (
    <View style={styles.policyCard}>
      <View style={styles.policyHeader}>
        <View style={styles.policyTitleContainer}>
          <View style={[styles.policyIcon, { backgroundColor: policy.color }]}>
            <MaterialCommunityIcons
              name={policy.icon}
              size={20}
              color="#FFFFFF"
            />
          </View>
          <View>
            <Text style={styles.policyType}>{policy.type}</Text>
            <Text style={styles.policyId}>{policy.id}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(policy.status)}15` },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(policy.status) },
            ]}
          >
            {getStatusText(policy.status)}
          </Text>
        </View>
      </View>

      <View style={styles.policyDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Premium</Text>
            <Text style={styles.detailValue}>{policy.premium}/year</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Renewal Date</Text>
            <Text style={styles.detailValue}>{policy.renewalDate}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Vehicle</Text>
            <Text style={styles.detailValue}>{policy.vehicle}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Coverage</Text>
            <Text style={styles.detailValue}>{policy.coverage}</Text>
          </View>
        </View>
      </View>

      <View style={styles.policyActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.primaryAction,
            policy.status === "expired" && styles.renewAction,
          ]}
        >
          <Text
            style={[
              styles.primaryActionText,
              policy.status === "expired" && styles.renewActionText,
            ]}
          >
            {policy.status === "expired" ? "Renew Now" : "Manage"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Policies</Text>
            <Text style={styles.subtitle}>
              {filteredPolicies.length} policy
              {filteredPolicies.length !== 1 ? "ies" : ""} found
            </Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#4A76FF" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === "all" && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === "all" && styles.filterTabTextActive,
              ]}
            >
              All Policies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === "active" && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter("active")}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === "active" && styles.filterTabTextActive,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === "expired" && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter("expired")}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === "expired" && styles.filterTabTextActive,
              ]}
            >
              Expired
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === "pending" && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter("pending")}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === "pending" && styles.filterTabTextActive,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Policies List */}
        <View style={styles.policiesList}>
          {filteredPolicies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </View>

        {/* Empty State */}
        {filteredPolicies.length === 0 && (
          <View style={styles.emptyState}>
            <Image
              source={{ uri: "https://i.ibb.co.com/7QZ9y3T/insurance.png" }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>No policies found</Text>
            <Text style={styles.emptyText}>
              {activeFilter === "all"
                ? "You don't have any insurance policies yet."
                : `You don't have any ${activeFilter} policies.`}
            </Text>
            <TouchableOpacity style={styles.emptyAction}>
              <Text style={styles.emptyActionText}>Explore Policies</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
  },
  filterButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F0F4FF",
  },
  filterContainer: {
    marginBottom: 24,
    flexGrow: 0,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterTabActive: {
    backgroundColor: "#4A76FF",
    borderColor: "#4A76FF",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  filterTabTextActive: {
    color: "#FFFFFF",
  },
  policiesList: {
    gap: 16,
  },
  policyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  policyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  policyTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  policyIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  policyType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  policyId: {
    fontSize: 12,
    color: "#64748B",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  policyDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flex: 1,
    minWidth: 0,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  policyActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  primaryAction: {
    backgroundColor: "#4A76FF",
    borderColor: "#4A76FF",
  },
  renewAction: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  renewActionText: {
    color: "#FFFFFF",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    opacity: 0.7,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyAction: {
    backgroundColor: "#4A76FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyActionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
