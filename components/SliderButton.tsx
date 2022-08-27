import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../AppTheme/customStyles";

import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";


export default function SliderButton ({online, onPress}) {

  const [sliderValue, setSliderValue] = useState(0);

  const renderRightView = () => {

    return(
      <View>
        <Text>{"test"}</Text>
      </View>
    )
  }

  useEffect(() => {

  },[])

    return (
      <GestureHandlerRootView>
        <View
        style={{position: "absolute"}}
        >
          <Text
     style={styles.buttonText}
     >{"Go offline"}</Text>
        </View>
      <Swipeable
      
    renderLeftActions={(progress, dragX) => renderRightView()}
     >
    <View
    style={styles.container}
    >
  {/* <Slider
  style={styles.sliderView}
  minimumValue={0}
  maximumValue={1}
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor="#000000"
  onValueChange={it => setSliderValue(it)}
/> */}
    
     {/* <Text
     style={styles.buttonText}
     >{"Go offline"}</Text> */}
     <View
     style={styles.arrowView}
     >
       
     </View>
    </View>
    </Swipeable>
    </GestureHandlerRootView>
    )
    
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const styles = EStyleSheet.create({
    container: {
        marginBottom: "10%",
        marginHorizontal: "5%",
        paddingHorizontal: "20rem",
        backgroundColor: "red",
        width: entireScreenWidth / 1.2, 
        height: entireScreenWidth / 6,
        borderRadius: entireScreenWidth / 14,
        justifyContent: "center",
        alignItems: "center"
    },

    arrowView: {
      width: "60rem", 
      height: "60rem", 
      backgroundColor: "white"
     },

    sliderView: {
    height: "100%",
    width: "100%",
    }, 

    iconSize: {
      fontSize: "30rem",
      color: customStyles.secondPrimaryColor,
      padding: "2.5%",
    },

    buttonText: {
      color: customStyles.white, 
      fontSize: "20rem" ,
      fontWeight: customStyles.fontWeight,
    }, 

    offlineButton: {
        paddingVertical: "3%",
        marginVertical: "3%",
        padding: "2%",
        borderRadius: "10rem",
        minWidth: "90%",
        alignItems: "center"
    }
  });