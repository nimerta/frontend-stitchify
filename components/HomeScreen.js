import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { mainIp } from "../IPConfigration";
import Loading from "./Loaders/Loading";
import { MaterialIcons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [allDesigns, setAllDesigns] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState(route.params.loggedInUser);
  const [greetingMessage, setGreetingMessage] = useState("");

  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning!";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon!";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  };

  const getAllDesigns = async () => {
    try {
      const response = await axios.get(
        `http://${mainIp}/api/home/get-designs-for-you`
      );
      setAllDesigns(response.data.designForYou);
    } catch (error) {
      console.log("Error retrieving designs:", error);
    }
  };

  useEffect(() => {
    console.log("home home data: ", route.params.loggedInUser);
    setGreetingMessage(getGreeting());
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    getAllDesigns();
    console.log("Designs are visible in HomeScreen");
  }, []);

  const services = [
    {
      key: "1",
      title: "Give Measurement",
      image: require("../Images/icon1.png"),
      screen: "Measurement",
    },
    {
      key: "2",
      title: "Tailor Made Designs",
      image: require("../Images/icon2.png"),
    },
    {
      key: "3",
      title: "Dupatta pico",
      image: require("../Images/icon4.png"),
      screen: "CustomOrderCheckout",
    },
    {
      key: "4",
      title: "Custom Order",
      image: require("../Images/iconOrder.png"),
      screen: "CustomOrderScreen",
      userId: route.params.user,
      loggedInUser: loggedInUser,
    },
  ];

  // const renderService = ({ item }) => (
  //   <TouchableOpacity style={styles.ServicesBox}>
  //     <View style={styles.IconContainer}>
  //       <Image style={styles.IconStyle} source={item.image}></Image>
  //     </View>
  //     <Text style={styles.ServicesTxt}>{item.title}</Text>
  //   </TouchableOpacity>
  // );

  const categories = [
    {
      key: "1",
      title: "Lehnga set",
      image: require("../Images/lehnga.jpg"),
    },
    {
      key: "2",
      title: "Blouse",
      image: require("../Images/blouse.jpg"),
    },
    { key: "3", title: "Shirt Trouser", image: require("../Images/suit.jpg") },
    {
      key: "4",
      title: "Trouser",
      image: require("../Images/pant.jpg"),
    },
    {
      key: "5",
      title: "Kurta",
      image: require("../Images/shirt.jpg"),
    },
    {
      key: "6",
      title: "Maxi dress",
      image: require("../Images/maxi.jpg"),
    },
  ];
  const renderCategories = ({ item }) => (
    <TouchableOpacity>
      <TouchableOpacity style={styles.CategoriesBox}>
        <View style={styles.ImgContainer}>
          <Image
            style={styles.categorgoriesImgStyle}
            source={item.image}
          ></Image>
        </View>
        {/* <Text style={styles.ServicesTxt}>{item.title}</Text> */}
      </TouchableOpacity>
      <Text style={styles.ServicesTxt}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderDesigns = ({ item }) => (
    <TouchableOpacity
      style={styles.DesignBox}
      onPress={() =>
        navigation.navigate("AddToCartScreen", {
          design: item,
          user: route.params.user,
        })
      }
    >
      <View style={styles.DesignView}>
        <Image
          style={styles.DesignImage}
          source={{
            uri: item.image.url,
          }}
        ></Image>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.DesignTxt}>{item.title}</Text>
        <Text style={styles.DesignTxt}>Rs {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    // <View>
    //   <Text>home</Text>
    // </View>
    <View style={styles.Container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.HeaderStyle}>
            <View style={styles.ProfileBox}>
              <Image
                style={styles.ProfileStyle}
                source={{
                  uri: loggedInUser?.image?.url,
                }}
              ></Image>
            </View>
            <View style={styles.TxtContainer}>
              <Text style={styles.Txt1Style}>{loggedInUser?.full_name}</Text>
              <Text style={styles.Txt2Style}>{greetingMessage}</Text>
            </View>
            <TouchableOpacity style={styles.notifcationStyle}>
              <MaterialIcons
                name="notifications-none"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.SwiperContainer}>
              <Swiper
                autoplay={true}
                autoplayTimeout={3}
                loop={true}
                showsPagination={false}
              >
                <View style={styles.slide}>
                  <Image
                    style={styles.image}
                    source={require("../Images/1234.jpg")}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    style={styles.image}
                    source={require("../Images/2.jpg")}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    style={styles.image}
                    source={require("../Images/home3.jpg")}
                  />
                </View>
              </Swiper>
            </View>
            <Text style={styles.ServicesStyle}>Services</Text>

            <View style={styles.ServicesContainer}>
              <ScrollView horizontal={true}>
                {services.map((item) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(item.screen, {
                        user: route.params.user,
                        loggedInUser: loggedInUser,
                      });
                    }}
                    key={item.key}
                    style={styles.ServicesBox}
                  >
                    <View style={styles.IconContainer}>
                      <Image
                        style={styles.IconStyle}
                        source={item.image}
                      ></Image>
                    </View>
                    <Text style={styles.ServicesTxt}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={styles.ServicesStyle}>Categories</Text>
            <View style={styles.CategoriesContainer}>
              <FlatList
                data={categories}
                horizontal={true}
                renderItem={renderCategories}
                keyExtractor={(item) => item.key}
              />
            </View>
            <View style={styles.designHeadingBox}>
              <Text style={styles.designHeadingBoxText}>Designs</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.DesignContainer}>
              <FlatList
                data={allDesigns}
                numColumns={2}
                renderItem={renderDesigns}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.DesignContainer}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    //top: "7%",
    marginTop: 35,
    backgroundColor: "#F7F7F7",
  },

  SwiperContainer: {
    width: 380,
    height: 190,
    alignSelf: "center",
    marginBottom: 5,
    // backgroundColor: "green",
  },
  slide: {
    height: "100%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  HeaderStyle: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  ProfileBox: {
    width: 60,
    height: 80,
    marginTop: 11,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  ProfileStyle: {
    width: "100%",
    height: "75%",
    resizeMode: "cover",
    borderRadius: 50,
  },
  TxtContainer: {
    flexDirection: "column",

    justifyContent: "space-between",
    flex: 1,
    width: "auto",
    maxWidth: "60%",
    padding: 12,
    // marginVertical: 10,
    // marginHorizontal: 10,
    // marginVertical: 10,
  },
  Txt1Style: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "Arial",
    fontStyle: "normal",
    color: "#16a085",
    // backgroundColor: "blue",
  },
  Txt2Style: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Arial",
    fontStyle: "normal",
    color: "black",
    marginTop: 6,
    // backgroundColor: "green",
  },
  notifcationStyle: {
    backgroundColor: "white",
    height: "75%",
    width: "13%",
    marginLeft: "5%",
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  ServicesStyle: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "Arial",
    //padding: 11,
    paddingLeft: 10,
    marginVertical: 6,
  },
  ServicesContainer: {
    height: 130,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    //marginTop: 5,
    //backgroundColor: "yellow",
  },
  CategoriesContainer: {
    height: 130,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    //backgroundColor: "yellow",
  },
  ServicesBox: {
    backgroundColor: "#fff",
    width: 110,
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginHorizontal: 10,
    // elevation: 15,
  },
  ServicesTxt: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Arial",
    color: "#000",
    textAlign: "center",
    padding: 5,
  },
  IconContainer: {
    width: "50%",
    height: "50%",
    alignItems: "center",
    borderRadius: 20,
  },
  IconStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  CategoriesBox: {
    backgroundColor: "transparent",
    width: 100,
    height: 100,
    //backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    //padding: 3,
    marginHorizontal: 5,
    // elevation: 15,
    borderColor: "#16a085",
  },
  ImgContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  categorgoriesImgStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  DesignContainer: {
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  DesignBox: {
    backgroundColor: "white",
    height: 270,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  DesignView: {
    height: 200,
    width: 165,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
  },
  DesignImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  descriptionBox: {
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingVertical: 3,

    width: "85%",
  },
  DesignTxt: {
    fontFamily: "Arial",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 3,
  },
  designHeadingBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 40,
    //backgroundColor: "yellow",
  },
  designHeadingBoxText: {
    fontFamily: "Arial",
    fontSize: 18,
    fontWeight: "900",
    paddingVertical: 8,
  },
  seeAllText: {
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 10,
  },
});
export default HomeScreen;
