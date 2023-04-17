import React, { useState } from "react";
import ShirtSize from "../Images/kurta1.jpg";
import TrouserSize from "../Images/trouser.png";

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

const Measurement = ({ navigation, route }) => {
  const [shirtLength, setShirtLength] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [sleeveLength, setSleeveLength] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [shirtBottom, setShirtBottom] = useState("");
  const [trouserLength, setTrouserLength] = useState("");
  const [trouserWaist, setTrouserWaist] = useState("");
  const [inseam, setInseam] = useState("");
  const [thigh, setThigh] = useState("");
  const [trouserHip, setTrouserHip] = useState("");
  const [legOpening, setLegOpening] = useState("");
  const [trouserRise, setTrouserRise] = useState("");

  const { AccountData } = route.params;
  const handleSubmit = () => {
    // Save the measurements to the database or API
    console.log(
      "Measurements submitted:",
      bust,
      waist,
      hip,
      shoulder,
      sleeveLength,
      shirtLength,
      shirtBottom,
      trouserHip,
      trouserRise,
      legOpening,
      thigh,
      trouserWaist,
      inseam,
      trouserLength
    );
  };
  const handleNavigate = () => {
    navigation.navigate("Login");
    alert("measurement added successfully");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.TxtStyle}>Measurement Form</Text>
        <Image style={styles.ShirtChart} source={ShirtSize} />
        <Image style={styles.TrouserChart} source={TrouserSize} />
        <Text style={styles.container2}>Shirt (Inches) </Text>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Shoulder</Text>
          <TextInput
            style={styles.input}
            value={chest}
            onChangeText={setChest}
          />
          <Text style={styles.label}>Bust</Text>
          <TextInput
            style={styles.input}
            value={waist}
            onChangeText={setWaist}
          />
        </View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hip:</Text>
          <TextInput style={styles.input} value={hip} onChangeText={setHip} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Shoulder:</Text>
          <TextInput
            style={styles.input}
            value={shoulder}
            onChangeText={setShoulder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sleeve Length:</Text>
          <TextInput
            style={styles.input}
            value={sleeveLength}
            onChangeText={setSleeveLength}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Shirt Length:</Text>
          <TextInput
            style={styles.input}
            value={shirtLength}
            onChangeText={setShirtLength}
          />
        </View>
        <Text style={styles.container2}>Bottom(Inches)</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Trouser Length:</Text>
          <TextInput
            style={styles.input}
            value={trouserLength}
            onChangeText={setTrouserLength}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Waist:</Text>
          <TextInput
            style={styles.input}
            value={trouserWaist}
            onChangeText={setTrouserWaist}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hip:</Text>
          <TextInput
            style={styles.input}
            value={trouserHip}
            onChangeText={setTrouserHip}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Thigh:</Text>
          <TextInput
            style={styles.input}
            value={thigh}
            onChangeText={setThigh}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Knee:</Text>
          <TextInput style={styles.input} value={Knee} onChangeText={setKnee} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bottom:</Text>
          <TextInput
            style={styles.input}
            value={bottom}
            onChangeText={setBottom}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Knee</Text>
          <TextInput style={styles.input} value={Knee} onChangeText={setKnee} />

          <Text style={styles.label}>Knee</Text>
          <TextInput style={styles.input} value={Knee} onChangeText={setKnee} />
        </View> */}

        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Soulder</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Bust</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Waist</Text>
          </View>
        </View>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Hips</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Bottom</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Length</Text>
          </View>
        </View>
        <Text style={styles.container3}>Sleeves </Text>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Length</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Opening</Text>
          </View>
        </View>
        <Text style={styles.container3}>Bottom(Inches)</Text>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Waist</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Rise</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Hips</Text>
          </View>
        </View>
        <View style={styles.customContainer}>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Thigh</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Inseam</Text>
          </View>
          <View style={styles.inputBox}>
            <KeyboardAvoidingView>
              <TextInput style={styles.inputCustom} />
            </KeyboardAvoidingView>
            <Text style={styles.inputBoxText}>Leg Opening</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btn2} onPress={handleNavigate}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.19,
    // shadowRadius: 5.62,
    // elevation: 6,
    // flex: 1,
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
