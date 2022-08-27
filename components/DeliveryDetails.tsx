import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {View, Text, Dimensions, Modal, ScrollView, TouchableOpacity} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import customStyles from "../AppTheme/customStyles";
import Empty from "../navigation/Empty message/Empty";
import DrivingABikeLotte from "../assets/lottie/DrivingABikeLottie.json"

import LottieView from 'lottie-react-native';
import { Rider } from "../src/Types/Modals";
import { useNavigation, useRoute } from "@react-navigation/native";
import SliderButton from "../components/SliderButton";
import OnlineStatusButton from "../components/OnlineStatusButton";
// import FoodPreparingTime from "./Components/FoodPreparingTime";


export default function DeliveryDetails ({
  details, 
widgetColor,
widget1firstTitle, 
widget1firstText, 
widget1firstIcon, 
widget1secondText, 
widget1secondIcon, 
widget1thridText, 
widget1thridIcon, 
onWidget1thridText,
mainButtonColor,
widget1firstButtonText,
widget1firstButtonIcon,
 mainButtonText,
 mainButtonIcon,
  widget2Title,
  widget2firstText,
  widget2firstIcon, 
  widget2firstButtonText,
  widget2firstButtonIcon,
  onMainButtonPress,
  onLastButtonPress,
  onFirstButtonPress,

}) {


    const navigation = useNavigation();





// useEffect(() => {
//  setRider(route.params?.data)
// },[rider?.onlineStatus])




return (
  <>


        <>
        <View
        style={[styles.widgetView, {marginVertical: "0%", paddingTop: "0%"}]}
        >   
            <View
            
            style={{alignItems: "center"}}>

             <Text
                style={styles.title}
                >{widget1firstTitle}</Text>
            </View>



                <View style={[styles.separator, {backgroundColor: "rgba(0,0,0,0)"}]}/>
                
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                <Text
                style={styles.title}
                >{widget1firstText}
                </Text>

                <Ionicons name={widget1firstIcon} style={styles.icon} />

                </View>

                <View style={styles.separator}/>

                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                <Text
                style={styles.discraption}
                >{widget1secondText}
                </Text>

                <Ionicons name={widget1secondIcon} style={[styles.icon, {color: customStyles.negativeColor}]} />
                </View>



                <View style={styles.separator}/>


                <TouchableOpacity
                onPress={onWidget1thridText}
                activeOpacity={0.5}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                <Text
                style={styles.title}
                >{widget1thridText}
                </Text>

                <Ionicons name={widget1thridIcon} style={styles.icon} />
                </TouchableOpacity>

                <View style={styles.separator}/>

                

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={onFirstButtonPress}
                style={styles.button}
                >
                <Text
                style={[styles.title,]}
                >{widget1firstButtonText}</Text>
                 <Ionicons name={widget1firstButtonIcon} style={styles.icon} />
                </TouchableOpacity>
       </View>

       <OnlineStatusButton 
  buttonText={mainButtonText} 
  status={true} 
  trueColor={customStyles.primaryColor}
  falseColor={customStyles.negativeColor}
  onPress={onMainButtonPress}
  />




       <View
        style={[styles.widgetView]}
        >   
            <View
            
            style={{alignItems: "center"}}>

             <Text
                style={styles.title}
                >{widget2Title}</Text>
            </View>
                <View style={[styles.separator, {backgroundColor: "rgba(0,0,0,0)"}]}/>



                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                <Text
                style={styles.title}
                >{widget2firstText}
                </Text>

                <Ionicons name={widget2firstIcon} style={styles.icon} />

                </View>

                <View style={styles.separator}/>

                

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={onLastButtonPress}
                style={styles.button}
                >
                <Text
                style={[styles.title,]}
                >{widget2firstButtonText}</Text>
                 <Ionicons name={widget2firstButtonIcon} style={styles.icon} />
                </TouchableOpacity>
       </View>
       </>

      </>
)

};


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
  mainView: {
    padding: "5%",
    backgroundColor: customStyles.widgetColor,
  },
  widgetView: {
    marginVertical: "5%",
    backgroundColor: customStyles.primaryBackgroundColor,
    padding: "3.5%",
    borderRadius: "10rem"
  },
  title: {
    fontSize: "16rem",
    fontWeight: customStyles.fontWeight,
    color: customStyles.secondPrimaryColor,
    opacity: 0.8,
    // marginVertical: "5rem"
  },
  discraption: {
    fontSize: "14rem",
    width: "85%",
    color: customStyles.whiteGray,
    fontWeight: customStyles.fontWeight,
    
  }, 
  button: {
    marginHorizontal: "20rem",
    backgroundColor: customStyles.widgetColor, 
    padding: "5%",
    borderRadius: "10rem",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
},
separator: {
    paddingVertical: "2rem",
    marginVertical: "10rem",
   marginHorizontal: "-10%",
    width: '150%',
    backgroundColor: customStyles.widgetColor,
    // opacity: 0.05,
  },
  icon: {
    fontSize: "25rem",
    color: customStyles.secondPrimaryColor,

  }, 
  modal: {
      justifyContent: "center", 
      alignContent: "center", 
      alignItems: "center", 
      backgroundColor: "red", 
      flex: 1,
  },
  lottie: {
    width: "100%",
    height: "200rem",
    backgroundColor: customStyles.primaryBackgroundColor,
    
    marginBottom: "-5%"
  }, 
  titleNoTask: {
    fontWeight: customStyles.fontWeight, 
    fontSize: "22rem", 
    color: customStyles.secondPrimaryColor,
    paddingVertical: "20rem",
    paddingHorizontal: "5%",
    textAlign: "center",
    alignSelf: "center"
   },
   linkView: {
    alignItems: "center",
    paddingVertical : "10rem",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "15%",
  },


  linkText: {
      color: customStyles.whiteGray,
      fontSize: "15rem",
  },

  applyText: {
      color: customStyles.primaryColor,
      fontSize: "15rem",
  }
});