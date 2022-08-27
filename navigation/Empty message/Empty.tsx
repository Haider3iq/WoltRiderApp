import React from "react";
import { View, Text, Dimensions, Appearance, TouchableOpacity, Image} from "react-native";
import colors from "../../AppTheme/customStyles"
import EStyleSheet from "react-native-extended-stylesheet";
import { Entypo } from "@expo/vector-icons";
import customStyles from "../../AppTheme/customStyles";






export default function Empty ({title, description, icon}) {



    return (
        <View
        style={styles.container}
        >

            {/* first button */}
            <View style ={{
                
                }}>
            <Text numberOfLines={2} style={styles.heading}
            > {title}</Text>

            <Text style={styles.subHeadding}
            >{description}</Text>
          
            </View>

            

          
         

            {/* <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: "4%", marginBottom: "2%"}}>
                <TouchableOpacity activeOpacity={0.7}
                onPress={stayOffline}
                style={[styles.buttons, {backgroundColor: customStyles.primaryBackgroundColor}]}>
                    <Text
                    style={[styles.ButtonText, {color: customStyles.secondPrimaryColor}]}
                    >{"I know"}</Text>
                </TouchableOpacity>
                


                <TouchableOpacity activeOpacity={0.7}
                onPress={onPress}
                style={[styles.buttons, {backgroundColor: customStyles.secondPrimaryColor}]}>
                    <Text
                    style={[styles.ButtonText, {color: customStyles.primaryColor}]}
                    >{"Go Online"}</Text>
                </TouchableOpacity>
            </View> */}

        {/* endView */}
        </View>   
    );
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const styles = EStyleSheet.create({
    container: {
      width: "80%",  
      // position: "absolute",
      padding: "5%",
      backgroundColor: customStyles.primaryBackgroundColor,
      alignSelf: "center",
      // bottom: "50%",
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
        fontSize: "30rem" ,
        fontWeight: customStyles.fontWeight, 
        textAlign: "center",
        marginVertical: "2%",
      }, 

    subHeadding: {
        color: customStyles.secondPrimaryColor, 
        fontSize: "16rem",
        textAlign: "center",
        marginVertical: "5%",
        
    },

    buttons: {
        paddingVertical: "3%",
        padding: "2%",
        borderRadius: "10rem",
        minWidth: "45%",
        alignItems: "center"
    }
  });
  