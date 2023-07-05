import { useState } from "react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const CheckoutScreen = ({ navigation, route }) => {
  //const { selectedPaymentMethod } = route.params;
  const [address, setAddress] = useState(
    "Hammeda heights shaheed-e-milat road karachi sindh pakistan"
  );
  const [phoneNumber, setPhoneNumber] = useState("03114567890");
  const [name, setName] = useState("Nimerta bai");
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  const [deliveryCharges, setDeliveryCharges] = useState("10");
  const cartItems = [
    {
      id: 1,
      name: "Maxi Dress",
      price: 99.99,
      image: require("../Images/blouse.jpg"),
    },
    {
      id: 2,
      name: "Blouse",
      price: 49.99,
      image: require("../Images/blouse.jpg"),
    },
  ];

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  const calculateTotal = (subtotal, deliveryCharges) => {
    return subtotal + deliveryCharges;
  };
  const handlePlaceOrder = () => {
    navigation.navigate("OrderPlacedScreen");
  };
  const renderCartItem = (item) => {
    return (
      <View key={item.id} style={styles.cartItemContainer}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item.name}</Text>
          <Text style={styles.cartItemPrice}>$ {item.price.toFixed(2)}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Shipping Detials</Text>
        <View style={styles.shippingAddressContainer}>
          <Text style={styles.addressValue}>{name}</Text>
          <Text style={styles.addressValue}>{phoneNumber}</Text>
          <Text style={styles.addressValue}>{address}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Order Summary</Text>
        <View style={styles.orderSummaryContainer}>
          {cartItems.map(renderCartItem)}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Payment Method</Text>
            <Text style={styles.paymentMethodText}>{paymentMethod}</Text>
          </View>
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryLabel}>Subtotal:</Text>
            <Text style={styles.orderSummaryValue}>
              $ {getTotalPrice().toFixed(2)}
            </Text>
          </View>
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryLabel}>Delivery Charges:</Text>
            <Text style={styles.orderSummaryValue}>${deliveryCharges}</Text>
          </View>
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryLabel}>Total:</Text>
            <Text style={styles.orderSummaryValue}>
              {" "}
              ${" "}
              {calculateTotal(
                getTotalPrice(),
                parseFloat(deliveryCharges)
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#16a085",
  },
  shippingAddressContainer: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
  },
  addressValue: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  orderSummaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderSummaryLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderSummaryValue: {
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: "#16a085",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  placeOrderButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  paymentMethodText: {
    fontSize: 16,
  },
});

export default CheckoutScreen;
