import React, { useState, useEffect } from "react";
import ShirtSize from "../Images/kurta1.jpg";
import TrouserSize from "../Images/trouser.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { mainIp } from "../IPConfigration";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import Ip from "../IPConfigration";

const ViewMeasurement = ({ navigation, route }) => {
  const [shirtLength, setShirtLength] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [sleeveLength, setSleeveLength] = useState("");
  const [sleeveOpening, setSleeveOpening] = useState("12");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [shirtBottom, setShirtBottom] = useState("");
  const [trouserLength, setTrouserLength] = useState("");
  const [trouserWaist, setTrouserWaist] = useState("");
  const [inseam, setInseam] = useState("");
  const [thighs, setThighs] = useState("");
  const [trouserHip, setTrouserHip] = useState("");
  const [legOpening, setLegOpening] = useState("");
  const [trouserRise, setTrouserRise] = useState("");

  const user_id = route.params.data;

  const MeasurementData = {
    shoulder: shoulder,
    bust: bust,
    waist: waist,
    hip: hips,
    shirt_bottom: shirtBottom,
    shirt_length: shirtLength,
    sleeve_length: sleeveLength,
    sleeveOpening: sleeveOpening,
    trouser_waist: trouserWaist,
    trouser_hip: trouserHip,
    inseam: inseam,
    trouser_rise: trouserRise,
    trouser_length: trouserLength,
    thigh: thighs,
    leg_opening: legOpening,
  };

  const getUserMeasurement = async () => {
    console.log(`http://${Ip.mainIp}/api/user/get-measurement/${user_id}`);
    var apiResponse = await axios
      .get(`http://${Ip.mainIp}/api/user/get-measurement/${user_id}`)
      .then((onMeasurementFound) => {
        console.log("onMeasurementFound: ", onMeasurementFound.data);
        var {
          shirt_length,
          shoulder,
          sleeve_length,
          bust,
          waist,
          hip,
          shirt_bottom,
          trouser_length,
          trouser_waist,
          inseam,
          thigh,
          trouser_hip,
          leg_opening,
          trouser_rise,
        } = onMeasurementFound.data.measurement;
        console.log(shirt_length);
        setShirtLength(shirt_length);
        setShoulder(shoulder);
        setSleeveLength(sleeve_length);
        setBust(bust);
        setWaist(waist);
        setHips(hip);
        setShirtBottom(shirt_bottom);
        setTrouserLength(trouser_length);
        setTrouserWaist(trouser_waist);
        setInseam(inseam);
        setThighs(thigh);
        setTrouserHip(trouser_hip);
        setLegOpening(leg_opening);
        setTrouserRise(trouser_rise);
      });
  };

  useEffect(() => {
    getUserMeasurement();
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView>
        {/* <Text style={styles.TxtStyle}>Measurement Form</Text>
        <Image style={styles.ShirtChart} source={ShirtSize} />
        <Image style={styles.TrouserChart} source={TrouserSize} /> */}
        <Text style={styles.container2}>Shirt (Inches) </Text>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{shoulder}</Text>

            <Text style={styles.inputBoxText}>Shoulder</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{bust}</Text>

            <Text style={styles.inputBoxText}>Bust/Chest</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{waist}</Text>
            <Text style={styles.inputBoxText}>Shirt Waist</Text>
          </View>
        </View>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{hips}</Text>
            <Text style={styles.inputBoxText}>Hips</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{shirtBottom}</Text>
            <Text style={styles.inputBoxText}>Bottom/Daman</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{shirtLength}</Text>
            <Text style={styles.inputBoxText}>Shirt Length</Text>
          </View>
        </View>
        <Text style={styles.container3}>Sleeves </Text>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{sleeveLength}</Text>
            <Text style={styles.inputBoxText}>Sleeves Length</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{sleeveOpening}</Text>
            <Text style={styles.inputBoxText}>Sleeves Opening</Text>
          </View>
        </View>

        <Text style={styles.container2}>Trouser (Inches)</Text>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{trouserWaist}</Text>
            <Text style={styles.inputBoxText}>Trouser Waist</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{trouserLength}</Text>
            <Text style={styles.inputBoxText}>Trouser Length</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{inseam}</Text>
            <Text style={styles.inputBoxText}>Inseam</Text>
          </View>
        </View>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{trouserHip}</Text>
            <Text style={styles.inputBoxText}>Hips</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{thighs}</Text>
            <Text style={styles.inputBoxText}>Thighs</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{trouserRise}</Text>
            <Text style={styles.inputBoxText}>Rise</Text>
          </View>
        </View>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.inputCustom}>{legOpening}</Text>
            <Text style={styles.inputBoxText}>Leg Opening</Text>
          </View>
        </View>

        {/* <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  TxtStyle: {
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "Arial",
    textAlign: "center",
    paddingVertical: 40,
  },
  ShirtChart: {
    resizeMode: "contain",
    height: 250,
    width: 400,
  },
  TrouserChart: {
    resizeMode: "contain",
    height: 350,
  },
  container2: {
    fontSize: 20,
    fontFamily: "Arial",
    fontWeight: "bold",
    paddingVertical: 30,
  },
  container3: {
    fontSize: 20,
    fontFamily: "Arial",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  inputsContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    // justifyContent: "space-between",
    // marginRight: -10,
    marginLeft: -45,
  },
  label: {
    fontSize: 17,
    fontFamily: "Arial",
    fontWeight: "normal",
    // paddingVertical: 15,
    // padding: 5,
    // marginTop: -10,
    position: "relative",
    top: -25,
    left: 60,
  },
  input: {
    width: "38%",
    height: 50,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "#ffffff",
  },
  btn2: {
    backgroundColor: "#16a085",
    height: 50,
    width: 150,
    borderRadius: "18%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  customContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputBox: {
    width: "25%",
    height: 90,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    shadowColor: "#000000",
    borderColor: "yellow",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    flex: 1,
    justifyContent: "center",
  },

  inputBoxText: {
    textAlign: "center",
    fontSize: 16,
  },
  inputCustom: {
    width: "100%",
    height: "60%",
    textAlign: "center",
    fontSize: 28,
  },
});
export default ViewMeasurement;
