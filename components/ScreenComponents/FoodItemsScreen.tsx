import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Dimensions} from "react-native";
import customStyles from "../../AppTheme/customStyles";
// import styles from "../../screens/WorkingScreen/WorkingScreenStyles";
import fridge from "../../assets/images/fridge.png";



function testNkd ({onPress, itemsData}) {

    return (
        <View
        style={{
          backgroundColor: customStyles.widgetColor,
          paddingBottom: 100,
        }}
        // alwaysBounceVertical={false}
        >

        

          
          <View
          style={
            [styles.modalView1,]
          }
          >
             <Text
            style={styles.deliveriesTitle}
            >
              {"Delivery's items"}
            </Text>
            
          <Image
          source={fridge}
          style={styles.image1}
          />
          </View>

          <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          style={{
            width: "45%",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: customStyles.primaryBackgroundColor,
            paddingVertical: "2%",
            borderRadius: 20,
          }}
          >
          <Text
              style={[styles.discraption,]}
              >
                {"Hide items"}
              </Text>
          </TouchableOpacity>

          <View
          style={{
            backgroundColor: customStyles.primaryBackgroundColor,
            margin: "2.5%",
            padding: "2.5%",
            borderRadius: 20,
            flex: 1,
            
          }}
          >

            <FlatList
            data={itemsData}
            renderItem={() => <View
              style={{flexDirection: "row", alignItems: "center",}}
              >
            
              <Image
            source={fridge}
            style={styles.image1}
            />
  
           <Text
              style={styles.discraption}
              >
                {"Double cheese burger"}
              </Text>
  
              </View>}

            ListFooterComponent={() => <View style={{width:"100%", backgroundColor: "white", height: "20%", paddingBottom: "30%" }} />}
            />
         
         </View>



         
          
          {/* <View
          style={{backgroundColor: "white", height: "100%", }}
          /> */}


        </View>

    )
}




import {useRoute,} from "@react-navigation/core";
import { useFonts } from "expo-font";
// import { BlurView } from "expo-blur";
// import Chats from "../assets/dummy-data/Chats"
import Payouts from "../../assets/testData/Payouts.json"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import stockMarket from "../../assets/images/stock-market.png";
import moment from "moment";
import { useSelector } from "react-redux";
import { acceptNewTask, skipNewTask } from "../../src/functions";
import NewTaskScreen from "../../components/ScreenComponents/NewTaskScreen";
import { StatusBar } from "expo-status-bar";


export default function FoodItemsScreen ({onPress, itemsData}) {

  const {riderData} = useSelector(state => state.riderReducer)

  // const [messages, setMessages] = useState<MessageModel[]>([]);
  const route  = useRoute(); 

  const [date, setDate] = useState(route.params?.date)
  const [riderID, setRiderID] = useState(riderData?.id)
  const [delivered, setDelivered] = useState([])

  const [currentIndex, setCurrentIndex] = useState();
  const [refFlatList, setRefFlatList] = useState();
  const [estimates, setEstimates] = useState(0);




//   async function fetch_delivered_request (myId: Number, date: string){

//     const function_name = "fetch_deliverd_request"
//     try{
//       await fetch('http://192.168.0.6:5000/fetchDelivered', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       //  body: JSON.stringify({
//       //   "name": "jae"
//       // }),
       
//       body: JSON.stringify({
//            "riderID": myId,
//            "date": date
//        })
  
//     })
//     .then((response) => response.json())
//     .then((responseJson) => {
      
//       if(responseJson.empty) {
         
//       } else {
//           console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
//           setDelivered(responseJson)
//           // console.log("responseJson.lastDelivery",responseJson.lastDelivery)
//       }
//       // console.log(`here is the response: ${responseJson}`)
//     })
  
//   } catch(error){
//       console.log(`error in ${function_name}: ${error}`)
//   } 
  
  
//   }
  

//   useEffect(() => {
//     const fakeID = 1
//     const fakeDate = "2022-06-09"
    
//   fetch_delivered_request(riderID, route.params?.deliveriesDate)
//   },[])


  useEffect(() => {
   if(delivered.length > 0) {
    console.log("deliverd",delivered)

    for (let i = 0; i < delivered.length; i++) {
      setEstimates  (it => it + delivered[i].riderBasePayout + delivered[i].riderDistancePayment);
    }
  // console.log(sum);
   }
  },[delivered.length])

  const data = Payouts


const listHeaderComponent = ({item, index}) => {
  return(
   <View
   style={[styles.modalView ,{backgroundColor: (delivered.length < 5 ? customStyles.widgetColor : customStyles.primaryColor)}]}>
        <View style={styles.imageView}>
              <Image
              source={fridge}
              style={styles.image}
              />
        
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          style={{
            width: "45%",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: customStyles.secondPrimaryColor,
            paddingVertical: "2%",
            marginVertical: "8%",
            borderRadius: 20,
          }}
          >
          <Text
              style={[styles.discraption, {color: customStyles.primaryBackgroundColor}]}
              >
                {"Hide items"}
              </Text>
          </TouchableOpacity>

</View>
  )
};



      


      
const renderItems = ({item, index }) => {

    
        return(
        <>
       <View
              style={{flexDirection: "row", alignItems: "center", marginVertical: "3%", 
              marginBottom: (index === itemsData?.length - 1 ? "10%" : "3%")}}
              >
            
              <Image
            source={fridge}
            style={styles.image1}
            />
  
           <Text
              style={styles.discraption}
              >
                {"Double cheese burger"}
              </Text>
  
              </View>
      </>
      
      )}



      if(!data) {
        return <ActivityIndicator />
    }

      const keyExtractor = (item, index) => index.toString();

     
    return (

  <>
   


          <View style={styles.backgroundPage}/>
          
           <FlatList
           data={itemsData}
           renderItem={renderItems}
           ListHeaderComponent={listHeaderComponent}
           keyExtractor={keyExtractor}
           />

          </>



       
  
    )
}



const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
  container: {
    flex:1,
    backgroundColor: customStyles.primaryColor,
    
  },
  backgroundPage: {
    backgroundColor: customStyles.widgetColor, 
    width: "100%", 
    height: "100%", 
    position: "absolute", 
    // borderRadius: "40rem",
  },

  

  iconView: {
    borderWidth: "1.5rem", 
    borderColor: "rgba(0,0,0,0.0)", 
    borderRadius: "5rem", 
    padding: "2rem", 
    marginRight: "15rem",
    alignSelf: "flex-end"
  },

  modalView: {
    backgroundColor: customStyles.primaryColor,
    paddingTop: "2%",
    alignItems: "center",
    paddingBottom: "30%",
    alignContent: "center",
    marginBottom: "-30%",
    borderBottomStartRadius: "20rem",
    borderBottomEndRadius: "20rem",
  },
  
   imageView: {
    // backgroundColor: "white",
    paddingTop: "10%",
    padding: "2%",
    borderRadius: "15rem"
   },

   image: {
    width: "130rem", 
    height: "130rem", 
  }, 
  image1: {
    width: "100rem", 
    height: "100rem", 
    padding: "5%", 
    marginHorizontal: "10%",
    // backgroundColor: customStyles.white, 
    borderRadius: "15rem",
  },
  discraption: {
    fontSize: "14rem",
    color: customStyles.whiteGray,
    fontWeight: customStyles.fontWeight,
  }, 
});