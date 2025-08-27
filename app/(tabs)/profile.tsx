import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
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
    firstName: user?.firstName || "Samad",
    surname: user?.surname || "Ibrahim",
    gender: user?.gender || "Male",
    dob: user?.dob || "1990-01-01",
    phone: user?.phone || "+233 234 567 890",
    email: user?.email || "contact@ultrasamad.com",
    address: user?.address || "25 MOI WE RD, Dansoman",
    avatar: user?.avatar || "https://i.pravatar.cc/150",
    memberSince: "2025",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#4A76FF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>
            {profile.firstName} {profile.surname}
          </Text>

          <View style={styles.memberSince}>
            <Ionicons name="shield-checkmark" size={14} color="#4A76FF" />
            <Text style={styles.memberSinceText}>
              Member since {profile.memberSince}
            </Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color="#4A76FF" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle-outline" size={22} color="#4A76FF" />
            <Text style={styles.cardTitle}>Personal Information</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="person-outline" size={18} color="#64748B" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>
                  {profile.firstName} {profile.surname}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="transgender-outline"
                  size={18}
                  color="#64748B"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Gender</Text>
                <Text style={styles.infoValue}>{profile.gender}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar-outline" size={18} color="#64748B" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>{formatDate(profile.dob)}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="call-outline" size={18} color="#64748B" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                <Text style={styles.infoValue}>{profile.phone}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="mail-outline" size={18} color="#64748B" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue}>{profile.email}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="location-outline" size={18} color="#64748B" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{profile.address}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Settings Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="settings-outline" size={22} color="#4A76FF" />
            <Text style={styles.cardTitle}>Account Settings</Text>
          </View>

          <View style={styles.settingsSection}>
            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#4A76FF"
                />
              </View>
              <Text style={styles.settingsText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#4A76FF"
                />
              </View>
              <Text style={styles.settingsText}>Notification Preferences</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons name="card-outline" size={20} color="#4A76FF" />
              </View>
              <Text style={styles.settingsText}>Payment Methods</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#4A76FF"
                />
              </View>
              <Text style={styles.settingsText}>Document Center</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="help-buoy-outline" size={22} color="#4A76FF" />
            <Text style={styles.cardTitle}>Support</Text>
          </View>

          <View style={styles.settingsSection}>
            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#4A76FF"
                />
              </View>
              <Text style={styles.settingsText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#4A76FF"
                />
              </View>
              <Text style={styles.settingsText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#4A76FF"
                />
              </View>
              <Text style={styles.settingsText}>Help Center</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsRow}>
              <View style={styles.settingsIcon}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#4A76FF"
                />
              </View>
              <Text style={styles.settingsText}>Contact Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>App Version 1.0.0</Text>
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
    paddingBottom: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    backgroundColor: "#F1F5F9",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  memberSince: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  memberSinceText: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 6,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  editButtonText: {
    color: "#4A76FF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#4A76FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginLeft: 10,
  },
  infoSection: {
    // Info section styles
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  settingsSection: {
    // Settings section styles
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
  },
});
