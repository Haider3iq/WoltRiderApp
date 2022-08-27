import React from "react";
import {Dimensions, Text, View} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../AppTheme/customStyles";


export default function TextInput () {

    return(
        <View
        style={{
            width: "100%",
            height: "20%",
            position: "absolute",
            backgroundColor: "white",
        }}
        >
            <TextInput 

            />
        </View>
    )
}



const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
  container: {
    paddingTop: "2%",
    borderRadius: "20rem",
    flexGrow: 1,
    backgroundColor: customStyles.primaryBackgroundColor,
    marginBottom: "50rem",
    
  },

  messageView: {
        backgroundColor: customStyles.secondPrimaryColor,
        minWidth: "auto",
        maxWidth: "80%",
        borderRadius: "10rem",
        marginVertical: "2%",
        paddingHorizontal: "2%",
        paddingVertical: "3.5%",
  },
  userImage: {
    width: "10%",
    aspectRatio: 1/1,
    borderRadius: "10rem",
    marginHorizontal: "2%",
  },


  messageText: {
    fontSize: "15rem",
    color: customStyles.primaryBackgroundColor,
    
  },
  timeText: {
    fontSize: "12rem",
    color: customStyles.primaryBackgroundColor,
  }
});