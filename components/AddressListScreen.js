import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import Ip from "../IPConfigration";
const AddressListScreen = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState("");
  const [userId, setUserId] = useState(route.params.data);

  const [addressList, setAddressList] = useState([
    "Hammeda heights shaheed-e-milat road karachi sindh pakistan ",
    "szabist 100 campus 2 talwar",
    "hello hi bye bye i dont know who are u ? where do u live ? bhad mn jao ",
  ]);

  const handleAddAddress = (isEdit, address) => {
    navigation.navigate("EditAddressScreen", {
      isEdit,
      data: userId,
      addressObj: address,
    });
  };
  const handleConfirmDelete = () => {
    const updatedList = addressList.filter(
      (address) => address !== addressToDelete
    );
    setAddressList(updatedList);
    setShowModal(false);
  };
  const handleDeleteAddress = (index) => {
    setAddressToDelete(addressList[index]);
    setShowModal(true);
  };

  const getUserAddressList = async () => {
    var apiResponse = await axios
      .get(`http://${Ip.mainIp}/api/address/get-user-address-list/${userId}`)
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
    console.log("address list: ", userId);
    getUserAddressList();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {addressList.length === 0 && (
        <TouchableOpacity style={styles.btn} onPress={handleAddAddress}>
          <Text style={styles.btnText}>Add Address</Text>
        </TouchableOpacity>
      )}

      {addressList.length > 0 && (
        <>
          <View style={styles.container}>
            {addressList.map((address, index) => (
              <View key={index} style={styles.addressContainer}>
                <Text style={styles.header}>Address {index + 1}</Text>
                <View style={styles.btnsContainer}>
                  <TouchableOpacity
                    onPress={() => handleAddAddress(true, address)}
                    style={styles.IconBtn}
                  >
                    <Feather
                      name="edit"
                      size={17}
                      color="#202020"
                      style={styles.icon}
                    />
                    <Text style={styles.editBtnTxt}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteAddress(index)}
                    style={styles.IconBtn}
                  >
                    <Feather
                      name="trash-2"
                      size={17}
                      color="#202020"
                      style={styles.icon}
                    />
                    <Text style={styles.editBtnTxt}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addressDetails}>
                  <Text style={styles.addressTxt}>
                    {address.formatted_address}
                  </Text>
                </TouchableOpacity>

                <Modal visible={showModal} animationType="slide" transparent>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalText}>
                        Are you sure you want to delete this address?
                      </Text>
                      <View style={styles.modalBtnContainer}>
                        <TouchableOpacity
                          style={[styles.modalBtn, styles.modalCancelBtn]}
                          onPress={() => setShowModal(false)}
                        >
                          <Text style={styles.modalBtnText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.modalBtn, styles.modalDeleteBtn]}
                          onPress={handleConfirmDelete}
                        >
                          <Text style={styles.modalBtnText}>Yes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleAddAddress(false, null)}
          >
            <Text style={styles.btnText}>Add Address</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AddressListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  addressContainer: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    color: "#16a085",
    fontWeight: "700",
    padding: 10,
    top: 35,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    //paddingHorizontal: 25,
    //marginLeft: 30,
    //backgroundColor: "yellow",
    height: 35,
  },
  editBtnTxt: {
    color: "#202020",
    fontSize: 15,
    fontWeight: "500",
    marginHorizontal: 3,
  },
  IconBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10,
  },

  icon: {
    //marginRight: 5,
  },
  addressDetails: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "95%",
    height: 90,
    alignSelf: "center",
    //justifyContent: "center",
    //paddingHorizontal: 10,
    padding: 10,
  },
  addressTxt: {
    color: "#202020",
    fontSize: 16,
    width: "auto",
    maxWidth: "90%",
    fontWeight: "600",
    //textAlign: "center",
  },
  btn: {
    backgroundColor: "#16a085",
    height: 60,
    width: "92%",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "16%",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  modalBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalBtn: {
    marginLeft: 10,
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  modalCancelBtn: {
    backgroundColor: "#ccc",
  },
  modalDeleteBtn: {
    backgroundColor: "#16a085",
  },
  modalBtnText: {
    color: "white",
    fontSize: 14,
  },
});
