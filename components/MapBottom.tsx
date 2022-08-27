import React from "react";
import { View, Text, Dimensions, Appearance, TouchableOpacity, Platform} from "react-native";
import customStyles from "../AppTheme/customStyles"
import EStyleSheet from "react-native-extended-stylesheet";
import { Ionicons } from "@expo/vector-icons";






export default function MapBottom ({onPress, name, iconName, text}) {

    return (
        <View
        style={styles.container}
        >


          <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.buttonView, {opacity: 1}]}>

            {/* first button */}
            <View style={styles.button1}>
            
            <Text style={styles.buttonText}>
              {text}
            </Text>
            <View
            style={{
                flexDirection: "row", 
                alignItems: "center"
            }}
            >

            <Text numberOfLines={1} style={styles.nameText}>
              {`${name}`}
            </Text>
            <Ionicons name={iconName} style={styles.icon} />
            </View>
            


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
      right: "1%",
      bottom: (Platform.OS ==="android" ? "10%" : "12%"),
      
    },
    buttonView: {
      marginTop: "15rem",
      flexDirection: "row",
      justifyContent: "space-between",
      
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
      marginHorizontal: "1%",
      paddingHorizontal: "3%",
    },
    icon: {
      fontSize: "25rem",
      color: customStyles.secondPrimaryColor,
  
    }, 
    nameText: {
      fontSize: "16rem",
      fontWeight: "bold",
      
      maxWidth: 260,
      color: customStyles.secondPrimaryColor,
    
      paddingHorizontal: "5%",
    }

  
  });
  