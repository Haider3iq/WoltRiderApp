import React from "react";
import {View, Image, Text, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../AppTheme/customStyles";
import { StatusBar } from 'expo-status-bar';
import steeringWheel3 from "../assets/images/steering-wheel3.png"

export default function SplashScreen () {

    return(
        <View
        style={styles.pageView}
        >
            <View style={styles.iconView}>
            <Image
            style={styles.image}
            source={steeringWheel3}
            />
            </View>


<StatusBar style="light" />
        </View>
    )
};


const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
    pageView: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: customStyles.primaryColor,
      }, 
      iconView: {
        
        padding: "2%",
        borderRadius: "20rem",
      },
      image: {
          width: entireScreenWidth/ 2,
          height: entireScreenHeight / 2,
      }
    
})   




       