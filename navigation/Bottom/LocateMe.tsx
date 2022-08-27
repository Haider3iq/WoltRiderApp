import React from "react";
import { View, Text, Dimensions, Appearance, TouchableOpacity, Platform} from "react-native";
import customStyles from "../../AppTheme/customStyles"
import EStyleSheet from "react-native-extended-stylesheet";
import { Entypo } from "@expo/vector-icons";






export default function RightPanelButton ({onPress}) {

    return (
        <View
        style={styles.container}
        >


          <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.buttonView}>

            {/* first button */}
            <View >
            <Entypo name="location" style={styles.iconSize} />
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
      left: "2.5%",
      bottom: (Platform.OS ==="android" ? "10%" : "13%"),
      //opacity: 0.3,
    },
    buttonView: {
      borderRadius: "100rem",
      backgroundColor: customStyles.primaryBackgroundColor,
    }, 

    iconSize: {
      fontSize: "30rem",
      color: customStyles.primaryColor,
      padding: "2.5%",
    },
  });
  