import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {View, Text, Dimensions, Image, TouchableOpacity, ScrollView, Modal} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../AppTheme/customStyles";
import Empty from "../navigation/Empty message/Empty";
import previousDelivery from "../assets/images/schedule.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { acceptNewTask, skipNewTask } from "../src/functions";
import NewTaskScreen from "../components/ScreenComponents/NewTaskScreen";
import { StatusBar } from "expo-status-bar";


export default function PreviousDelivery () {


  const {newTask, tasks, riderData} = useSelector(state=> state.riderReducer)

    let DATA = {
        "customerName": "Jesse Said",
        "customerAddress": "Palosaarentie 62",
        "customerNote": "Please deliver the food to the door without contact or calling me... thanks a lot.",
        "customerPhoneNumber": "358467891",
        "deliveryCode": "387",
        "resturantName": "Macdonald's",
        "resturantNote": "Our location is located right inside The Rwell Center building... go to the second floor where you see Macdonald's",
        "resturantAddress": "pitkälahdenkatu 31",
    } 
    const route = useRoute();
    const navigation = useNavigation();

const [data, setData] = useState(route.params?.data)    
const [rider, setRider] = useState(route.params?.rider)
const [show, setShow] = useState(false)

// useEffect(() => {
//   console.log("last delivery data", data)
//   console.log("data id", data.id)
// },[])


const onCustomerLocationPress = () => {
  console.log("customer lat and long: ", data?.customerLatLong)
  const Lati = JSON.parse(data?.customerLatLong);
  console.log("Address: ", data?.customerAddress,
  "latitude: ", Lati.latitude,
  "longitude: ", Lati.longitude,
  "customer name: ", data?.customerName,
  "riderName: ", `${rider?.firstName} ${rider?.lastName}`,
  "data: ", rider
  
  );

  navigation.navigate("Home", {
  "Address": data?.customerAddress,
  "latitude": Lati.latitude,
  "longitude": Lati.longitude,
  "customerName": data?.customerName,
  "iconName": "ios-person-circle-outline",
  "riderName": `${rider?.firstName} ${rider?.lastName}`,
  "data": rider
})
}

const onVendorLocationPress = () => {
  const Lati = JSON.parse(data?.vendorLatLong);
  console.log("Address: ", data?.vendorAddress,
  "latitude: ", Lati.latitude,
  "longitude: ", Lati.longitude,
  "vendor name: ", data?.vendorName);

  navigation.navigate("Home", {
  "Address": data?.vendorAddress,
  "latitude": Lati.latitude,
  "longitude": Lati.longitude,
  "vendorName": data?.vendorName,
  "iconName": "ios-restaurant",
  "riderName": `${rider?.firstName} ${rider?.lastName}`,
  "data": rider
})
}


return (


  <>

    <ScrollView
    style={styles.mainView}
    >

<View
   style={{backgroundColor: customStyles.widgetColor, width: "100%", height: "100%", position: "absolute"}}
   />
   
<View
          style={
            styles.modalView
          }
          >
             {/* <Text
            style={styles.tasksTitle}
            >
              {`Last delivery`}
            </Text> */}
            




          <View
          style={styles.imageView}
          >

         
          <Image
          source={previousDelivery}
          style={styles.image}
          />
           </View>

    
           
</View>



        {!!data?.id && <>
        <View
        style={styles.widgetView}
        >   
            <View
            
            style={{alignItems: "center"}}>

             <Text
                style={styles.title}
                >{"Customer details"}</Text>
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
                >{data?.customerName}
                </Text>

                <Ionicons name="ios-person-circle-outline" style={styles.icon} />

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
                >{data?.customerNote}
                </Text>

                <Ionicons name="ios-alert-circle" style={[styles.icon, {color: customStyles.negativeColor}]} />
                </View>



                <View style={styles.separator}/>


                <TouchableOpacity
                activeOpacity={0.8}
                onPress={onCustomerLocationPress}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
                <Text
                style={styles.title}
                >{data?.customerAddress}
                </Text>

                <Ionicons name="ios-location" style={styles.icon} />
                </TouchableOpacity>

                <View style={styles.separator}/>

                

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {}}
                style={styles.button}
                >
                <Text
                style={[styles.title,]}
                >{"Call customer"}</Text>
                 <Ionicons name="ios-phone-portrait" style={styles.icon} />
                </TouchableOpacity>
       </View>




       <View
        style={[styles.widgetView, {marginBottom: "15%",}]}
        >   
            <View
            
            style={{alignItems: "center"}}>

             <Text
                style={styles.title}
                >{"Resturant details"}</Text>
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
                >{data?.vendorName}
                </Text>

                <Ionicons name="ios-restaurant" style={styles.icon} />

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
                >{data?.vendorNote}
                </Text>

                <Ionicons name="ios-alert-circle" style={[styles.icon, {color: customStyles.negativeColor}]} />
                </View>



                <View style={styles.separator}/>


                <TouchableOpacity
                activeOpacity={0.8}
                onPress={onVendorLocationPress}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                >
               <Text
                style={styles.title}
                >{data?.vendorAddress}
                </Text>

                <Ionicons name="ios-location" style={styles.icon} />
                </TouchableOpacity>

                <View style={styles.separator}/>

                

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {}}
                style={styles.button}
                >
                <Text
                style={[styles.title,]}
                >{"items"}</Text>
                 <Ionicons name="ios-fast-food" style={styles.icon} />
                </TouchableOpacity>
       </View>
       </>}


      {!data?.id &&
   
       <Empty title={"No orders"} description={"You haven't delivered any orders in the last 24 hours. Only order withan last 24 hours will show here."} icon={undefined} 
       />
       }




    </ScrollView>












    {/* //new task modal */}
      <Modal
      statusBarTranslucent
      // style={{backgroundColor: "red"}}
      animationType="fade"
        transparent={false}
        visible={newTask?.id ? true : false} 
        
        // onRequestClose={() => setModal(it => !it)}
      >
        <NewTaskScreen riderNewTask={newTask} acceptNewTask={() => acceptNewTask(newTask, tasks, riderData?.id)} skipNewTask={() => skipNewTask(newTask, tasks, riderData?.id)} />
        
        <StatusBar style={"light"}  backgroundColor={customStyles.primaryColor} />
      </Modal>

    </>
)

};


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
  mainView: {
    
    
    backgroundColor: customStyles.primaryColor,
    borderTopRightRadius: "20rem",
    borderTopLeftRadius: "20rem"

  },
  widgetView: {
    marginHorizontal: "3%",
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
  tasksTitle: {
    fontWeight: customStyles.fontWeight, 
    fontSize: "22rem", 
    color: customStyles.white,
    paddingVertical: "20rem",
    paddingHorizontal: "5%",
    textAlign: "center",
    alignSelf: "center"
   },
   imageView: {
    // backgroundColor: "white",
    padding: "2%",
    borderRadius: "15rem"
   },
   image: {
    width: "120rem", 
    height: "120rem", 
  }
});