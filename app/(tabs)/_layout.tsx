import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const tabCount = 4; // Home, Policies, Quotes, Profile
const tabWidth = width / tabCount;

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBarBackground} />

      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={[styles.tabItem, { width: tabWidth }]}
              activeOpacity={0.7}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? "#4A76FF" : "#888",
                  size: 26,
                  focused: isFocused,
                })}
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? "#4A76FF" : "#888" },
                ]}
              >
                {options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="policies"
        options={{
          title: "Policies",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="shield-checkmark-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quotes"
        options={{
          title: "Quotes",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="cart-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 6,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 80,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});
