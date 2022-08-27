import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../../AppTheme/customStyles";


export default function DrawerBottom ({onContactPress, onPreviousPress}) {

    return (
    <View
    style={styles.container}
    >
        
               
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={onPreviousPress}
                >
                    <View
                    style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",  alignSelf: "flex-start"}}
                    >

                    
                    <Ionicons name="newspaper-outline" style={[styles.iconSize]} />


                        <Text
                    style={[styles.normalText, {color: customStyles.secondPrimaryColor}]}
                    >{"Previus Task"}</Text>
                    </View>

                    </TouchableOpacity>



                    <TouchableOpacity activeOpacity={0.7}
                    onPress={onContactPress}
                style={[styles.buttonsView,]}>
                    <View
                    style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",  alignSelf: "flex-start"}}
                    >

                   
                    <Ionicons name="help-buoy" style={[styles.iconSize]} />
                    


                        <Text
                    style={[styles.normalText, {color: customStyles.secondPrimaryColor}]}
                    >{"Contact support"}</Text>
                    </View>

                    </TouchableOpacity>



                    {/* Go offline button */}
                    {/* <TouchableOpacity activeOpacity={0.7}
                style={[styles.offlineButton, {backgroundColor: customStyles.negativeColor}]}>
                    <Text
                    style={[styles.ButtonText, {color: customStyles.white,}]}
                    >{"Go Offline"}</Text>
                </TouchableOpacity>
                     */}
                

    </View>
    )
    
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const styles = EStyleSheet.create({
    container: {
    
      width: "100%",
      // padding: "5%",
      // paddingVertical: "5%",
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
        minWidth: "90%",
        alignItems: "center"
    }
  });