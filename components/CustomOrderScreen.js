import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { mainIp } from "../IPConfigration";

const CustomOrderScreen = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesBase64, setImagesBase64] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [price, setPrice] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [userId, setUserId] = useState(route.params.user);
  const handleDeleteImage = () => {
    setModalVisible(false);
  };

  const [areas, setAreas] = useState([]);

  const getAllAreas = async () => {
    var api = await axios
      .get(`http://${mainIp}/api/area/get-all-areas`)
      .then((onGet) => {
        setAreas(onGet.data.allAreas);
        console.log("jkfhgk");
      })
      .catch((onError) => {
        console.log("error on getting areas: ", onError);
      });
  };
  const categoryOptions = [
    { label: "Maxi Dress", value: "maxi_dress" },
    { label: "Trouser shirt", value: "Trouser shirt" },
    { label: "Trouser", value: "trouser" },
    { label: "Shirt", value: "Shirt" },
    { label: "Blouse", value: "Blouse" },
    { label: "Lehnga set", value: "Lehnga set" },
  ];
  const fabricOptions = [
    { label: "Cotton", value: "cotton" },
    { label: "Silk", value: "silk" },
    { label: "Polyester", value: "polyester" },
  ];
  const areaOptions = [
    { label: "karachi", value: "karachi" },
    { label: "Sukkar", value: "Sukkar" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Islamabad", value: "Islamabad" },
    { label: "Lahore", value: "Lahore" },
    { label: "Multan", value: "Multan" },
  ];
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,

      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.canceled) {
      const newImages = [...images, result.uri];
      setImagesBase64([...imagesBase64, result.base64]);
      setImages(newImages);
      setSelectedImage(result.uri);
    }
  };
  // const selectImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 0.5,
  //     allowsMultipleSelection: true,
  //     base64: true,
  //   });

  //   if (!result.canceled) {
  //     const newImages = [...images, ...result.uri]; // Add the selected images to the existing images array
  //     setImagesBase64([...imagesBase64, ...result.base64]); // Similarly, update the imagesBase64 array
  //     setImages(newImages);
  //   }
  // };

  const handleNext = () => {
    if (!category || !fabric || !price) {
      alert("Please fill all fields");
      return;
    }
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const customOrderData = {
      category,
      fabric,
      price,
      images,
      instructions,
      userId,
      imagesBase64,
      selectedArea,
    };

    navigation.navigate("CustomShippingAddress", { data: customOrderData });
  };

  useEffect(() => {
    console.log("user id in custom order screen: ", userId);
    getAllAreas();
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainHeader}>Custom Order</Text>
        <Text style={styles.subHeader}>Add Design</Text>
      </View>

      <View style={styles.bigContainer}>
        {selectedImage && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={{ uri: selectedImage }} style={styles.bigImage} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
        <ScrollView horizontal style={styles.smallImageList}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(image)}
            >
              <Image source={{ uri: image }} style={styles.smallThumbnail} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addDesignButton} onPress={selectImage}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.container}>
        <View style={styles.bigContainer}>
          {selectedImage && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={{ uri: selectedImage }} style={styles.bigImage} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.container}>
          <ScrollView horizontal style={styles.smallImageList}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(image)}
              >
                <Image source={{ uri: image }} style={styles.smallThumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.addDesignButton}
            onPress={selectImage}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View> */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteImage}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Select Category</Text>
        <Picker
          style={styles.categoryPicker}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categoryOptions.map((category) => (
            <Picker.Item
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Fabric type</Text>
        <Picker
          style={styles.categoryPicker}
          selectedValue={fabric}
          onValueChange={(itemValue) => setFabric(itemValue)}
        >
          {fabricOptions.map((fabric) => (
            <Picker.Item
              key={fabric.value}
              label={fabric.label}
              value={fabric.value}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Select area</Text>
        <Picker
          style={styles.categoryPicker}
          selectedValue={selectedArea}
          onValueChange={(itemValue) => setSelectedArea(itemValue)}
        >
          {areas.map((selectedArea) => (
            <Picker.Item
              key={selectedArea._id}
              label={selectedArea.name}
              value={selectedArea._id}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Add Price</Text>
        <TextInput
          placeholder="Ex: 2000"
          style={styles.inputField}
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Instructions (Optionl)</Text>
        <TextInput
          placeholder="Add instructions"
          style={styles.instructionInputField}
          onChangeText={setInstructions}
          value={instructions}
          multiline={true}
          numberOfLines={2}
        />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Make an offer</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  headingContainer: {
    paddingLeft: 20, // Add left padding for alignment
    paddingTop: 20,
  },
  mainHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  container: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Align items vertically
    marginBottom: 20,
    marginHorizontal: 10,
  },
  smallImageList: {
    flexGrow: 1,
    // Allow the ScrollView to take up the remaining space
  },
  addDesignButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    marginLeft: 10,
    borderRadius: 10, // Add margin to separate the ScrollView and the plus icon
  },

  bigContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  bigImage: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    borderRadius: 20,
  },

  smallThumbnail: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalImage: {
    width: "98%",
    height: "80%",
    borderRadius: 18,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    height: 360,
    width: 360,
    alignItems: "center",
    //elevation: 5,
    //position: "relative",
  },
  closeButton: {
    position: "absolute",
    bottom: 15,
    right: 25,
    backgroundColor: "#16a085",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  deleteButton: {
    position: "absolute",
    bottom: 15,
    left: 140, // Adjust based on your design
    backgroundColor: "white",
    paddingVertical: 10,
    borderColor: "#16a085",
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputField: {
    //borderWidth: 1,
    //borderColor: "#ccc",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    backgroundColor: "#EEF1F6",
  },
  instructionInputField: {
    //borderWidth: 1,
    //borderColor: "#ccc",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    backgroundColor: "#EEF1F6",
    height: 70,
  },
  categoryPicker: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 8,
    marginBottom: 15,
    marginTop: -70,
  },
  nextButton: {
    backgroundColor: "#16a085",
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignSelf: "flex-end",
    marginVertical: 20,
    marginRight: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
});

export default CustomOrderScreen;
