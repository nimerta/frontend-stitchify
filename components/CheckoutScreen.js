import { useState, useEffect } from "react";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import Ip from "../IPConfigration";

const CheckoutScreen = ({ navigation, route }) => {
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

  const { cart, data, addressObj, payment_method } = route.params;
  const [address, setAddress] = useState(addressObj.formatted_address);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(data);

  const [paymentMethod, setPaymentMethod] = useState(payment_method);
  const [deliveryCharges, setDeliveryCharges] = useState(
    payment_method === paymentMethodTypes.COD ? 200 : 0
  );
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item?.item?.price, 0);
  };

  const [cartItems, setCartItems] = useState(cart);
  const [subTotal, setSubTotal] = useState(getTotalPrice());

  const calculateTotal = (subtotal, deliveryCharges) => {
    return subtotal + deliveryCharges;
  };

  const [totalAmount, setTotalAmount] = useState(subTotal + deliveryCharges);

  const createOrder = async () => {
    // var subTotal = getTotalPrice();
    // var totalAmount = calculateTotal();
    console.log("sub total: ", subTotal);
    console.log("total amount: ", totalAmount);

    var bodyData = {
      user_id: userId,
      total_amount: totalAmount,
      sub_total: subTotal,
      order_type: orderTypes.PLACED,
      payment_type: paymentTypes.NOT_PAID,
      address: address._id,
      payment_method: payment_method,
    };
    var apiResponse = await axios
      .post(
        `http://${Ip.mainIp}/api/standard-order/create-standard-order`,
        bodyData
      )
      .then((onOrderCreate) => {
        console.log("on order create: ", onOrderCreate.data);

        if (onOrderCreate.data.success) {
          console.log("ok report: ", onOrderCreate.data.success);
          navigation.navigate("OrderPlacedScreen", { data: userId });
        } else {
          alert(onOrderCreate.data.message);
        }
      })
      .catch((onOrderCreateError) => {
        console.log("on order create error: ", onOrderCreateError);
      });
  };

  const handlePlaceOrder = () => {
    createOrder();
  };

  useEffect(() => {
    console.log("check out user: ", data);
    console.log("check out cart: ", cart);
    console.log("check out address: ", addressObj);
    console.log("check out payment: ", payment_method);
    console.log("sub total: ", subTotal);
    console.log("total amount: ", totalAmount);
  }, []);

  const renderCartItem = (item) => {
    return (
      <View key={item?.item._id} style={styles.cartItemContainer}>
        <Image
          style={styles.cartItemImage}
          source={{
            uri: item.item.image.url,
          }}
        />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item?.item.title}</Text>
          <Text style={styles.cartItemPrice}>Rs {item?.item.price}</Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
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
              Rs: {getTotalPrice().toFixed(2)}
            </Text>
          </View>
          {payment_method === paymentMethodTypes.COD && (
            <View style={styles.orderSummaryItem}>
              <Text style={styles.orderSummaryLabel}>Delivery Charges:</Text>
              <Text style={styles.orderSummaryValue}>
                Rs: {deliveryCharges}
              </Text>
            </View>
          )}
          {/* <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryLabel}>Delivery Charges:</Text>
            <Text style={styles.orderSummaryValue}>${deliveryCharges}</Text>
          </View> */}
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryLabel}>Total:</Text>
            <Text style={styles.orderSummaryValue}>
              {" "}
              Rs:{" "}
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
    </ScrollView>
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
