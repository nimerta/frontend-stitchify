import { useState, useEffect } from "react";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import Ip from "../IPConfigration";
import Loading from "./Loaders/Loading";
const CustomOrderCheckout = ({ navigation, route }) => {
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

  //const { data, addressObj, payment_method } = route.params;
  const [shippingAddress, setShippingAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const { customOrderData, data, payment_method, addressObj } = route.params;
  const [category, setCategory] = useState(data.customData.category);
  const [fabric, setFabric] = useState(data.customData.fabric);
  const [price, setPrice] = useState(data.customData.price);
  const [instructions, setInstructions] = useState(
    data.customData.instructions
  );
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState(data.customData.images);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(payment_method);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(data);
  const [orderId, setOrderId] = useState("");

  //const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const handleImagePress = (image) => {
    setSelectedImage(image);
    setImageModalVisible(true);
  };

  const createOrder = async () => {
    var bodyData = {
      user_id: data.customData.userId,
      offer_amount: data.customData.price,
      images: data.customData.imagesBase64,
      fabric: data.customData.fabric,
      category: data.customData.category,
      instructions: data.customData.instructions,
      order_type: orderTypes.PLACED,
      address: data.address._id,
      payment_method: paymentMethodTypes.PICKUP,
      order_area: data.customData.selectedArea,
    };
    var apiResponse = await axios
      .post(
        `http://${Ip.mainIp}/api/custom-order/create-custom-order`,
        bodyData
      )
      .then((onOrderCreate) => {
        console.log("on order create: ", onOrderCreate.data);

        console.log(
          "onOrderCreate.data.createdOrder._id: ",
          onOrderCreate.data.createdOrder
        );

        setOrderId(onOrderCreate.data.createdOrder._id);

        if (onOrderCreate.data.success) {
          console.log("ok report custom system: ", onOrderCreate.data.success);
          // navigation.navigate("OrderPlacedScreen", { data: userId });
        } else {
          alert(onOrderCreate.data.message);
        }
      })
      .catch((onOrderCreateError) => {
        console.log(
          "on order create error custom system: ",
          onOrderCreateError
        );
      });
  };

  const imageArray = [
    { key: "1", source: require("../Images/blouse.jpg") },
    { key: "2", source: require("../Images/home1.jpg") },
    { key: "3", source: require("../Images/home2.jpg") },
    { key: "4", source: require("../Images/home3.jpg") },
    { key: "5", source: require("../Images/1234.jpg") },
    { key: "6", source: require("../Images/2piece.jpg") },
  ];

  const handleCreateOrder = async () => {
    try {
      await createOrder();
      setOfferModalVisible(true); // Show the modal
    } catch (error) {
      console.log("create order catch error: ", error);
    }
  };

  useEffect(() => {
    // console.log("route.params: ", data);
    // console.log("payment_method:", payment_method);
    delete data["imagesBase64"];
    console.log("images", data?.address?.formatted_address);
    setShippingAddress(data?.address?.formatted_address);
    console.log("fff", shippingAddress);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.shippingAddressContainer}>
          <Text style={styles.sectionHeading}>Shipping Details</Text>
          <Text style={styles.addressValue}>{name}</Text>
          <Text style={styles.addressValue}>{phoneNumber}</Text>
          <Text style={styles.addressValue}>
            {data?.address?.formatted_address}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.orderSummaryContainer}>
          <Text style={styles.sectionHeading}>Order Summary</Text>
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(image)}
              >
                <Image source={{ uri: image }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={imageModalVisible}
            onRequestClose={() => setImageModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.imageModal}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setImageModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryValue}>{category}</Text>
          </View>
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryValue}>{fabric}</Text>
          </View>
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryValue}>Rs{price}</Text>
          </View>
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryValue}>{instructions}</Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.sectionHeading}>Payment Method</Text>
          <Text style={styles.selectedPaymentMethodText}>{paymentMethod}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.makeOfferButton}
        onPress={handleCreateOrder}
      >
        <Text style={styles.makeOfferButtonText}>Place Order</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={offerModalVisible}
        onRequestClose={() => setOfferModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.whiteContainer}>
            <Text style={styles.modalText}>Your order is placed</Text>
            <TouchableOpacity
              style={styles.viewOrderButton}
              onPress={() => {
                setOfferModalVisible(false);
                // Navigate to the View Order screen
                navigation.navigate("ViewCustomOrder", {
                  data: orderId,
                });
              }}
            >
              <Text style={styles.viewOrderButtonText}>View Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginHorizontal: 8,
    marginBottom: 8,
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
    marginBottom: 15,
    marginTop: 5,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "80%",
  },
  // closeButton: {
  //   position: "absolute",
  //   top: 20,
  //   right: 20,
  //   padding: 10,
  //   borderRadius: 5,
  //   backgroundColor: "#fff",
  // },
  // closeButtonText: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "#333",
  // },
  imageModal: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedImage: {
    width: 300,
    height: 300,
  },
  closeButton: {
    backgroundColor: "#16a085",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  makeOfferButton: {
    backgroundColor: "#16a085",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  makeOfferButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    height: 200,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    alignSelf: "center",
  },
  viewOrderButton: {
    backgroundColor: "#16a085",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  viewOrderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  orderSummaryContainer: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
  },
  orderSummaryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  orderSummaryLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  orderSummaryValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  selectedPaymentMethodText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333", // Change color as needed
  },
});

export default CustomOrderCheckout;
