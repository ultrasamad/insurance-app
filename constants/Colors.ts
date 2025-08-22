export const Colors = {
  // Primary Colors
  primary: {
    50: "#f0f4ff", // Lightest blue
    100: "#eef0ff",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#4A76FF", // Primary blue
    700: "#4A47FF", // Slightly darker blue
    800: "#3b3bcd", // Dark blue
    900: "#2B2A6E", // Darkest blue
  },
  // Accent Colors
  accent: {
    green: "#10B981", // Success, active status
    yellow: "#F59E0B", // Warning, pending status
    red: "#EF4444", // Error, expired status
    purple: "#8B5CF6", // Additional accent
  },
  // Neutral Colors
  neutral: {
    white: "#FFFFFF",
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    black: "#000000",
  },
  // Status Colors
  status: {
    active: "#10B981",
    pending: "#F59E0B",
    expired: "#EF4444",
    inactive: "#94A3B8",
  },
  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F8FAFC",
    tertiary: "#F1F5F9",
    gradient: ["#f8f9ff", "#eef0ff", "#ffffff"],
  },
  // Text Colors
  text: {
    primary: "#1E293B",
    secondary: "#334155",
    tertiary: "#64748B",
    light: "#94A3B8",
    inverted: "#FFFFFF",
    link: "#4A76FF",
  },
  // Border Colors
  border: {
    light: "#E2E8F0",
    medium: "#CBD5E1",
    dark: "#94A3B8",
    focus: "#4A76FF",
  },
  // Shadow Colors
  shadow: {
    light: "rgba(74, 118, 255, 0.1)",
    medium: "rgba(74, 118, 255, 0.2)",
    dark: "rgba(0, 0, 0, 0.1)",
  },

  // Special Colors
  special: {
    overlay: "rgba(0, 0, 0, 0.5)",
    backdrop: "rgba(74, 118, 255, 0.05)",
    circle1: "rgba(74, 118, 255, 0.05)",
    circle2: "rgba(74, 118, 255, 0.03)",
  },
};

// Usage examples throughout app:
export const Theme = {
  // Button Styles
  buttons: {
    primary: {
      backgroundColor: Colors.primary[600],
      textColor: Colors.text.inverted,
    },
    secondary: {
      backgroundColor: Colors.background.primary,
      borderColor: Colors.border.light,
      textColor: Colors.text.primary,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: Colors.primary[600],
      textColor: Colors.primary[600],
    },
  },

  // Input Styles
  inputs: {
    default: {
      backgroundColor: Colors.background.tertiary,
      borderColor: Colors.border.light,
      textColor: Colors.text.primary,
    },
    focused: {
      backgroundColor: Colors.background.primary,
      borderColor: Colors.primary[600],
      textColor: Colors.text.primary,
    },
  },

  // Card Styles
  cards: {
    default: {
      backgroundColor: Colors.background.primary,
      shadowColor: Colors.shadow.light,
    },
    elevated: {
      backgroundColor: Colors.background.primary,
      shadowColor: Colors.shadow.medium,
    },
  },

  // Text Styles
  text: {
    heading: {
      color: Colors.text.primary,
    },
    subheading: {
      color: Colors.text.secondary,
    },
    body: {
      color: Colors.text.tertiary,
    },
    caption: {
      color: Colors.text.light,
    },
  },
};

// Utility functions for the theme
export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return Colors.status.active;
    case "pending":
      return Colors.status.pending;
    case "expired":
      return Colors.status.expired;
    default:
      return Colors.status.inactive;
  }
};

export const getStatusBackground = (status: string) => {
  switch (status) {
    case "active":
      return `${Colors.status.active}15`;
    case "pending":
      return `${Colors.status.pending}15`;
    case "expired":
      return `${Colors.status.expired}15`;
    default:
      return `${Colors.status.inactive}15`;
  }
};

// How to use the color theme in your components
// import { Colors, Theme, getStatusColor } from './colors';

// // In your component styles
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.background.primary,
//   },
//   button: {
//     backgroundColor: Theme.buttons.primary.backgroundColor,
//   },
//   buttonText: {
//     color: Theme.buttons.primary.textColor,
//   },
//   input: {
//     backgroundColor: Theme.inputs.default.backgroundColor,
//     borderColor: Theme.inputs.default.borderColor,
//     color: Theme.inputs.default.textColor,
//   },
//   statusBadge: {
//     backgroundColor: getStatusBackground('active'),
//   },
//   statusText: {
//     color: getStatusColor('active'),
//   },
// });

// // For gradients
// <LinearGradient
//   colors={Colors.background.gradient}
//   style={styles.background}
// />
