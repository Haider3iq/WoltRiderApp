import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { View, Text, TouchableOpacity, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../AppTheme/customStyles";


export default function Cursor ({online, onPress}) {

    return (
    <View
    style={styles.container}
    >
        
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