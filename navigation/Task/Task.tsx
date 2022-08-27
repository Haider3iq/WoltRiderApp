import React from "react";
import { View, Text, Dimensions, Appearance, TouchableOpacity, Image} from "react-native";
import colors from "../../AppTheme/customStyles"
import EStyleSheet from "react-native-extended-stylesheet";
import { Entypo } from "@expo/vector-icons";
import customStyles from "../../AppTheme/customStyles";






export default function Task ({customerData, ResturantData}) {



    return (
        <View
        style={styles.container}
        >

           {customerData !== null || customerData !== undefined && <View style={{
                alignSelf: "center",
                backgroundColor: customStyles.primaryColor,
                marginBottom: -10,
                zIndex: 1,
                paddingHorizontal: "5%",
                padding: "2%",
                borderRadius: 20
            }}
            >
                <Text
                style={{color: customStyles.secondPrimaryColor, fontSize: 20 ,fontWeight: customStyles.fontWeight, maxWidth: 200}}
                >{"3.5 KM"}</Text>
            </View>}


          <TouchableOpacity activeOpacity={0.7}  style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              backgroundColor: customStyles.primaryBackgroundColor,
              padding: "5%",
              borderRadius: 20,
          }}>

            {/* first button */}
            <View style ={{
                
                }}>
            <Text numberOfLines={2} style={styles.heading}
            > {customerData !== null && customerData !== undefined ? "Customer Name here" : "Resturant Name here"}</Text>

            <Text style={styles.subHeadding}
            >{"address of resturant here"}</Text>

            <View style={{paddingTop: "8%"}}>
            <Text numberOfLines={2} style={styles.heading}
            >{customerData !== null && customerData !== undefined ? "Delivery distance" : "Delivering to"}</Text>

             {/* customer address or distance */}
            <Text numberOfLines={2}  style={styles.subHeadding}
            >{"customer address here"}</Text>
            </View>
            
            </View>

        
            

            <View>
            <Image style={styles.locationIcon} source={ customerData !== null || customerData !== undefined ? customStyles.customerPng : customStyles.resturantPng} />
            </View>


            {/* second button */}
            {/* <View style={styles.button1}>
            <Text style={styles.buttonText}>
              {"Where to?"}
            </Text>
            </View> */}

            
            
          </TouchableOpacity>

          
          <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: "4%", marginBottom: "2%"}}>
                <TouchableOpacity activeOpacity={0.7}
                style={[styles.buttons, {backgroundColor: customStyles.negativeColor}]}>
                    <Text
                    style={[styles.ButtonText, {color: customStyles.white}]}
                    >{"Cancel"}</Text>
                </TouchableOpacity>
                


                <TouchableOpacity activeOpacity={0.7}
                style={[styles.buttons, {backgroundColor: customStyles.primaryBackgroundColor}]}>
                    <Text
                    style={[styles.ButtonText, {color: customStyles.primaryColor}]}
                    >{"Take"}</Text>
                </TouchableOpacity>
            </View>

        {/* endView */}
        </View>   
    );
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const styles = EStyleSheet.create({
    container: {
      width: "80%",  
      position: "absolute",
      padding: "2.5%",
      backgroundColor: customStyles.primaryColor,
      alignSelf: "center",
      bottom: "50%",
      borderRadius: "18rem",
      //opacity: 0.3,
    },
    buttonView: {
      borderRadius: "100rem",
      backgroundColor: "#F766AD",
      flexDirection: "row",

    },

    iconSize: {
      fontSize: "30rem",
      color: colors.primaryColor,
      padding: "2.5%",
    },

    ButtonText: {
      color: customStyles.white, 
      fontSize: "20rem" ,
      fontWeight: customStyles.fontWeight,
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

    buttons: {
        paddingVertical: "3%",
        padding: "2%",
        borderRadius: "10rem",
        minWidth: "45%",
        alignItems: "center"
    }
  });
  