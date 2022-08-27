import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
// import styles from "./styles";
// import MenuButton from "../../components/MenuButton/MenuButton";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import customStyles from "../../AppTheme/customStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import DrawerBottom from "./Components/DrawerBottom";
import DrawerHeader from "./Components/DrawerHeader";
import GoOfflineButton from "./Components/GoOfflineButton";

import DrivingABikeLotte from "../../assets/lottie/DrivingABikeLottie.json"

import LottieView from 'lottie-react-native';
import FoodPreparingTime from "./Components/FoodPreparingTime";
import { useNavigation } from "@react-navigation/native";


export default function DrawerContainer({tasks, userOnline}) {

  const status = "picking"
  const pickTime = "10:12"
  const deliverTime = "10:33"
  const [online, setOnline] = useState(false)

  const navigation = useNavigation();

  const LottieRef = React.useRef(null);
  
  useEffect(() => {
    console.log(`offline: ${userOnline}`)
    if(userOnline) {
      console.log("play")
      LottieRef?.current?.play()
    }

    setOnline(userOnline)
    
  },[userOnline])


  async function online_status_request (locationNow: Object | null, workingStatus: Number | null, onlineStatus: String) {

    
        
    // console.log("here we got")
    const function_name = "online_status_request"
    try{
        await fetch('http://192.168.0.6:5000/onlineStatus', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //  body: JSON.stringify({
        //   "name": "jae"
        // }),
         
        body: JSON.stringify({
             "locationNow": locationNow,
             "workingStatus" : workingStatus,
             "onlineStatus" : onlineStatus,
             "email": rider?.email,
             "password": rider?.password
         })

      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        if(responseJson.empty) {
           
        } else {
            console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
        }
        // console.log(`here is the response: ${responseJson}`)
      })

    } catch(error){
        console.log(`error in ${function_name}, ${error}`)
    } 
    

}

  
  // const { navigation } = props;
  return (
    <>

    <DrawerHeader tasks={tasks}/>

    <View style={styles.content} >
       

    <View
    style={{ width: "100%",
    paddingHorizontal: "2.5%"}}>

       <ScrollView 
       showsVerticalScrollIndicator={false}
       scrollEnabled={tasks ? false : true}
    >
      {tasks ?   <>
       {/* Order number */}
       <View
       style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}
       >
 
 <View
       style={{flexDirection: "row", alignItems: "center"}}
       >
         <Octicons name="package" style={[styles.iconSize, {marginRight: "5%",}]} />
 
         <Text
       style={styles.heading}>{"Order"}</Text>
 
       </View>
 
       <Text
       style={styles.heading}>{"#876"}</Text>
 
       </View>
     
 
 <View
       style={styles.divider}
       />

    
 
 
 {/* NOTE */}
 <View
       style={{flexDirection: "row", alignItems: "center",}}
       >
            <FontAwesome name="sticky-note-o" style={[styles.iconSize, {marginRight: "2.5%",}]} />
 
         <Text
       style={styles.heading}>{"Note"}</Text>
 
       </View>
       <View
       style={{marginBottom: "5%"}}
       >
       <Text
       style={styles.subHeadding}>{"Please ship the order carfully and watch out spelling the food... so that the food ships in good condition"}</Text>
 
       </View>
 
 
       <View
       style={styles.divider}
       />
         
 
         {/* Address */}
         <View
       style={{flexDirection: "row", alignItems: "center",}}
       >
           <Ionicons name="md-location-outline" style={[styles.iconSize]} />
 
         <Text
       style={styles.heading}>{"Address"}</Text>
 
       </View>
       <View
       style={{marginBottom: "5%"}}
       >
       <Text
       style={styles.subHeadding}>{"Alkulan polku 7 F 110"}</Text>
 
       </View>
 
 <View
       style={styles.divider}
       />
 
 
       {status !== "picking" ? <Timeline pickTime={pickTime} deliver={deliverTime}/> : <FoodPreparingTime pickTime={pickTime}/>}
 
 <View
       style={styles.divider}
       />
 
       <DrawerBottom/>
       </>
    
    : 
    <>
    <LottieView

         autoPlay={false}
         ref={LottieRef}
         style={styles.lottie}
         source={DrivingABikeLotte}
         // OR find more Lottie files @ https://lottiefiles.com/featured
         // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
       />
       <Text
    style={styles.title}
    >{online ? "Looking for tasks" : "Go online in order to start getting orders from vendors :)."}</Text>
    </>
    }
      
    
     
    </ScrollView>
      </View>   

        

    </View>

    
   

    {!tasks && <DrawerBottom onContactPress={() => navigation.navigate("support")}  onPreviousPress ={() => {navigation.navigate("DeliveryInfo")}} />}
    <GoOfflineButton online={online} onPress={online_status_request(null, null, "offline")} />

    
    
    </>
  );
}

// DrawerContainer.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }),
// };


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
  locationIcon: {
    width: "30rem",
    height: "30rem"
  },
  title: {
   fontWeight: customStyles.fontWeight, 
   fontSize: "25rem", 
   color: customStyles.secondPrimaryColor,
   paddingVertical: "20rem",
   paddingHorizontal: "2%",
   textAlign: "center",
   alignSelf: "center"
  },
  divider: {
    width: "200%", 
    height: "0.3%", 
    backgroundColor: customStyles.dividerColor, 
    marginVertical: "8%",
    alignSelf: "center"
  },
  heading: {
    color: customStyles.secondPrimaryColor, 
    fontSize: "19rem" ,
    fontWeight: customStyles.fontWeight, 
   
  }, 

subHeadding: {
    color: customStyles.secondPrimaryColor, 
    fontSize: "14rem",
},

lottie: {
  width: "100%",
  height: "200rem",
  backgroundColor: customStyles.primaryBackgroundColor,
  marginRight: "10%",
  marginBottom: "-5%"
}, 

});
