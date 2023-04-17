import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Swiper from "react-native-swiper";
import Lottie from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Loading from "./Loaders/Loading";
import Feather from "react-native-feather";
import { TouchableOpacity } from "react-native";
const HomeScreen = ({ route }) => {
  const { data } = route.params;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const services = [
    {
      key: "1",
      title: "Give Measurement",
      image: require("../Images/icon1.png"),
    },
    {
      key: "2",
      title: "Tailor Made Designs",
      image: require("../Images/icon2.png"),
    },
    { key: "3", title: "Dupatta pico", image: require("../Images/icon4.png") },
    {
      key: "4",
      title: "Custom Order",
      image: require("../Images/iconOrder.png"),
    },
  ];

  const renderService = ({ item }) => (
    <TouchableOpacity style={styles.ServicesBox}>
      <View style={styles.IconContainer}>
        <Image style={styles.IconStyle} source={item.image}></Image>
      </View>
      <Text style={styles.ServicesTxt}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.Container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.HeaderStyle}>
            <View style={styles.ImageBox}>
              <Image
                style={styles.ImageStyle}
                source={require("../Images/home1.jpg")}
              ></Image>
            </View>
            <View style={styles.TxtContainer}>
              <Text style={styles.Txt1Style}>Hi, Muhammad! </Text>
              <Text style={styles.Txt2Style}>Good Evening!</Text>
            </View>
            <View style={styles.notifcationStyle}>
              <MaterialIcons
                name="notifications-none"
                size={30}
                color="black"
              />
            </View>
          </View>

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
          {/* <View style={styles.ServicesContainer}>
            <ScrollView horizontal={true}>
              <View style={styles.ServicesBox}>
                <Text style={styles.ServicesTxt}>Give Measurement</Text>
              </View>
              <View style={styles.ServicesBox}>
                <Text style={styles.ServicesTxt}>Tailor Made Designs</Text>
              </View>
              <View style={styles.ServicesBox}>
                <Text style={styles.ServicesTxt}>Pico</Text>
              </View>
              <View style={styles.ServicesBox}>
                <Text style={styles.ServicesTxt}>Custom Order</Text>
              </View>
            </ScrollView>
          </View> */}
          <View style={styles.ServicesContainer}>
            <FlatList
              data={services}
              horizontal={true}
              renderItem={renderService}
              keyExtractor={(item) => item.key}
            />
          </View>
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
    top: "7%",
    backgroundColor: "#F7F7F7",
  },

  SwiperContainer: {
    width: "88%",
    height: "18%",
    alignSelf: "center",
  },
  HeaderStyle: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // justifyContent: "space-around",

    // shadowColor: "black",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  ImageBox: {
    width: "14%",
    height: "100%",
    marginTop: 11,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  ImageStyle: {
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
    padding: 13,
  },
  ServicesContainer: {
    height: "12%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  // ServicesBox: {
  //   height: "100%",
  //   width: "30%",
  //   backgroundColor: "blue",
  //   marginRight: 10,
  // },
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
    borderColor: "#16a085",
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
  },
  IconStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
export default HomeScreen;
