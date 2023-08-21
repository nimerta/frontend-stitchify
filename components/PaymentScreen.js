import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ip from "../IPConfigration";

const PaymentScreen = ({ navigation, route }) => {
  const { address, cart, data } = route.params;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [userId, setUserId] = useState(data);

  const orderTypes = {
    PLACED: "PLACED",
    FINISHED: "FINISHED",
    PREPARING: "PREPARING",
    CANCELLED: "CANCELLED",
  };
  const paymentMethodTypes = {
    COD: "CASH-ON-DELIVERY",
    PICKUP: "PICKUP",
  };

  const paymentTypes = {
    NOT_PAID: "NOT-PAID",
    PAID: "PAID",
  };

  const getPaymentMethod = () => {
    return selectedPaymentMethod === "Cash on Delivery"
      ? paymentMethodTypes.COD
      : paymentMethodTypes.PICKUP;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item?.item?.price, 0);
  };

  const createOrder = async () => {
    var bodyData = {
      user_id: userId,
      total_amount: getTotalPrice() + 100,
      sub_total: getTotalPrice(),
      order_type: orderTypes.PLACED,
      payment_type: paymentTypes.NOT_PAID,
      address: address,
      payment_method: getPaymentMethod(),
    };
    var apiResponse = await axios
      .post(
        `http://${Ip.mainIP}/api/standard-order/create-standard-order`,
        bodyData
      )
      .then((onOrderCreate) => {
        console.log("on order create: ", onOrderCreate.data);
      })
      .catch((onOrderCreateError) => {
        console.log("on order create error: ", onOrderCreateError);
      });
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (selectedPaymentMethod) {
      // Perform payment processing
      // Display success message or navigate to order confirmation screen
      navigation.navigate("CheckoutScreen", {
        cart: cart,
        data: userId,
        payment_method: getPaymentMethod(),
        addressObj: address,
      });
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

  useEffect(() => {
    console.log("cart: ", cart);
    console.log("address: ", address);
  }, []);

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
