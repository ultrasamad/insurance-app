import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const tabCount = 4; // Home, Policies, Quotes, Profile
const tabWidth = width / tabCount;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {/* Simple background */}
      <Svg width={width} height={80} style={styles.svg}>
        <Path d={`M0 0 H${width} V80 H0 Z`} fill="white" />
      </Svg>

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
                  color: isFocused ? "#4A47FF" : "#888",
                  size: 26,
                })}
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? "#4A47FF" : "#888" },
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
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="policies"
        options={{
          title: "Policies",
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-checkmark-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quotes"
        options={{
          title: "Quotes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
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
  svg: {
    position: "absolute",
    top: 0,
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
