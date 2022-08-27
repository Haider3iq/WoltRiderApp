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




// export default function RiderTask () {

//     return (
//         <View style={styles.mainView}>

//             <View style={styles.containerView}>

            
//                         <View>
//                             <Text
//                             numberOfLines={1}
                            
//                             style={styles.filedHintText}
//                             >
//                                 {"Macdonald's Vaasa asdf  asdf dfdf  sdfdsfds ddere "}
//                             </Text>
//                         </View>

//                         <View>
//                             <Text>
//                                 {"Deliver to"}
//                             </Text>
//                         </View>


//                         <View>
//                             <Text>
//                                 {"AlkulanPolku 7 F 10"}
//                             </Text>
//                         </View>


//                         <View>
//                             <Text>
//                                 {"Ready at"}
//                             </Text>
//                         </View>



//                         <View>
//                             <Text>
//                                 {"10:10 PM"}
//                             </Text>
//                         </View>

//                         <View>
//                             <Text>
//                                 {"Distance"}
//                             </Text>
//                         </View>



//                         <View>
//                             <Text>
//                                 {"1.66 km"}
//                             </Text>
//                         </View>

//                         <View
//                         style={{marginVertical: "0%"}}
//                         >
//                         <OnlineStatusButton status={true} onPress={undefined} buttonText={"Take task"} trueColor={customStyles.primaryColor} falseColor={undefined} minWidth={"60%"}/>
//                         </View>
//             </View>


//         </View>
//     )
// };


// const entireScreenWidth = Dimensions.get('window').width;
// EStyleSheet.build({$rem: entireScreenWidth / 380});

// const styles = EStyleSheet.create({

// mainView: {
//     backgroundColor: "rgba(0,0,0,0.1)",
//     position: "absolute",
//     // padding: "5%",
//     // borderRadius: "10rem",
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center"
// },

// containerView: {
//     backgroundColor: customStyles.taskBackgroundColor,
//     padding: "5%",
// },

// linkText: {
//     color: customStyles.whiteGray,
//     fontSize: "15rem",
// },

// applyText: {
//     color: customStyles.primaryColor,
//     fontSize: "15rem",
// },
// title: {
//     fontSize: "20rem",
//     width: "95%",
//     fontWeight: customStyles.fontWeight,
//     color: customStyles.secondPrimaryColor,
//     opacity: 0.8,
//     // marginVertical: "5rem"
//   },
//   discraption: {
//     fontSize: "14rem",
//     width: "85%",
//     color: customStyles.whiteGray,
//     fontWeight: customStyles.fontWeight,
    
//   }, 

// });





// import FoodPreparingTime from "./Components/FoodPreparingTime";


export default function RiderTask ({
  details, 
widgetColor,
widget1firstTitle, 
widget1firstText, 
widget1firstIcon, 
widget1secondText, 
widget1secondIcon, 
widget1thridText, 
widget1thridIcon, 
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
  widget1firstButtonPress,
  onTopButtonPress,
  timerValue

}) {


    const navigation = useNavigation();


// useEffect(() => {
//  setRider(route.params?.data)
// },[rider?.onlineStatus])




return (
  <>

        
        <View
        style={styles.mainView}
        >
            {/* <View
        style={{
        backgroundColor: customStyles.white, 
        width: entireScreenWidth / 8, 
        height: entireScreenWidth / 8 ,
        alignSelf: "center", 
        position: "absolute", 
        top: "-6%", 
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        }}
        >
            <Text
            style={[styles.filedActuleText, {color: customStyles.primaryColor}]}
            >{"15"}</Text>
        </View> */}

        <TouchableOpacity
        activeOpacity={0.8}
        onPress={onTopButtonPress}
        style={{
        backgroundColor: customStyles.white, 
        height: entireScreenWidth / 8 ,
        alignSelf: "center", 
        position: "absolute", 
        top: "-6%", 
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "6%",
        borderRadius: 100,
        flexDirection: "row",
        }}
        >
            <Text
            style={[styles.filedActuleText, {color: customStyles.primaryColor}]}
            >{timerValue}</Text>
            <Text
            style={[styles.filedActuleText, {color: customStyles.primaryColor}]}
            >{"  Skip Delivery"}</Text>
            <Ionicons name="ios-arrow-forward-circle" style={[styles.icon, {color: customStyles.negativeColor}]} />


        </TouchableOpacity>
        <View
        style={styles.widgetView}
        >   
            {widget1firstTitle && <>
            <View style={{alignItems: "center"}}>

             <Text
                style={styles.title}
                >{widget1firstTitle}</Text>
            </View>

            <View style={[styles.separator, {backgroundColor: "rgba(0,0,0,0)"}]}/>
            </>}


                
                {widget1firstText && <>
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                <View>
                    <Text
                    style={styles.filedHintText}
                    >{"Deliver to"}
                    </Text>

                    <Text
                    style={styles.filedActuleText}
                    >{widget1firstText}
                    </Text>

                </View>

                

                <Ionicons name={widget1firstIcon} style={styles.icon} />

                </View>

                <View style={styles.separator}/>
                </>}



                {widget1secondText !== "0" && <>
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                

                <View>
                    <Text
                    style={styles.filedHintText}
                    >{"Ready At"}
                    </Text>

                    <Text
                    style={styles.filedActuleText}
                    >{widget1secondText}
                    </Text>

                </View>

                <Ionicons name={widget1secondIcon} style={[styles.icon, {color: customStyles.successColor}]} />
                </View>



                <View style={styles.separator}/>
                </>}

               {widget1thridText && <>
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                

                <View>
                    <Text
                style={styles.filedHintText}
                >{"Distance"}
                </Text>

                    <Text
                    style={styles.filedActuleText}
                    >{widget1thridText}
                    </Text>

                </View>

                <Ionicons name={widget1thridIcon} style={styles.icon} />
                </View>

                {widget1firstButtonText && <View style={styles.separator}/>}
                </>}

                

                {widget1firstButtonText && <TouchableOpacity
                activeOpacity={0.7}
                onPress={widget1firstButtonPress}
                style={[styles.button, {backgroundColor: customStyles.negativeColor,}]}
                >
                <Text
                style={[styles.buttonText, {color: "white"}]}
                >{widget1firstButtonText}</Text>
                 <Ionicons name={widget1firstButtonIcon} style={[styles.icon, {color: "white"}]} />
                </TouchableOpacity>}

                {mainButtonText && <TouchableOpacity
                activeOpacity={0.7}
                onPress={onMainButtonPress}
                style={[styles.button, {backgroundColor: customStyles.successColor, marginTop: (!widget1firstButtonText ? "8%" : "2.5%"),}]}
                >
                <Text
                style={[styles.buttonText, {color: customStyles.white}]}
                >{mainButtonText}</Text>
                 <Ionicons name={mainButtonIcon} style={[styles.icon, {color: customStyles.white}]} />
                </TouchableOpacity>}


                <View
            style={styles.linkView}
            >
                <Text
                style={styles.linkText}
                >
                    {"Facing an issue ? "}
                </Text>

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={widget1firstButtonPress}
                >
                <Text
                style={styles.applyText}
                >
                {"Contact support"}
                </Text>

                </TouchableOpacity>


            </View>
       </View>

       
      


      {/* {mainButtonText && <OnlineStatusButton 
  buttonText={mainButtonText} 
  status={true} 
  trueColor={customStyles.primaryColor}
  falseColor={customStyles.negativeColor}
  textColor
  onPress={onMainButtonPress}
  />} */}

       </View>

      </>
)

};


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
  mainView: {
    
    // backgroundColor: customStyles.successColor,
    // position: "absolute",
    padding: "5%",
    width: "100%",
    borderRadius: "20rem",
    // height: "100%",
  },
  widgetView: {
    marginVertical: "5%",
    backgroundColor: customStyles.primaryBackgroundColor,
    padding: "3.5%",
    borderRadius: "10rem"
  },
  title: {
    fontSize: "20rem",
    fontWeight: customStyles.fontWeight,
    color: customStyles.secondPrimaryColor,
    opacity: 0.8,
    // marginVertical: "5rem"
  },

  filedHintText: {
    fontSize: "14rem",
    fontWeight: customStyles.fontWeight,
    color: customStyles.whiteGray,
    opacity: 0.8,
    // marginVertical: "5rem"
  },
  filedActuleText: {
    fontSize: "17rem",
    fontWeight: customStyles.fontWeight,
    color: customStyles.taskSecondColor,
    opacity: 0.8,
    // marginVertical: "5rem"
  },

  buttonText: {
    fontSize: "16rem",
    
  },

  button: {
    
    backgroundColor: customStyles.widgetColor, 
    padding: "5%",
    
    borderRadius: "10rem",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
},
separator: {
    paddingVertical: "0.5rem",
    marginVertical: "15rem",
    marginHorizontal: "-10%",
    width: '200%',
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
    paddingVertical : "15rem",
    justifyContent: "center",
    flexDirection: "row",
   
  },


  linkText: {
      color: customStyles.whiteGray,
      fontSize: "15rem",

  },

  applyText: {
      color: customStyles.primaryColor,
      fontSize: "14rem",
      fontWeight: customStyles.fontWeight
  },
});