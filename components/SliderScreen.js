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
import CustomOrderScreen from "./CustomOrderScreen";

const SliderScreen = ({ navigation, route }) => {
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

  //const { cart, data, addressObj, payment_method } = route.params;
  //const [address, setAddress] = useState(addressObj.formatted_address);
  const [address, setAddress] = useState("hfvbjnvjdfjhd");
  const [phoneNumber, setPhoneNumber] = useState("03114567890");
  const [name, setName] = useState("Nimerta bai");

  //const [userId, setUserId] = useState(data);
  const { customOrderData } = route.params;

  useEffect(() => {
    console.log("Custom order data: ", customOrderData);
  }, []);
  // const [paymentMethod, setPaymentMethod] = useState(payment_method);
  // const [deliveryCharges, setDeliveryCharges] = useState(
  //   payment_method === paymentMethodTypes.COD ? 200 : 0
  // );
  // const getTotalPrice = () => {
  //   return cart.reduce((total, item) => total + item?.item?.price, 0);
  // };

  // const [subTotal, setSubTotal] = useState(getTotalPrice());

  // const calculateTotal = (subtotal, deliveryCharges) => {
  //   return subtotal + deliveryCharges;
  // };

  // const [totalAmount, setTotalAmount] = useState(subTotal + deliveryCharges);

  //   const createOrder = async () => {
  //     // var subTotal = getTotalPrice();
  //     // var totalAmount = calculateTotal();
  //     console.log("sub total: ", subTotal);
  //     console.log("total amount: ", totalAmount);

  //     var bodyData = {
  //       user_id: userId,
  //       total_amount: totalAmount,
  //       sub_total: subTotal,
  //       order_type: orderTypes.PLACED,
  //       payment_type: paymentTypes.NOT_PAID,
  //       address: address._id,
  //       payment_method: payment_method,
  //     };
  //     var apiResponse = await axios
  //       .post(
  //         `http://${Ip.mainIp}/api/standard-order/create-standard-order`,
  //         bodyData
  //       )
  //       .then((onOrderCreate) => {
  //         console.log("on order create: ", onOrderCreate.data);

  //         if (onOrderCreate.data.success) {
  //           console.log("ok report: ", onOrderCreate.data.success);
  //           navigation.navigate("OrderPlacedScreen", { data: userId });
  //         } else {
  //           alert(onOrderCreate.data.message);
  //         }
  //       })
  //       .catch((onOrderCreateError) => {
  //         console.log("on order create error: ", onOrderCreateError);
  //       });
  //   };

  const handlePlaceOrder = () => {
    alert("ok");
  };

  //   useEffect(() => {
  //     console.log("check out user: ", data);
  //     console.log("check out cart: ", cart);
  //     console.log("check out address: ", addressObj);
  //     console.log("check out payment: ", payment_method);
  //     console.log("sub total: ", subTotal);
  //     console.log("total amount: ", totalAmount);
  //   }, []);

  //   const renderCartItem = (item) => {
  //     return (
  //       <View key={item?.item._id} style={styles.cartItemContainer}>
  //         <Image
  //           style={styles.cartItemImage}
  //           source={{
  //             uri: item.item.image.url,
  //           }}
  //         />
  //         <View style={styles.cartItemDetails}>
  //           <Text style={styles.cartItemTitle}>{item?.item.title}</Text>
  //           <Text style={styles.cartItemPrice}>Rs {item?.item.price}</Text>
  //         </View>
  //       </View>
  //     );
  //   };
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

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.orderSummaryHeading}>Order Summary</Text>
        <Text style={styles.orderSummaryText}>
          Fabric Type: {customOrderData.fabric}
        </Text>
        <Text style={styles.orderSummaryText}>
          Price: {customOrderData.price}
        </Text>
        <Text style={styles.orderSummaryText}>
          Category: {customOrderData.category}
        </Text>
        {/* Display thumbnail images */}
        <ScrollView horizontal style={styles.thumbnailImageList}>
          {customOrderData.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.thumbnailImage}
            />
          ))}
        </ScrollView>
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
  designsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  designItem: {
    width: "30%", // Adjust width as needed
    padding: 5,
  },
  designImage: {
    width: "100%",
    aspectRatio: 1, // Maintain aspect ratio of the image
    resizeMode: "cover",
  },
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

export default SliderScreen;
