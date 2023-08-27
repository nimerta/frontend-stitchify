import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ip from "../IPConfigration";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const CustomShippingAddress = ({ navigation, route }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [routeData, setRouteData] = useState(route.params.data);
  const [user_id, setUserId] = useState(route.params.data.userId);
  const { customOrderData } = route.params;
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleProceedToPayment = () => {
    if (selectedAddress) {
      const customOrderData = {
        address: selectedAddress,
        customData: routeData,
        isCustom: true,
      };
      // Proceed to the payment screen
      navigation.navigate("PaymentScreen", {
        address: selectedAddress,
        customOrderData: customOrderData,
      });
    } else {
      alert("Please select an address or add a new address");
    }
  };

  const handleAddAddress = () => {
    // Navigate to the edit address screen
    navigation.navigate("EditAddressScreen", {
      isEdit: false,
    });
  };

  const getUserAddressList = async () => {
    var apiResponse = await axios
      .get(
        `http://${Ip.mainIp}/api/address/get-user-address-list/${route.params.data.userId}`
      )
      .then((onAddressListFound) => {
        console.log("on address list found: ", onAddressListFound.data);

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
    console.log("route data: ", routeData);
    getUserAddressList();
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.title}>Select Shipping Address</Text>
      {addressList && addressList.length > 0 ? (
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
    </KeyboardAwareScrollView>
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
    backgroundColor: "#B8B8B8",
  },
  addressDetails: {
    flex: 1,
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
    marginTop: 10,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomShippingAddress;
