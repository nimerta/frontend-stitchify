import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import Ip from "../IPConfigration";
import { AlignRight } from "react-native-feather";
const MyCartScreen = ({ navigation, route }) => {
  const { AddToCartData } = route.params;
  var [userId, setUserId] = useState(route.params.user);
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
  const handleRefreshCart = () => {
    getUserCart();
  };
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item?.item?.price, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length <= 0) {
      alert("Cart Is Empty!");
    } else {
      navigation.navigate("ShippingAddressScreen", {
        cart: cartItems,
        data: userId,
      });
    }
  };

  const handleDeleteCartItem = async (itemId) => {
    var bodyData = {
      design_id: itemId,
      user_id: userId,
    };
    var apiResponse = await axios
      .post(`http://${Ip.mainIp}/api/user/remove-design-from-cart`, bodyData)
      .then((onDesignRemoved) => {
        console.log("on design removed: ", onDesignRemoved.data);
        if (onDesignRemoved.data.success) {
          getUserCart();
          alert(onDesignRemoved.data.message);
        } else {
          console.log("natho the remove sahb!");
        }
      })
      .catch((onDesignRemovedError) => {
        console.log("on design removed error: ", onDesignRemovedError);
      });
    // const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    // setCartItems(updatedCartItems);
  };

  const getUserCart = async () => {
    var apiResponse = await axios
      .get(`http://${Ip.mainIp}/api/user/get-user-cart/${userId}`)
      .then((onCartFound) => {
        console.log("on cart found: ", onCartFound.data);

        setCartItems(onCartFound.data.cart);
      })
      .catch((onCartFoundError) => {
        console.log("on cart found error: ", onCartFoundError);
      });
  };

  useEffect(() => {
    console.log("user id cart screen: ", userId);
    getUserCart();
  }, []);

  const renderCartItem = (item) => {
    console.log("single item: ", item);

    return (
      <View key={item._id} style={styles.cartItemContainer}>
        <Image
          source={{
            uri: item?.item?.image?.url,
          }}
          style={styles.cartItemImage}
        />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item?.item?.title}</Text>
          <Text style={styles.cartItemPrice}>Rs {item?.item?.price}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteCartItem(item.item._id)}>
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
        <Text style={styles.totalPrice}>Rs {getTotalPrice().toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={handleRefreshCart}
      >
        <Text style={styles.refreshButtonText}>Refresh Cart</Text>
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
  refreshButton: {
    backgroundColor: "#16a085",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  refreshButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default MyCartScreen;
