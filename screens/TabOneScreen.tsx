import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity,  } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 

import EStyleSheet from 'react-native-extended-stylesheet';

import  MapView, { Polyline, Marker, Polygon, Animated, AnimatedRegion, } from 'react-native-maps';

import EditScreenInfo from '../components/EditScreenInfo';

import LottieView from 'lottie-react-native';

import carLottie from "../assets/lottie/carLottie.json"
import carAnimation from "../assets/lottie/carAnimation.json"


//asstes
import Locations from "../assets/testData/Locations.json";
import CustomerHouse from "../assets/images/CustomerHouse.png";
import darkMapStyle from "../assets/darkMapStyle.json"

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default function TabOneScreen() {

  const [start, setStart] = useState(false);

  


  



  
    return (
    
      <View 
      style={styles.container}
      >
        <View
      style={styles.topNotch}
      />

      <Text
          style={styles.workingStatusTitle}
          >
        {"Working status"}
      </Text>

      <Text
          style={styles.workingStatusDes}
          >
        {"you are currently not working"}
      </Text>

      

      <View
      style={styles.divider}
      />



      <View
      style={styles.iconAndTextView}
      >
      <View
      style={{flexDirection: "row"}}
      >
         <MaterialIcons name="support" size={30} color="black" style={{marginRight: "5%"}} />

      <Text
          style={styles.workingStatusDes}
          >
        {"Any issue? contact support!"}
      </Text>

      </View>

      <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />

      </View>


      <View
      style={styles.divider}
      />


<View
      style={styles.iconAndTextView}
      >
      <View
      style={{flexDirection: "row"}}
      >
         <MaterialIcons name="support" size={30} color="black" style={{marginRight: "5%"}} />

      <Text
          style={styles.workingStatusDes}
          >
        {"Any issue? contact support!"}
      </Text>

      </View>

      

      <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />

      </View>


      <View
      style={styles.divider}
      />

      <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        
      }}
      >
     

      <View
      style={styles.startWorkingView}
      >
        <Text
        style={styles.startWorkingNow}
        >{"Start working now"}</Text>

<MaterialIcons name="support" size={30} color="black" style={{marginRight: "5%"}} />

      </View>

      {/* <LottieView

         autoPlay
         style={styles.lottie}
         source={carAnimation}
         // OR find more Lottie files @ https://lottiefiles.com/featured
         // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
       /> */}

       

      </View>
      

      

      
      

          
        {/* <Text>{"You have to allow location"}</Text> */}
      </View>
    )
   




}

const styles = EStyleSheet.create({
  container: {
    // height: "100%",
    // width: "100%",
    borderTopEndRadius: "20rem",
    borderTopStartRadius: "20rem",
    flex: 1,
    alignItems: 'flex-start',
    
    paddingBottom : "8%",
    backgroundColor: "lightgreen",
    paddingHorizontal: "5%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  containerView: {
    width: "100%",
    aspectRatio: 1/1,
  },
  workingStatusTitle: {
    fontSize: "28rem",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.8)"
  },
  workingStatusDes: {
    fontSize: "15 rem",
    fontWeight: "bold",
    color: "white",
    marginVertical: "2%",
  },
  iconAndTextView: {
    flexDirection: "row",
    alignItems: "center",
    
    width: "100%",
    justifyContent: "space-between",
    

  }, 
  divider: {
    width: "200%", 
    height: "0.2.5%", 
    backgroundColor: "rgba(0,0,0,0.3)", 
    marginVertical: "5%",
    alignSelf: "center"
  },

  startWorkingNow: {
    fontSize: "20rem",
    fontWeight: "bold",
    color: "white",
  },

  startWorkingView: {
    borderColor: "white", 
    borderWidth: "2rem", 
    borderRadius: "200rem",
    padding: "5%",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row"
    
  },
  lottie: {
    width: "60rem",
    height: "100rem",
    backgroundColor: "white",
    marginRight: "10%",
    marginBottom: "-5%"
  }, 
  topNotch: {
    height: "1%",  
    marginTop: "3%",
    marginVertical: "5%", 
    backgroundColor: "white", 
    width: "10%", 
    alignSelf: "center", 
    borderRadius: "100rem"
  }

});
