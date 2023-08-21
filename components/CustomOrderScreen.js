import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ImagePicker from "react-native-image-picker";

const CustomOrderScreen = ({ navigation }) => {
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [designPictures, setDesignPictures] = useState([]);
  const [instructions, setInstructions] = useState("");

  const handleAddPicture = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // User cancelled image picker
      } else if (response.error) {
        // Image picker error
      } else {
        // Add the selected image to the list of designPictures
        const newDesignPictures = [...designPictures, response.uri];
        setDesignPictures(newDesignPictures);
      }
    });
  };

  const handleNext = () => {
    if (!category) {
      alert("Please select a category");
      return;
    }
    if (!fabric) {
      alert("Please add fabric type");
      return;
    }
    if (designPictures.length === 0) {
      alert("Please add design pictures");
      return;
    }

    // All fields are filled, navigate to the next screen
    const customOrderData = {
      category,
      fabric,
      designPictures,
      instructions,
    };

    navigation.navigate("SelectAddressScreen", { customOrderData });
  };

  const categoryOptions = [
    { label: "Maxi Dress", value: "maxi_dress" },
    { label: "2 Piece", value: "two_piece" },
    { label: "Trouser", value: "trouser" },
  ];

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.mainHeader}>Custom Order</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Category</Text>
        <View style={styles.pickStyle}>
          <Picker
            style={styles.categoryPicker}
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select Category" value="" />
            {categoryOptions.map((category) => (
              <Picker.Item
                key={category.value}
                label={category.label}
                value={category.value}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Fabric</Text>
        <TextInput
          placeholder="Add Fabric Type"
          style={styles.inputfield}
          onChangeText={setFabric}
          value={fabric}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Add Design Pictures</Text>
        <TouchableOpacity onPress={handleAddPicture}>
          <Image
            source={require("../Images/blouse.jpg")}
            style={styles.addPictureIcon}
          />
        </TouchableOpacity>
        {designPictures.map((picture, index) => (
          <Image
            key={index}
            source={{ uri: picture }}
            style={styles.designImage}
          />
        ))}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Instructions</Text>
        <TextInput
          placeholder="Add Instructions"
          style={styles.inputfield}
          onChangeText={setInstructions}
          value={instructions}
          multiline
        />
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.btn1}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    paddingVertical: "5%",
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  labels: {
    fontSize: 20,
    color: "black",
    marginLeft: "4%",
    marginBottom: "2%",
    marginTop: 20,
  },
  inputfield: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    padding: 18,
    width: "95%",
    marginLeft: "2%",
  },
  pickStyle: {
    backgroundColor: "#EEF1F6",
    borderRadius: 18,
    width: "95%",
    marginLeft: "2%",
    paddingHorizontal: 10,
  },
  categoryPicker: {
    width: "100%",
    height: 50,
  },
  addPictureIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: "4%",
    marginBottom: 10,
  },
  designPicturesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  designImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    marginRight: 10,
    marginBottom: 10,
  },
  btn1: {
    backgroundColor: "#16a085",
    height: 50,
    width: 150,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginVertical: 20,
    marginRight: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default CustomOrderScreen;
