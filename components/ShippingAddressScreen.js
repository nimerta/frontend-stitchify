import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import Ip from "../IPConfigration";

const ShippingAddressScreen = ({ navigation, route }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userId, setUserId] = useState(route.params.data);
  const [addressList, setAddressList] = useState([
    "Hammeda heights shaheed-e-milat road karachi sindh pakistan",
    "szabist 100 campus 2 talwar",
    "hello hi bye bye i dont know who are u ? where do u live ? bhad mn jao ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  ]);

  const { cart } = route.params;
  const [cartData, setCartData] = useState(cart);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleProceedToPayment = () => {
    if (selectedAddress) {
      // Proceed to the payment screen
      navigation.navigate("PaymentScreen", {
        address: selectedAddress,
        cart: cartData,
        data: userId,
      });
    } else {
      alert("Please select an address or add a new address");
    }
  };

  const getUserAddressList = async () => {
    var apiResponse = await axios
      .get(`http://${Ip.mainIP}/api/address/get-user-address-list/${userId}`)
      .then((onAddressListFound) => {
        // console.log("on address list found: ", onAddressListFound.data);
        const formattedAddresses = onAddressListFound.data.addresses.map(
          (obj) => obj.formatted_address
        );
        console.log("formatted array: ", formattedAddresses);

        setAddressList(onAddressListFound.data.addresses);
      })
      .catch((onAddressListFoundError) => {
        console.log("on address list found error: ", onAddressListFoundError);
      });
  };

  useEffect(() => {
    getUserAddressList();
    console.log("cart shipping: ", cartData);
  }, []);

  const handleAddAddress = () => {
    // Navigate to the edit address screen
    navigation.navigate("EditAddressScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Shipping Address</Text>
      {addressList.length > 0 ? (
        addressList.map((address, index) => (
          <View key={index}>
            <Text style={styles.addressHeader}>Address {index + 1}</Text>
            <TouchableOpacity
              style={[
                styles.addressContainer,
                selectedAddress === address && styles.selectedAddressContainer,
              ]}
              onPress={() => handleSelectAddress(address)}
            >
              <View style={styles.addressDetails}>
                <Text style={styles.addressText}>
                  {address.formatted_address}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  selectedAddress === address && styles.selectedButton,
                ]}
                onPress={() => handleSelectAddress(address)}
              >
                {selectedAddress === address && (
                  <Text style={styles.buttonText}>Selected</Text>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handleProceedToPayment}
      >
        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2F2F2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#16a085",
  },
  addressHeader: {
    fontSize: 18,
    color: "#16a085",
    fontWeight: "700",
    marginBottom: 10,
  },
  addressContainer: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedAddressContainer: {
    //borderColor: "#16a085",
    backgroundColor: "#B8B8B8",
  },
  addressDetails: {
    flex: 1,
    //backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  addressText: {
    fontSize: 16,
    color: "#202020",
  },
  selectButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#B8B8B8",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#16a085",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: "#16a085",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShippingAddressScreen;
