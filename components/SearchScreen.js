import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import Ip from "../IPConfigration";

const designsData = [
  {
    id: 1,
    name: "Floral Embroidery",
    category: "Embroidery",
    image: require("../Images/home1.jpg"),
    price: "50",
  },
  {
    id: 2,
    name: "Floral lace",
    category: "Embroidery",
    image: require("../Images/home1.jpg"),
    price: "50",
  },
  // Add more design data here
];

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState([]);

  const [allDesigns, setAllDesigns] = useState([]);

  const getAllDesigns = async () => {
    try {
      const response = await axios.get(
        `http://${Ip.mainIp}/api/home/get-designs-for-you`
      );
      setAllDesigns(response.data.designForYou);
    } catch (error) {
      console.log("Error retrieving designs:", error);
    }
  };

  useEffect(() => {
    getAllDesigns();
    if (searchQuery === "") {
      setFilteredDesigns([]);
    } else {
      const filtered = allDesigns.filter(
        (design) =>
          design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          design.design_for.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDesigns(filtered);
    }
  }, [searchQuery]);
  const handleSearch = () => {
    navigation.navigate("AddToCartScreen", { image, name, price });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.designItem} onPress={handleSearch}>
      <View style={styles.designImageContainer}>
        <Image
          source={{
            uri: item?.image?.url,
          }}
          style={styles.designImage}
        />
      </View>
      <View style={styles.designDetails}>
        <Text style={styles.designName}>{item.title}</Text>
        <Text style={styles.designPrice}>Rs {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Search designs..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredDesigns}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        style={styles.designList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    backgroundColor: "white",
  },
  searchInput: {
    height: 55,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#EEF1F6",
    borderRadius: 16,
  },
  designList: {
    flex: 1,
  },
  designItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#EEF1F6",
    borderRadius: 10,
    height: 100,
  },
  designImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  designImage: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  designDetails: {
    flex: 1,
    //justifyContent: "flex-start",
    paddingTop: 10,
  },
  designName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  designPrice: {
    color: "#666",
  },
});

export default SearchScreen;
