import React, { useLayoutEffect } from "react";
import { Dimensions, View, Text } from "react-native";
import PropTypes from "prop-types";
// import styles from "./styles";
// import MenuButton from "../../components/MenuButton/MenuButton";
import { FontAwesome, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import customStyles from "../../../AppTheme/customStyles";
import EStyleSheet from "react-native-extended-stylesheet";



export default function FoodPreparingTime ({pickTime}) {

    
    return (
<>
              {/* TimeLIne */}
              <View
      style={{flexDirection: "row", alignItems: "center",}}
      >
          {/* <Ionicons name="time-outline" style={[styles.iconSize]} /> */}

        <Text
      style={styles.heading}>{"Food Preparing"}</Text>

      </View>
      <View
      style={{marginBottom: "5%"}}
      >
      </View>

      {/* Time 1 */}
      <View
      style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "20%", paddingLeft: "15%"}}
      >

<View
      style={{flexDirection: "row", alignItems: "center",}}
      >
        <Ionicons name="ios-fast-food-outline"style={[styles.iconSize, {marginRight: "5%",}]} />

        <Text
      style={styles.heading}>{"Ready"}</Text>

      </View>

      <Text
      style={styles.heading}>{pickTime}</Text>

      </View>
      </>
)
}



const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconSize: {
    //Delete 
    fontSize: "25rem",
    color: customStyles.secondPrimaryColor,
    padding: "2.5%",
  },


  divider: {
    width: "200%", 
    height: "0.3%", 
    backgroundColor: customStyles.dividerColor, 
    marginVertical: "2.5%",
    alignSelf: "center"
  },
  heading: {
    color: customStyles.secondPrimaryColor, 
    fontSize: "19rem" ,
    fontWeight: customStyles.fontWeight, 
    textAlign: "left"
  }, 

subHeadding: {
    color: customStyles.secondPrimaryColor, 
    fontSize: "14rem",
},

});
