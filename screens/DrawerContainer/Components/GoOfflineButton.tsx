import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../../AppTheme/customStyles";


export default function GoOfflineButton ({online, onPress}) {

    return (
    <View
    style={styles.container}
    >
                    {/* Go offline button */}
                    <TouchableOpacity activeOpacity={0.7}
                    onPress={onPress}
                style={[styles.offlineButton, {backgroundColor: online === "online" ? customStyles.negativeColor : customStyles.primaryColor}]}>
                    <Text
                    style={[styles.ButtonText, {color: customStyles.white}]}
                    >{online === "online" ? "Go Offline" : "Go Online"}</Text>
                </TouchableOpacity>
                    
                

    </View>
    )
    
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const styles = EStyleSheet.create({
    container: {
        marginBottom: "10%",
        marginHorizontal: "5%"
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

    offlineButton: {
        paddingVertical: "3%",
        marginVertical: "3%",
        padding: "2%",
        borderRadius: "10rem",
        minWidth: "90%",
        alignItems: "center"
    }
  });