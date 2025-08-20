import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user } = useAuth(); // assume user = { name, avatar }
  const policy = {
    insuranceType: "Car Insurance",
    policyHolder: "John Doe",
    carName: "Toyota Corolla",
    carNumber: "KDA 123A",
    policyType: "Comprehensive",
    expiry: "2025-12-30",
  };

  const policyTypes = [
    { name: "Car", icon: "car" },
    { name: "Health", icon: "heartbeat" },
    { name: "Home", icon: "home" },
    { name: "Travel", icon: "plane" },
  ];

  const quickActions = [
    { name: "Renew", icon: "refresh" },
    { name: "Claims", icon: "file-alt" },
    { name: "Support", icon: "headset" },
    { name: "Payments", icon: "credit-card" },
  ];

  return (
    <LinearGradient
      colors={["#6C63FF", "#4A47FF", "#2B2A6E"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: user?.avatar || "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <Text style={styles.welcome}>Hi, {user?.name || "Guest"}</Text>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Policy Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{policy.insuranceType}</Text>
          <Text style={styles.cardDetail}>
            Policy Holder: {policy.policyHolder}
          </Text>
          <Text style={styles.cardDetail}>
            Car: {policy.carName} ({policy.carNumber})
          </Text>
          <Text style={styles.cardDetail}>Policy: {policy.policyType}</Text>
          <Text style={styles.cardDetail}>Expires: {policy.expiry}</Text>
        </View>

        {/* Horizontal Policy Types */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollRow}
        >
          {policyTypes.map((item, index) => (
            <TouchableOpacity key={index} style={styles.policyTypeCard}>
              <FontAwesome5 name={item.icon} size={22} color="#4A47FF" />
              <Text style={styles.policyText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionCard}>
              <FontAwesome5 name={action.icon} size={20} color="#fff" />
              <Text style={styles.quickActionText}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  notificationBtn: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  cardDetail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  scrollRow: { marginBottom: 20 },
  policyTypeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginRight: 12,
    alignItems: "center",
    width: 110,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  policyText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: "#4A47FF",
    borderRadius: 14,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
