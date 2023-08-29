import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Ip from "../IPConfigration";

const StandardOrderHistory = ({ navigation, route }) => {
  const [name, setName] = useState("");
  //const [userId, setUserId] = useState(data);
  const [loggedInUser, setLoggedInUser] = useState(route.params.loggedInUser);

  // const orderHistoryData = [
  //   {
  //     id: 1,
  //     image: require("../Images/blouse.jpg"),
  //     name: "John Doe",
  //     date: "2023-08-15",
  //     category: "Blouse",
  //     price: "5000",
  //   },
  //   {
  //     id: 2,
  //     image: require("../Images/blouse.jpg"),
  //     name: "John Doe",
  //     date: "2023-08-15",
  //     category: "Blouse",
  //     price: "700",
  //   },
  // ];

  const [orderHistoryData, setOrderHistoryData] = useState([]);

  const getAllStandardOrders = async () => {
    var apiResponse = await axios
      .get(
        `http://${Ip.mainIp}/api/standard-order/get-all-user-standard-order/${loggedInUser?._id}`
      )
      .then((onFound) => {
        console.log("onFound: ", onFound.data);
        setOrderHistoryData(onFound.data.orders);
      })
      .catch((onFoundError) => {
        console.log("onFoundError: ", onFoundError);
      });
  };

  useEffect(() => {
    getAllStandardOrders();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.touchableOrderItem}>
      <View style={styles.orderItem}>
        <View style={styles.imageContainer}>
          <Image
            // source={item.image}
            source={{
              uri: item.items[0].item.image?.url,
            }}
            style={styles.orderImage}
          />
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.userName}>{item.tailor.full_name}</Text>
          <Text style={styles.orderDate}>{`${new Date(
            item.createdAt
          ).getDate()}-${new Date(item.createdAt).getMonth()}-${new Date(
            item.createdAt
          ).getFullYear()}`}</Text>
          <Text style={styles.orderCatergory}>{item.order_status}</Text>
        </View>
        <Text style={styles.orderPrice}>Rs {item.total_amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <FlatList
          data={orderHistoryData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //padding: 16,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#EEF1F6",
    borderRadius: 8,

    padding: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10,
  },
  orderImage: {
    width: "100%",
    height: "100%",
  },
  orderDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    marginVertical: 3,
  },
  orderCatergory: {
    fontSize: 14,
    marginVertical: 1,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -50,
  },
});

export default StandardOrderHistory;
