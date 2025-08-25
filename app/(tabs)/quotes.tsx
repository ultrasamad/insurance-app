import CustomBottomSheet from "@/components/CustomBottomSheet";
import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";
import QuoteCalculator from "@/components/QuoteCalculator";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuotesScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Open bottom sheet
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand(); // Opens to the first snap point
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [activeTab, setActiveTab] = useState("all");

  // Sample quotes data
  type MaterialIconsName = keyof typeof MaterialCommunityIcons.glyphMap;
  type Quote = {
    id: string;
    type: string;
    status: string;
    provider: string;
    premium: string;
    coverage: string;
    expiration: string;
    icon: MaterialIconsName;
    color: string;
  };

  const quotes: Quote[] = [
    {
      id: "QT-123456",
      type: "Auto Insurance",
      status: "received",
      provider: "SafeDrive Insurance",
      premium: "$145.50",
      coverage: "Comprehensive",
      expiration: "Dec 31, 2023",
      icon: "car",
      color: "#4A76FF",
    },
    {
      id: "QT-789012",
      type: "Auto Insurance",
      status: "received",
      provider: "QuickCover Inc.",
      premium: "$128.75",
      coverage: "Full Coverage",
      expiration: "Dec 28, 2023",
      icon: "car",
      color: "#10B981",
    },
    {
      id: "QT-345678",
      type: "Home Insurance",
      status: "pending",
      provider: "HomeSecure",
      premium: "$89.25",
      coverage: "Basic Coverage",
      expiration: "Pending",
      icon: "home",
      color: "#F59E0B",
    },
    {
      id: "QT-901234",
      type: "Health Insurance",
      status: "expired",
      provider: "HealthGuard",
      premium: "$210.00",
      coverage: "Family Plan",
      expiration: "Nov 15, 2023",
      icon: "medical-bag",
      color: "#EF4444",
    },
  ];

  const filteredQuotes = quotes.filter((quote) => {
    if (activeTab === "all") return true;
    return quote.status === activeTab;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "received":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "expired":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "received":
        return "Received";
      case "pending":
        return "Processing";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  const QuoteCard = ({ quote }: { quote: Quote }) => (
    <View style={styles.quoteCard}>
      <View style={styles.quoteHeader}>
        <View style={styles.quoteTitleContainer}>
          <View style={[styles.quoteIcon, { backgroundColor: quote.color }]}>
            <MaterialCommunityIcons
              name={quote.icon}
              size={20}
              color="#FFFFFF"
            />
          </View>
          <View>
            <Text style={styles.quoteType}>{quote.type}</Text>
            <Text style={styles.quoteId}>{quote.id}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(quote.status)}15` },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(quote.status) }]}
          >
            {getStatusText(quote.status)}
          </Text>
        </View>
      </View>

      <View style={styles.quoteDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Provider</Text>
            <Text style={styles.detailValue}>{quote.provider}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Monthly Premium</Text>
            <Text style={styles.detailValue}>{quote.premium}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Coverage</Text>
            <Text style={styles.detailValue}>{quote.coverage}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Expires</Text>
            <Text style={styles.detailValue}>{quote.expiration}</Text>
          </View>
        </View>
      </View>

      <View style={styles.quoteActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.primaryAction,
            quote.status === "expired" && styles.renewAction,
          ]}
        >
          <Text style={styles.primaryActionText}>
            {quote.status === "received" ? "Purchase" : "Get New Quote"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
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
            <View>
              <Text style={styles.title}>Insurance Quotes</Text>
              <Text style={styles.subtitle}>
                Compare and purchase the best coverage
              </Text>
            </View>
            <TouchableOpacity style={styles.helpButton}>
              <Ionicons name="help-circle-outline" size={24} color="#4A76FF" />
            </TouchableOpacity>
          </View>

          {/* Quotes Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
          >
            <TouchableOpacity
              style={[styles.tab, activeTab === "all" && styles.tabActive]}
              onPress={() => setActiveTab("all")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "all" && styles.tabTextActive,
                ]}
              >
                All Quotes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "received" && styles.tabActive]}
              onPress={() => setActiveTab("received")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "received" && styles.tabTextActive,
                ]}
              >
                Received
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "pending" && styles.tabActive]}
              onPress={() => setActiveTab("pending")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "pending" && styles.tabTextActive,
                ]}
              >
                Processing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "expired" && styles.tabActive]}
              onPress={() => setActiveTab("expired")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "expired" && styles.tabTextActive,
                ]}
              >
                Expired
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Quotes List */}
          <View style={styles.quotesList}>
            {filteredQuotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </View>

          {/* Empty State */}
          {filteredQuotes.length === 0 && (
            <View style={styles.emptyState}>
              <Image
                source={{ uri: "https://i.ibb.co.com/6FgX2zT/quote.png" }}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>
                {activeTab === "all"
                  ? "No quotes yet"
                  : `No ${activeTab} quotes`}
              </Text>
              <Text style={styles.emptyText}>
                {activeTab === "all"
                  ? "Get started by requesting your first insurance quote."
                  : `You don't have any ${activeTab} quotes at this time.`}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={handlePresentModalPress}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <CustomBottomSheet title="Auto Insurance Quote" ref={bottomSheetRef}>
        <QuoteCalculator />
      </CustomBottomSheet>

      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        title="Auto Insurance Quote"
      >
        <QuoteCalculator />
      </CustomBottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  // Styles for main content
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
    paddingBottom: 100, // space for FAB
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
  helpButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F0F4FF",
  },
  tabsContainer: {
    marginBottom: 24,
    flexGrow: 0,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tabActive: {
    backgroundColor: "#4A76FF",
    borderColor: "#4A76FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  quotesList: {
    gap: 16,
  },
  quoteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  quoteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  quoteTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  quoteIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  quoteType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  quoteId: {
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
  quoteDetails: {
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
  quoteActions: {
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

  // FAB styles
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A76FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
