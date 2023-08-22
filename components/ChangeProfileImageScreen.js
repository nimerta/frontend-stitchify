import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Ip from "../IPConfigration";

const ChangeProfileImageScreen = ({ navigation, route }) => {
  const [imageUri, setImageUri] = useState(route.params.image);
  const [userId, setUserId] = useState(route.params.data);

  var updateProfilePicture = async () => {
    var bodyData = {
      image: imageUri,
    };
    var apiResponse = await axios
      .patch(
        `http://${Ip.mainIp}/api/user/update-profile-picture/${userId}`,
        bodyData
      )
      .then((onImageUpdate) => {
        console.log("on image update: ", onImageUpdate);
        alert(onImageUpdate.data.message);
        navigation.navigate("EditProfile", { data: userId });
      })
      .catch((onImageUpdateError) => {
        console.log("on image update error: ", onImageUpdateError);
      });
  };

  useEffect(() => {
    console.log(route.params);
  }, []);
  const handleOpenGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to change the profile image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.log("Error occurred while accessing the image library:", error);
    }
  };

  const handleTakePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera permissions to take a picture."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.log("Error occurred while accessing the camera:", error);
    }
  };

  const handleSubmit = () => {
    //api call
    // navigation.goBack();
    updateProfilePicture();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Change Profile Image</Text>
      {imageUri && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageUri}` }}
          style={styles.previewImage}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#16a085",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default ChangeProfileImageScreen;
