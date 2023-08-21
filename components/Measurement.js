import React, { useState } from "react";
import ShirtSize from "../Images/kurta1.jpg";
import TrouserSize from "../Images/trouser.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { mainIP } from "../IPConfigration";

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

const Measurement = ({ navigation, route }) => {
  const [shirtLength, setShirtLength] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [sleeveLength, setSleeveLength] = useState("");
  const [sleeveOpening, setSleeveOpening] = useState("");
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

  const user_id = route.params;

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

  const submitMeasurement = async () => {
    console.log(" measurement screen user id: ", user_id);
    console.log("measurment data: ", MeasurementData);

    var api = await axios
      .patch(
        `http://${mainIP}/api/user/submit-measurement/${user_id}`,
        MeasurementData
      )
      .then(async (onMeasurementSubmit) => {
        console.log("on measurement submit : ", onMeasurementSubmit.data);
      })
      .catch(async (onMeasurementSubmitError) => {
        console.log(
          "on measurment submit error: ",
          onMeasurementSubmitError.response.data
        );
      });
  };

  const handleSubmit = () => {
    if (!shoulder || shoulder.trim() === "") {
      alert("Please enter your shoulder measurement");
      return;
    }
    if (!/^\d+$/.test(shoulder)) {
      alert("Please enter a valid shoulder measurement");
      return;
    }
    if (!bust || bust.trim() === "") {
      alert("Please enter your bust/chest measurement");
      return;
    }
    if (!/^\d+$/.test(bust)) {
      alert("Please enter a valid bust/chest measurement");
      return;
    }

    if (!shirtLength || shirtLength === "") {
      alert("Please enter your shirt length");
      return;
    }
    if (!/^\d+$/.test(shirtLength)) {
      alert("Please enter a valid shirt length");
      return;
    }
    if (!sleeveLength || sleeveLength === "") {
      alert("Please enter your sleeve length");
      return;
    }
    if (!/^\d+$/.test(sleeveLength)) {
      alert("Please enter a valid sleeve length");
      return;
    }
    if (!sleeveOpening || sleeveOpening === "") {
      alert("Please enter your sleeve opening");
      return;
    }
    if (!/^\d+$/.test(sleeveOpening)) {
      alert("Please enter a valid sleeve opening");
      return;
    }
    if (!waist || waist === "") {
      alert("Please enter your waist measurement");
      return;
    }
    if (!/^\d+$/.test(waist)) {
      alert("Please enter a valid waist measurement");
      return;
    }
    if (!hips || hips === "") {
      alert("Please enter your hip measurement");
      return;
    }
    if (!/^\d+$/.test(hips)) {
      alert("Please enter a valid hip measurement");
      return;
    }
    if (!shirtBottom || shirtBottom === "") {
      alert("Please enter your shirt bottom measurement");
      return;
    }
    if (!/^\d+$/.test(shirtBottom)) {
      alert("Please enter a valid shirt bottom measurement");
      return;
    }
    if (!trouserLength || trouserLength === "") {
      alert("Please enter your trouser length");
      return;
    }
    if (!/^\d+$/.test(trouserLength)) {
      alert("Please enter a valid trouser length");
      return;
    }
    if (!trouserWaist || trouserWaist === "") {
      alert("Please enter your trouser waist measurement");
      return;
    }
    if (!/^\d+$/.test(trouserWaist)) {
      alert("Please enter a valid trouser waist measurement");
      return;
    }
    if (!inseam || inseam === "") {
      alert("Please enter your inseam measurement");
      return;
    }
    if (!/^\d+$/.test(inseam)) {
      alert("Please enter a valid inseam measurement");
      return;
    }
    if (!thighs || thighs === "") {
      alert("Please enter your thigh measurement");
      return;
    }
    if (!/^\d+$/.test(thighs)) {
      alert("Please enter a valid thigh measurement");
      return;
    }
    if (!trouserHip || trouserHip === "") {
      alert("Please enter your trouser hip measurement");
      return;
    }
    if (!/^\d+$/.test(trouserHip)) {
      alert("Please enter a valid trouser hip measurement");
      return;
    }
    if (!legOpening || legOpening === "") {
      alert("Please enter your leg opening measurement");
      return;
    }
    if (!/^\d+$/.test(legOpening)) {
      alert("Please enter a valid leg opening measurement");
      return;
    }
    if (!trouserRise || trouserRise === "") {
      alert("Please enter your trouser rise measurement");
      return;
    }
    if (!/^\d+$/.test(trouserRise)) {
      alert("Please enter a valid trouser rise measurement");
      return;
    } else {
      console.log(">>>>>>>:       ", navigation);
      submitMeasurement();
      console.log("api hit success!");
      alert("measurement added successfully");

      navigation.navigate("Login");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView>
        <Text style={styles.TxtStyle}>Measurement Form</Text>
        <Image style={styles.ShirtChart} source={ShirtSize} />
        <Image style={styles.TrouserChart} source={TrouserSize} />
        <Text style={styles.container2}>Shirt (Inches) </Text>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={shoulder}
                onChangeText={setShoulder}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Shoulder</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={bust}
                onChangeText={setBust}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Bust/Chest</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={waist}
                onChangeText={setWaist}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Shirt Waist</Text>
          </View>
        </View>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={hips}
                onChangeText={setHips}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Hips</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={shirtBottom}
                onChangeText={setShirtBottom}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Bottom/Daman</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={shirtLength}
                onChangeText={setShirtLength}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Shirt Length</Text>
          </View>
        </View>
        <Text style={styles.container3}>Sleeves </Text>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={sleeveLength}
                onChangeText={setSleeveLength}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Sleeves Length</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={sleeveOpening}
                onChangeText={setSleeveOpening}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Sleeves Opening</Text>
          </View>
        </View>

        <Text style={styles.container2}>Trouser (Inches)</Text>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={trouserWaist}
                onChangeText={setTrouserWaist}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Trouser Waist</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={trouserLength}
                onChangeText={setTrouserLength}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Trouser Length</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={inseam}
                onChangeText={setInseam}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Inseam</Text>
          </View>
        </View>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={trouserHip}
                onChangeText={setTrouserHip}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Hips</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={thighs}
                onChangeText={setThighs}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Thighs</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={trouserRise}
                onChangeText={setTrouserRise}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Rise</Text>
          </View>
        </View>

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputCustom}
                value={legOpening}
                onChangeText={setLegOpening}
              />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Leg Opening</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btn2} onPress={handleSubmit}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
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
  },

  inputBoxText: {
    textAlign: "center",
    fontSize: 16,
  },
  inputCustom: {
    width: "100%",
    height: "60%",
    textAlign: "center",
  },
});
export default Measurement;
