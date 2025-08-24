import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuoteCalculatorSheetProps {
  quoteDetails: any;
  onUpdateQuote: () => void;
}

export const QuoteCalculatorSheet: React.FC<QuoteCalculatorSheetProps> = ({
  quoteDetails,
  onUpdateQuote,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote Calculator</Text>

      {/* Your calculator content here */}
      <View style={styles.content}>
        <Text>Calculate your insurance quote</Text>
        {/* Add your calculator form fields */}
      </View>

      <TouchableOpacity style={styles.button} onPress={onUpdateQuote}>
        <Text style={styles.buttonText}>Update Quote</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4A76FF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
