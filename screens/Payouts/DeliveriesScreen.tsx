import React, {useState, useEffect, useMemo, useCallback, Component, useRef} from "react";
import {
    View,
    StyleSheet, 
    FlatList, 
    ActivityIndicator, 
    Alert, 
    ImageBackground,
    Text,
    ScrollView,
    SectionList,
    Pressable,
    Dimensions,
    TouchableHighlight, 
    TouchableOpacity,
    Image,
    Modal
} 


from "react-native";
import {useRoute,} from "@react-navigation/core";
import { useFonts } from "expo-font";
// import { BlurView } from "expo-blur";
// import Chats from "../assets/dummy-data/Chats"
import Payouts from "../../assets/testData/Payouts.json"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import customStyles from "../../AppTheme/customStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import stockMarket from "../../assets/images/stock-market.png";
import moment from "moment";
import { useSelector } from "react-redux";
import { acceptNewTask, skipNewTask } from "../../src/functions";
import NewTaskScreen from "../../components/ScreenComponents/NewTaskScreen";
import { StatusBar } from "expo-status-bar";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

export default function DeliveriesScreen() {

  const {riderData, newTask, tasks} = useSelector(state => state.riderReducer)

  // const [messages, setMessages] = useState<MessageModel[]>([]);
  const route  = useRoute(); 

  const [date, setDate] = useState(route.params?.date)
  const [riderID, setRiderID] = useState(riderData?.id)
  const [delivered, setDelivered] = useState([])

  const [currentIndex, setCurrentIndex] = useState();
  const [refFlatList, setRefFlatList] = useState();
  const [estimates, setEstimates] = useState(0);




  async function fetch_delivered_request (myId: Number, date: string){

    const function_name = "fetch_deliverd_request"
    try{
      await fetch('http://192.168.0.6:5000/fetchDelivered', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //  body: JSON.stringify({
      //   "name": "jae"
      // }),
       
      body: JSON.stringify({
           "riderID": myId,
           "date": date
       })
  
    })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.empty) {
         
      } else {
          console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
          setDelivered(responseJson)
          // console.log("responseJson.lastDelivery",responseJson.lastDelivery)
      }
      // console.log(`here is the response: ${responseJson}`)
    })
  
  } catch(error){
      console.log(`error in ${function_name}: ${error}`)
  } 
  
  
  }
  

  useEffect(() => {
    const fakeID = 1
    const fakeDate = "2022-06-09"
    
  fetch_delivered_request(riderID, route.params?.deliveriesDate)
  },[])


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

    

// const DATA = Object.values(delivered.reduce((acc, item) => {

//   const getMessageDate = () => {
//     // if (moment(item.createdAt).isSame(moment(), 'day')) {
//     //   return  `Today`

//     if (moment(item.createdAt).isSame(moment(), "day")) {
//         return `Today`;
//     // } else if (moment(item.createdAt).isBefore(moment(),'day') && !moment(item.createdAt).isBefore(moment(),'day'))   {
//     //   return `${moment(item.createdAt).format("dddd")}`;
      

//     // } else if (moment(item.createdAt).isBefore(moment(), "days") &&  !moment(item.createdAt).isBefore(moment(), "year")){
//     //   return `${moment(item.createdAt).format("MMMM D")}`;

//     } else if (moment(item.createdAt).isBefore(moment(), "day")) {
//         return `${moment(item.createdAt).format("MMM Do")}`;

//       }
    
//   };

//   if (!acc[moment(item.createdAt).format('L')]) acc[moment(item.createdAt).format('L')] = {
//     title: getMessageDate(),
//     data: []
//   };
//   acc[moment(item.createdAt).format('L')].data.push(item);
//   return acc;

// }, {}))



const listHeaderComponent = ({item, index}) => {
  return(
   <View
   style={[styles.modalView ,{backgroundColor: (delivered.length < 5 ? customStyles.widgetColor : customStyles.primaryColor)}]}>
        <View style={styles.imageView}>
              <Image
              source={stockMarket}
              style={styles.image}
              />
        
        </View>

        <Text style={[styles.tasksTitle, {color: (delivered.length < 5 ? customStyles.secondPrimaryColor : customStyles.white)}]}>
          {`Estimates ${estimates.toFixed(2)} €`}
        </Text>
</View>
  )
};


const sectionHeader = ({section}) => (<View>
{ <View style={styles.groupView}>
<View style={styles.yearDateView}>
<Text style ={styles.yearDateText}>
{section.title}
</Text>
</View>

</View>}
</View>)

      


      
const renderItems = ({item, index }) => {

        const deliveredAt = moment(item.deliveredAt).format("h:mm")



        return(
        <>
        {/* //Notification */}
        <View style={styles.settingView}>

       
<TouchableOpacity onPress={()=> {} } activeOpacity={0.8}>
    <View style={styles.payoutView}>

      <Text style={styles.resturantTitle} >
        {item.vendorName}
        </Text>


        <View style={{flexDirection: "row", alignItems: "center",}}>

            <View style={styles.payoutAmountView}>
                <Text style={[styles.distanceTitles]} >
                {deliveredAt}
                </Text>
            </View>

        </View>

         
    </View>

    {/* //separator */}
  <View style={styles.separator}/>


      <View style={styles.payoutView}>

      <Text style={styles.distanceTitles} >
        {"Basic payment"}
        </Text>


        <View style={{flexDirection: "row", alignItems: "center",}}>

              <View style={styles.payoutAmountView}>
                  <Text style={[styles.numbers]} >
                  {`${item.riderBasePayout.toFixed(2)} €`}
                  </Text>

              </View>
       
        </View>
        
  </View>

      {/* //separator */}
      <View style={styles.separator}/>



      <View style={styles.payoutView}>

      <Text style={styles.distanceTitles} >
        {"Extra distance payout"}
        </Text>

        <View style={{flexDirection: "row", alignItems: "center",}}>

          <View
          style={styles.payoutAmountView}
          >
        <Text style={[styles.numbers]} >
        {`${item.riderDistancePayment ? item.riderDistancePayment.toFixed(2) : "0:00"} €`}
        </Text>
          </View>
       
        </View>
        
      
       
         
      </View>
      </TouchableOpacity >

      {/* <View style={styles.separator}/> */}
      </View>
      </>
      
      )}












      if(!data) {
        return <ActivityIndicator />
    }

  

     
    return (

  <>
   


          <View style={styles.backgroundPage}/>
          {/* <SectionList
           sections={DATA} 
        //    ListFooterComponent={groupRoomHeader}
        //    ListHeaderComponent={typingUserInvertedHeader}
           renderItem={renderItems}
           renderSectionHeader={sectionHeader}
           stickySectionHeadersEnabled
           /> */}
           <FlatList
           data={delivered}
           renderItem={renderItems}
           ListHeaderComponent={listHeaderComponent}
           />











           
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

  separator: {
    paddingVertical: "0.5rem",
    marginVertical: "5rem",
    // marginVertical: "10rem",
    marginHorizontal: "-2.5%",
    width: '105%',
    backgroundColor: customStyles.widgetColor,
    // opacity: 0.05,
  },

   groupView:{
        alignItems: "center",
        marginTop: "10rem",
    },

    yearDateView:{
      backgroundColor: customStyles.widgetColor,
      margin: "5rem",
      padding: "6rem",
      borderRadius: "10rem",
      shadowColor: "#000",
      marginBottom: "10rem",
      
    },

    yearDateText: {
      fontWeight: customStyles.fontWeight,
      color: customStyles.secondPrimaryColor,
      fontSize: "15rem"
    },

  settingsWord: {
    fontSize: "30rem", 
    paddingTop: "20rem", 
    paddingLeft: "10rem", 
    paddingBottom: "5rem", 
    fontWeight: customStyles.fontWeight, 
    color: customStyles.secondPrimaryColor,
    marginRight:"30rem",
    marginLeft: "30rem",
},

  iconView: {
    borderWidth: "1.5rem", 
    borderColor: "rgba(0,0,0,0.0)", 
    borderRadius: "5rem", 
    padding: "2rem", 
    marginRight: "15rem",
    alignSelf: "flex-end"
  },

  payoutView: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    // borderBottomWidth: "0.5rem", 
    borderColor: customStyles.dividerColor, 
    paddingVertical: "2.5rem",
  },



  payoutAmountText: {
    fontSize: "12rem",
    color: customStyles.secondPrimaryColor,
  },

  payoutAmountView: {
    paddingVertical: "8rem",
    borderRadius: "8rem",
    // backgroundColor: customStyles.primaryColor,
    marginRight: "15rem",
  },

  resturantTitle: {
    fontSize: "14rem",
    color: customStyles.secondPrimaryColor,
    marginLeft: "10rem",
    fontWeight: customStyles.fontWeight
  },
  distanceTitles: {
    fontSize: "12rem",
    color: customStyles.whiteGray,
    marginLeft: "10rem"
  },
  numbers: {
    fontSize: "12rem",
    color: customStyles.secondPrimaryColor,
    marginLeft: "10rem",
    fontWeight: customStyles.fontWeight
  },
  settingView: {
    backgroundColor: customStyles.primaryBackgroundColor, 
    margin: "10rem", 
    padding: "10rem", 
    borderRadius: "15rem",
    justifyContent: "center",
    marginHorizontal: "5%",
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
    width: "130rem", 
    height: "130rem", 
  }
});