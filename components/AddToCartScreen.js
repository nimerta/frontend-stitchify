import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Import Ionicons from the icon library

const AddToCartScreen = ({ navigation, route }) => {
  //const { design } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemTitle, setItemTitle] = useState("Dress");
  const [itemDescrption, setItemDescrption] = useState("hbjfbdjbddb");
  const [tailorName, setTailorName] = useState("ahmed khan");
  const [itemPrice, setItemPrice] = useState("2000");
  // const AddToCartData = {
  //   itemTitle: itemTitle,
  //   itemDescrption: itemDescrption,
  //   itemPrice: itemPrice,
  //   tailorName: tailorName,
  // };
  // //const [itemImg, setItemImg] = useState("../Images/blouse.jpg");
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleTailorClick = () => {
    // Handle the click on the tailor picture/name
    console.log("Tailor clicked");
  };

  const handleAddToCart = () => {
    toggleModal();
  };

  const handleGoBack = () => {
    if (isModalVisible) {
      toggleModal();
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <FontAwesome5 name="angle-left" size={30} color="#B2B2B2" />
        </TouchableOpacity>
        <Image source={require("../Images/blouse.jpg")} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{itemTitle}</Text>
        <Text style={styles.description}>{itemDescrption}</Text>
        <TouchableOpacity
          onPress={handleTailorClick}
          style={styles.tailorContainer}
        >
          <Image
            source={require("../Images/1234.jpg")}
            style={styles.tailorImage}
          />
          <Text style={styles.tailorNameStyle}>{tailorName}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>Rs{itemPrice}</Text>
        <TouchableOpacity
          onPress={handleAddToCart}
          style={styles.addToCartButton}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("../Images/blouse.jpg")}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>{itemTitle}</Text>
            <Text style={styles.modalPrice}>{itemPrice}</Text>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                navigation.navigate("MyCartScreen");
              }}
              style={styles.viewCartButton}
            >
              <Text style={styles.viewCartButtonText}>View My Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    position: "relative",
    height: "45%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    height: 30,
    width: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#B8B8B8",
    fontWeight: "500",
  },
  tailorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tailorImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "cover",
  },
  tailorNameStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  addToCartButton: {
    backgroundColor: "#16a085",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 50,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    paddingVertical: 20,
    width: "80%",
    height: 300,
    alignSelf: "center",
    borderRadius: 40,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  viewCartButton: {
    backgroundColor: "#16a085",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: "center",
    marginTop: 20,
  },
  viewCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default AddToCartScreen;
