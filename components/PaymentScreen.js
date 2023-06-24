import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const PaymentScreen = ({ navigation }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (selectedPaymentMethod) {
      // Perform payment processing
      // Display success message or navigate to order confirmation screen
      navigation.navigate("CheckoutScreen");
    } else {
      alert("Please select a payment method.");
    }
  };

  const renderPaymentMethodButton = (method) => {
    const isSelected = selectedPaymentMethod === method;
    return (
      <TouchableOpacity
        key={method}
        style={[
          styles.paymentMethodButton,
          isSelected && styles.selectedPaymentMethod,
        ]}
        onPress={() => handlePaymentMethodSelect(method)}
      >
        <View style={styles.radioButton}>
          {isSelected && <View style={styles.radioButtonSelected} />}
        </View>
        <Text style={styles.paymentMethodButtonText}>{method}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Method</Text>
      {renderPaymentMethodButton("Cash on Delivery")}
      {renderPaymentMethodButton("Pickup")}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPayment}
      >
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paymentMethodButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  selectedPaymentMethod: {
    //backgroundColor: "#16a085",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#888888",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#16a085",
  },
  paymentMethodButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#16a085",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default PaymentScreen;
