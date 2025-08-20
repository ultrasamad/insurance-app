import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  // Example fallback user
  const profile = {
    firstName: user?.firstName || "John",
    surname: user?.surname || "Doe",
    gender: user?.gender || "Male",
    dob: user?.dob || "1990-01-01",
    phone: user?.phone || "+1 234 567 890",
    email: user?.email || "johndoe@email.com",
    address: user?.address || "123 Main Street, New York",
    avatar: user?.avatar || "https://i.pravatar.cc/150",
  };

  return (
    <LinearGradient
      colors={["#6C63FF", "#4A47FF", "#2B2A6E"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>
            {profile.firstName} {profile.surname}
          </Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <FontAwesome5 name="venus-mars" size={18} color="#4A47FF" />
            <Text style={styles.infoText}>{profile.gender}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5 name="birthday-cake" size={18} color="#4A47FF" />
            <Text style={styles.infoText}>{profile.dob}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#4A47FF" />
            <Text style={styles.infoText}>{profile.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="#4A47FF" />
            <Text style={styles.infoText}>{profile.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#4A47FF" />
            <Text style={styles.infoText}>{profile.address}</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#4A47FF" />
            <Text style={styles.settingsText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="notifications-outline" size={20} color="#4A47FF" />
            <Text style={styles.settingsText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#4A47FF"
            />
            <Text style={styles.settingsText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="help-circle-outline" size={20} color="#4A47FF" />
            <Text style={styles.settingsText}>Help Center</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  settingsCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#FF4A4A",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#FF4A4A",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
