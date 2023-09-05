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
  FlatList,
} from "react-native";
import axios from "axios";
import Ip from "../IPConfigration";

const ViewCustomOrder = ({ navigation, route }) => {
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

  const [orderId, setOrderId] = useState(route.params.data);

  console.log("route.params.data: ", route.params.data);

  //const { data, addressObj, payment_method } = route.params;
  //const [address, setAddress] = useState(addressObj.formatted_address);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [price, setPrice] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [tailorImage, setTailorImage] = useState("");
  const [tailorName, setTailorName] = useState("");
  const [tailorOffer, setTailorOffer] = useState("");
  const [orderImages, setOrderImages] = useState([]);
  const [orderOffers, setOrderOffers] = useState([]);
  const [acceptedOffer, setAcceptedOffer] = useState(null);

  const handleAccept = (offerId) => {
    // Handle the acceptance logic here
    console.log(offerId);
    acceptOrderOffer(offerId);
    handleViewCustomOrder();
  };

  const handleReject = (offerId) => {
    // Handle the rejection logic here
    declineOrderOffer(offerId);
    handleViewCustomOrder();
  };

  const handleImagePress = (image) => {
    setSelectedImage(image.url);
    setImageModalVisible(true);
  };

  const handleMakeOffer = () => {
    setOfferModalVisible(true);

    setTimeout(() => {
      setOfferModalVisible(false);
    }, 3000);
  };

  const tailorOffers = [
    {
      name: "Tailor 1",
      offer: "2000",
      image: require("../Images/blouse.jpg"),
    },
    { name: "Tailor 2", offer: "1800", image: require("../Images/blouse.jpg") },
    { name: "Tailor 3", offer: "2200", image: require("../Images/2piece.jpg") },
    { name: "Tailor 3", offer: "2200", image: require("../Images/blouse.jpg") },
    {
      name: "Tailor 1",
      offer: "2000",
      image: require("../Images/blouse.jpg"),
    },
    { name: "Tailor 2", offer: "1800", image: require("../Images/blouse.jpg") },
    { name: "Tailor 3", offer: "2200", image: require("../Images/2piece.jpg") },
    { name: "Tailor 3", offer: "2200", image: require("../Images/blouse.jpg") },
    {
      name: "Tailor 1",
      offer: "2000",
      image: require("../Images/blouse.jpg"),
    },
    { name: "Tailor 2", offer: "1800", image: require("../Images/blouse.jpg") },
    { name: "Tailor 3", offer: "2200", image: require("../Images/2piece.jpg") },
    { name: "Tailor 3", offer: "2200", image: require("../Images/blouse.jpg") },
    // Add more tailor offers as needed
  ];

  const handleViewCustomOrder = async () => {
    console.log(
      `http://${Ip.mainIp}/api/custom-order/get-custom-order/${orderId}`
    );
    var apiResponse = await axios
      .get(`http://${Ip.mainIp}/api/custom-order/get-custom-order/${orderId}`)
      .then((onOrderFound) => {
        console.log("on order found: ", onOrderFound.data.customOrder);

        setName(onOrderFound.data.customOrder.user.full_name);
        setPhoneNumber(onOrderFound.data.customOrder.user.phone_no);
        setAddress(onOrderFound.data.customOrder.address.formatted_address);
        setOrderImages(onOrderFound.data.customOrder.images);
        setCategory(onOrderFound.data.customOrder.category);
        setFabric(onOrderFound.data.customOrder.fabric);
        setPrice(onOrderFound.data.customOrder.total_amount);
        setInstructions(
          onOrderFound.data.customOrder.instructions !== ""
            ? onOrderFound.data.customOrder.instructions
            : "No Instructions"
        );

        console.log("offers: ", onOrderFound.data.customOrder.offers);

        setOrderOffers(onOrderFound.data.customOrder.offers);
        setAcceptedOffer(onOrderFound.data.customOrder.accepted_offer);

        console.log(
          "onOrderFound.data.customOrder.accepted_offer: ",
          onOrderFound.data.customOrder.accepted_offer
        );
      })
      .catch((onOrderFoundError) => {
        console.log("on order create error custom system: ", onOrderFoundError);
      });
  };

  const acceptOrderOffer = async (offerId) => {
    const bodyData = {
      acceptedOfferId: offerId,
    };
    console.log(
      `http://${Ip.mainIp}/api/custom-order/accept-offer/${orderId}`,
      bodyData
    );
    var apiResponse = await axios
      .post(
        `http://${Ip.mainIp}/api/custom-order/accept-offer/${orderId}`,
        bodyData
      )
      .then((onOfferAccept) => {
        console.log("onOfferAccept: ", onOfferAccept.data);

        alert(onOfferAccept.data.message);
      })
      .catch((onOfferAcceptError) => {
        console.log(
          "on order create error custom system: ",
          onOfferAcceptError
        );
      });
  };

  const declineOrderOffer = async (offerId) => {
    console.log(
      `http://${Ip.mainIp}/api/custom-order/decline-offer/${orderId}`
    );
    const bodyData = {
      declinedOfferId: offerId,
    };
    var apiResponse = await axios
      .post(
        `http://${Ip.mainIp}/api/custom-order/decline-offer/${orderId}`,
        bodyData
      )
      .then((onOfferDecline) => {
        console.log("onOfferDecline: ", onOfferDecline.data);

        alert(onOfferDecline.data.message);
      })
      .catch((onOfferDeclineError) => {
        console.log(
          "on order create error custom system: ",
          onOfferDeclineError
        );
      });
  };

  useEffect(() => {
    handleViewCustomOrder();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.shippingAddressContainer}>
          <Text style={styles.sectionHeading}>Shipping Details</Text>
          <Text style={styles.addressValue}>{name}</Text>
          <Text style={styles.addressValue}>{phoneNumber}</Text>
          <Text style={styles.addressValue}>{address}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.orderSummaryContainer}>
          <Text style={styles.sectionHeading}>Order Summary</Text>
          <View style={styles.imagesContainer}>
            {orderImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(image)}
              >
                <Image
                  source={{
                    uri: image.url,
                  }}
                  style={styles.thumbnailImage}
                />
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
                  source={{
                    uri: selectedImage,
                  }}
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
            <Text style={styles.orderSummaryValue}>Rs {price}</Text>
          </View>
          <View style={styles.orderSummaryItem}>
            <Text style={styles.orderSummaryValue}>{instructions}</Text>
          </View>
        </View>
      </View>
      {acceptedOffer !== null ? (
        <View
          style={{
            width: "100%",
            height: 120,
            backgroundColor: "#F0F0F0",
            padding: 10,
          }}
        >
          <Text>Offer Amount: {acceptedOffer.amount}</Text>
          <Text>Offer Status: {acceptedOffer.offer_status.toUpperCase()}</Text>

          <Text>Tailor: {acceptedOffer.tailor.full_name}</Text>
          <Text>
            Offer Created At:{" "}
            {`${new Date(acceptedOffer.createdAt).getDate()}-${new Date(
              acceptedOffer.createdAt
            ).getMonth()}-${new Date(acceptedOffer.createdAt).getFullYear()}`}
          </Text>
        </View>
      ) : (
        <View style={styles.acceptRejectContainer}>
          {orderOffers.length === 0 ? (
            <View
              style={{
                width: "100%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "#16a085",
                }}
              >
                No Offers!
              </Text>
            </View>
          ) : (
            <ScrollView vertical={true}>
              {orderOffers.map((offer, index) => (
                <View style={styles.tailorOfferContainer} key={index}>
                  <Image
                    source={tailorOffers[0].image}
                    style={styles.tailorImage}
                  />
                  <View style={styles.tailorDetails}>
                    <Text style={styles.tailorName}>
                      {offer.tailor.full_name}
                    </Text>
                    <Text style={styles.tailorOffer}>Rs {offer.amount}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.acceptButton, styles.button]}
                      onPress={() => {
                        handleAccept(offer?._id);
                      }}
                    >
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.rejectButton, styles.button]}
                      onPress={() => {
                        handleReject(offer?._id);
                      }}
                    >
                      <Text style={styles.RejectedbuttonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
          {/* <ScrollView vertical={true}>
          {tailorOffers.map((offer, index) => (
            <View style={styles.tailorOfferContainer} key={index}>
              <Image source={offer.image} style={styles.tailorImage} />
              <View style={styles.tailorDetails}>
                <Text style={styles.tailorName}>{offer.name}</Text>
                <Text style={styles.tailorOffer}>Offer: Rs {offer.offer}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.acceptButton, styles.button]}
                  onPress={handleAccept}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.rejectButton, styles.button]}
                  onPress={handleReject}
                >
                  <Text style={styles.RejectedbuttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView> */}
        </View>
      )}
      {/* <View style={styles.acceptRejectContainer}>
        {orderOffers.length === 0 ? (
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
                color: "#16a085",
              }}
            >
              No Offers!
            </Text>
          </View>
        ) : (
          <ScrollView vertical={true}>
            {orderOffers.map((offer, index) => (
              <View style={styles.tailorOfferContainer} key={index}>
                <Image
                  source={tailorOffers[0].image}
                  style={styles.tailorImage}
                />
                <View style={styles.tailorDetails}>
                  <Text style={styles.tailorName}>
                    {offer.tailor.full_name}
                  </Text>
                  <Text style={styles.tailorOffer}>Rs {offer.amount}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.acceptButton, styles.button]}
                    onPress={() => {
                      handleAccept(offer?._id);
                    }}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rejectButton, styles.button]}
                    onPress={() => {
                      handleReject(offer?._id);
                    }}
                  >
                    <Text style={styles.RejectedbuttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        {/* <ScrollView vertical={true}>
          {tailorOffers.map((offer, index) => (
            <View style={styles.tailorOfferContainer} key={index}>
              <Image source={offer.image} style={styles.tailorImage} />
              <View style={styles.tailorDetails}>
                <Text style={styles.tailorName}>{offer.name}</Text>
                <Text style={styles.tailorOffer}>Offer: Rs {offer.offer}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.acceptButton, styles.button]}
                  onPress={handleAccept}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.rejectButton, styles.button]}
                  onPress={handleReject}
                >
                  <Text style={styles.RejectedbuttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView> */}
      {/* </View> */}
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
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
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
  acceptRejectContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#F0F0F0",
    height: 300,
    borderRadius: 18,
    padding: 10,
    justifyContent: "space-between",
  },
  tailorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    //marginLeft: 2,
  },
  tailorDetails: {
    flex: 1,
    //backgroundColor: "pink",
  },
  tailorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tailorOffer: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    //backgroundColor: "red",
    //justifyContent: "space-between",
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    //marginHorizontal: 5,
    marginEnd: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#16a085",
  },
  rejectButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#16a085",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // White for Accept, Green for Reject
  },
  RejectedbuttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black", // White for Accept, Green for Reject
  },
  tailorOfferContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 400,
  },
});

export default ViewCustomOrder;
