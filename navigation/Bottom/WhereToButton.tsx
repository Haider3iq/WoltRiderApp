import React from "react";
import { View, Text, Dimensions, Appearance, TouchableOpacity} from "react-native";
import customStyles from "../../AppTheme/customStyles"
import EStyleSheet from "react-native-extended-stylesheet";
import { Ionicons } from "@expo/vector-icons";






export default function WhereToButton ({onPress,}) {

    return (
        <View
        style={styles.container}
        >


          <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.buttonView, {opacity: 1}]}>

            {/* first button */}
            <View style={styles.button1}>
            
            <Text style={styles.buttonText}>
              {"Where to?"}
            </Text>
            
            {/* <Ionicons name={"ios-restaurant"} style={styles.icon} /> */}


            </View>


            {/* second button */}
            {/* <View style={styles.button1}>
            <Text style={styles.buttonText}>
              {"Where to?"}
            </Text>
            </View> */}
            
          </TouchableOpacity>

          


        {/* endView */}
        </View>   
    );
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const styles = EStyleSheet.create({
    container: {
      position: "absolute",
      marginHorizontal: "0%",
      alignItems: 'flex-start',
      right: "-2.5%",
      bottom: "10%",
      
    },
    buttonView: {
      marginTop: "15rem",
      flexDirection: "row",
      justifyContent: "space-between"
    }, 

    buttonText: {
      fontSize: "20rem",
      fontWeight: "bold",
      color: customStyles.primaryColor,
      paddingVertical: "2%",
      padding: "5%",
    },

    button1: {
      backgroundColor: customStyles.primaryBackgroundColor,
      borderRadius: "10rem",
      minWidth: "40%",
      alignItems: "center",
      paddingVertical: "10rem",
      marginHorizontal: "5rem",
    },
    icon: {
      fontSize: "25rem",
      color: customStyles.secondPrimaryColor,
  
    }, 

  
  });
  