import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../../AppTheme/customStyles";


export default function DrawerTask () {

    return (
    <View
    style={styles.container}
    >
                    {/* Go offline button */}
                    <TouchableOpacity activeOpacity={0.7}
                style={[styles.offlineButton, {backgroundColor: customStyles.primaryColor}]}>
                    <Text
                    style={[styles.ButtonText, {color: customStyles.white,}]}
                    >{"Header here"}</Text>
                </TouchableOpacity>
                    
                
    </View>
    )
    
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const styles = EStyleSheet.create({
    container: {
      position: "absolute",
      padding: "2.5%",
      alignSelf: "center",
      top: "5%",
      
      //opacity: 0.3,
    },
    buttonsView: {
      marginBottom: "5%",
    },

    iconSize: {
      fontSize: "30rem",
      color: customStyles.secondPrimaryColor,
      padding: "2.5%",
    },

    ButtonText: {
      color: customStyles.white, 
      fontSize: "20rem" ,
      fontWeight: customStyles.fontWeight,
    }, 

    normalText: {
        fontSize: "15rem",
        color: customStyles.secondPrimaryColor, 
    },

    heading: {
        color: customStyles.secondPrimaryColor, 
        fontSize: "19rem" ,
        fontWeight: customStyles.fontWeight, 
        maxWidth: 200
      }, 

    subHeadding: {
        color: customStyles.secondPrimaryColor, 
        fontSize: "14rem",
        maxWidth: 200
    },

    offlineButton: {
        paddingVertical: "3%",
        marginVertical: "3%",
        padding: "2%",
        borderRadius: "10rem",
        minWidth: "100%",
        alignItems: "center"
    }
  });