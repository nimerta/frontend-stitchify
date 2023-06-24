import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const MyCartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
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
  ]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    navigation.navigate("ShippingAddressScreen");
  };

  const handleDeleteCartItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const renderCartItem = (item) => {
    return (
      <View key={item.id} style={styles.cartItemContainer}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item.name}</Text>
          <Text style={styles.cartItemPrice}>$ {item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteCartItem(item.id)}>
          <FontAwesome5
            name="trash"
            size={18}
            color="#202020"
            style={styles.IconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartItemsContainer}>
        {cartItems.map(renderCartItem)}
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>$ {getTotalPrice().toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Rest of the styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  cartItemsContainer: {
    marginBottom: 20,
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
    marginTop: -35,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a085",
  },
  checkoutButton: {
    backgroundColor: "#16a085",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  IconStyle: {
    marginTop: -35,
  },
});

export default MyCartScreen;
