import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Ip from "../IPConfigration";

const CustomOrderHistory = ({ navigation, route }) => {
  const [customerName, setCustomerName] = useState("");
  const [orderPlacedDate, setOrderPlacedDate] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [priceOffered, setPriceOffered] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(route.params.loggedInUser);

  // const [customOrders, setCustomOrders] = useState(
  //   route.params.customOrdersData
  // );

  const [customOrders, setCustomOrders] = useState([]);

  const getAllCustomOrders = async () => {
    var apiResponse = await axios
      .get(
        `http://${Ip.mainIp}/api/custom-order/get-all-user-custom-orders/${route.params.loggedInUser._id}`
      )
      .then((onFound) => {
        console.log("onFound: ", onFound.data);
        setCustomOrders(onFound.data.allCustomOrders);
      })
      .catch((onFoundError) => {
        console.log("onFoundError: ", onFoundError);
      });

    // setCustomOrders(apiResponse.data.allCustomOrders);
  };

  useEffect(() => {
    // setInterval(() => {
    //   getAllCustomOrders();
    // }, 2000);

    getAllCustomOrders();

    console.log("customOrders: ", customOrders);
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderItem}>
        <Image
          // source={item.designImage} // Replace with: source={require(item.designImage)}
          source={{ uri: item.images[0].url }} // Replace with: source={require(item.designImage)}
          style={styles.thumbnailImage}
        />
        <View style={styles.orderDetails}>
          <Text style={styles.customerName}>{item._id}</Text>
          <Text style={styles.orderPlacedDate}>
            {`${new Date(item.createdAt).getDate()}-${new Date(
              item.createdAt
            ).getMonth()}-${new Date(item.createdAt).getFullYear()}`}
          </Text>
          <Text style={styles.TxtStyle}>{item.category}</Text>
          <Text style={styles.TxtStyle}>{item.order_area?.name}</Text>
          <Text style={styles.TxtStyle}>Rs {item.total_amount}</Text>
        </View>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            // navigation.navigate("ViewCustomOrder", { orderId: item.id })
            navigation.navigate("ViewCustomOrder", {
              data: item?._id,
              loggedInUser: loggedInUser,
            })
          }
        >
          <Text style={styles.viewButtonText}>View Order</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={customOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  orderContainer: {
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 14,
  },
  thumbnailImage: {
    width: 80,
    height: 60,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
    marginRight: 10,
  },
  viewButton: {
    backgroundColor: "#16a085",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtonText: {
    color: "#fff",
  },
  space: {
    height: 5,
  },
  customerName: {
    fontWeight: "bold",
    marginVertical: 2,
  },
  orderPlacedDate: {
    color: "gray",
    marginTop: 2,
    marginBottom: 2,
  },
  TxtStyle: {
    fontSize: 14,
    marginBottom: 2,
  },
};

export default CustomOrderHistory;
