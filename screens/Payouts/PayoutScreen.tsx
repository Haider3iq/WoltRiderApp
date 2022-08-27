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
import {useNavigation, useRoute,} from "@react-navigation/core";
import moment from "moment";
import { useFonts } from "expo-font";
// import { BlurView } from "expo-blur";
// import Chats from "../assets/dummy-data/Chats"
import Payouts from "../../assets/testData/Payouts.json"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import customStyles from "../../AppTheme/customStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import stockMarket from "../../assets/images/wallet.png";

import styles from "../../components/DaysPayouts/PayoutsStyles";

import { acceptNewTask, fetch_payouts_request, skipNewTask } from "../../src/functions";
import { useSelector } from "react-redux";
import NewTaskScreen from "../../components/ScreenComponents/NewTaskScreen";
import { StatusBar } from "expo-status-bar";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

export default function PayoutsScreen() {

  const {newTask, tasks, riderData} = useSelector(state=> state.riderReducer)

  // const [messages, setMessages] = useState<MessageModel[]>([]);
  const payoutsData = useSelector(state=> state.riderReducer.payouts)

  const route = useRoute();
  const navigation = useNavigation()

  const [currentIndex, setCurrentIndex] = useState();
  const [rider, setRider] = useState<[{}] | null>(route.params?.rider)
  const [unPaid, setUnPaid] = useState({});
  const [refFlatList, setRefFlatList] = useState();
  const [payouts, setPayouts] = useState(payoutsData ? payoutsData : []);

  // const data = [{}]


//TODO test useEffect
// useEffect(() => {
// //test useEffect
// const data = [
//   {notes: 'Game was played', time: '2017-10-04T20:24:30+00:00', sport: 'hockey', owner: 'steve', players: '10', game_id: 1},
//   { notes: 'Game was played', time: '2017-10-04T12:35:30+00:00', sport: 'lacrosse', owner: 'steve', players: '6', game_id: 2 },
//   { notes: 'Game was played', time: '2017-10-14T20:32:30+00:00', sport: 'hockey', owner: 'steve', players: '4', game_id: 3 },
//   { notes: 'Game was played', time: '2017-10-04T10:12:30+00:00', sport: 'hockey', owner: 'henry', players: '10', game_id: 4 },
//   { notes: 'Game was played', time: '2017-10-14T20:34:30+00:00', sport: 'soccer', owner: 'john', players: '12', game_id: 5 }
// ];

// // this gives an object with dates as keys
// const groups = data.reduce((groups, game) => {
//   const date = game.time.split('T')[0];
//   if (!groups[date]) {
//     groups[date] = [];
//   }
//   groups[date].push(game);
//   return groups;
// }, {});

// // Edit: to add it in the array format instead
// const groupArrays = Object.keys(groups).map((date) => {
//   return {
//     date,
//     games: groups[date]
//   };
// });

// // console.log("groupArrays",groupArrays);
// },[])









useEffect(() => {
  if(payouts) {
    const unPaid = payouts.filter((it) => it.status == "unpaid")[0]
    setUnPaid(unPaid)
    // setPayouts(payouts.filter([(it) => it.status !== "unpaid")])
    // console.log("unPaid object: ", unPaid)

    // const fixedNumber = 299.32
    // console.log("number",fixedNumber.toFixed(2))
  }
    
},[payouts])


useEffect(() => {
  setPayouts(payoutsData ? payoutsData : []);
},[payoutsData])
   


   
    

    
    
  
    useEffect(() => {
      // console.log("payouts", payoutsData)
      if(!payoutsData && rider?.id) {
        console.log("payouts data test")
        // console.log("rider id", rider?.id)
        fetch_payouts_request(rider?.id)
      }
    },[])



    const data = [{}]

const DATA = Object.values(payouts.filter((it) => it?.status !== "unpaid").reduce((acc, item) => {
  
  const getMessageDate = () => {
    // if (moment(item.date).isSame(moment(), 'day')) {
    //   return  `Today`

    if (moment(item.createdAt).isSame(moment(), "year")) {
        return `This year`;
    // } else if (moment(item.date).isBefore(moment(),'day') && !moment(item.date).isBefore(moment(),'day'))   {
    //   return `${moment(item.date).format("dddd")}`;
      

    // } else if (moment(item.date).isBefore(moment(), "days") &&  !moment(item.date).isBefore(moment(), "year")){
    //   return `${moment(item.date).format("MMMM D")}`;

    } else {
      return `${moment(item.createdAt).format("YYYY")}`;
    }
    // else if (moment(item.createdAt).isBefore(moment(), "year")) {
    //     return `${moment(item.createdAt).format("YYYY")}`;

    //   }
    
  };

  if (!acc[moment(item.createdAt).format('MMMM')]) acc[moment(item.createdAt).format('MMMM')] = {
    title: getMessageDate(),
    data: []
  };
  acc[moment(item.createdAt).format('MMMM')].data.push(item);
  return acc;

}, {}))






const navigateToDaysPayouts = (value : boolean) => {
  console.log("paymentPerDate: ", JSON.parse(unPaid?.paymentPerDate))
  navigation.navigate("PayoutsDays", {
  "riderID": rider?.id, 
  "daysPayouts": JSON.parse(unPaid?.paymentPerDate),
  "month": moment(unPaid?.createdAt).format('MMM YYYY'),
  "unPaid": value,
  })
  } 

const listHeaderComponent = ({item, index}) => {
  return(
   <View
   style={[styles.modalView ,{backgroundColor: (data.length < 5 ? customStyles.widgetColor : customStyles.primaryColor)}]}>
        <View style={styles.imageView}>
              <Image
              source={stockMarket}
              style={styles.image}
              />
        
        </View>
        <TouchableOpacity onPress={() => navigateToDaysPayouts(true)} activeOpacity={0.7}

          style={{flexDirection: "row", alignItems: "center"}}
          >

        
        <Text style={[styles.tasksTitle, {color: (data.length < 5 ? customStyles.secondPrimaryColor : customStyles.white)}]}>
          {`Estimates ${unPaid?.payment?.toFixed(2)} €`}
        </Text>

        <MaterialIcons name="arrow-forward-ios" style={styles.headerArrow} color={customStyles.secondPrimaryColor} />

        </TouchableOpacity>
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

        const payoutDate = moment(item.createdAt).format('L')


        return(
        <>
        {/* //Notification */}
        <TouchableOpacity onPress={() => navigateToDaysPayouts(false)} activeOpacity={0.7} style={styles.settingView}>
      
      <View style={styles.payoutView}>

      <Text style={styles.title} >
        {payoutDate}
        </Text>

        <View style={{flexDirection: "row", alignItems: "center",}}>

          <View
          style={styles.payoutAmountView}
          >
         <Text style={[styles.payoutAmountText]} >
        {`${item?.payment?.toFixed(2)}€`}
        </Text>

          </View>
       


        <MaterialIcons name="arrow-forward-ios" style={styles.arrowIcon} color="#90A8B2"/>


        </View>
        
      
       
         
      </View>
      </TouchableOpacity >

      {/* <View style={styles.separator}/> */}
      </>
      
      )}








        

      if(!payouts) {
        return <ActivityIndicator />
    }

  

     
    return (

      <>



          <View style={[styles.container, {backgroundColor: (data.length < 5 ? customStyles.widgetColor : customStyles.primaryColor) }]}>


              {/* //only backgroundView  */}
             <View style={data.length < 3 ? [styles.backgroundPage] : [styles.backgroundPage, {borderRadius: 0}]}/>

          <SectionList
           sections={DATA} 
        //    ListFooterComponent={groupRoomHeader}
        //    ListHeaderComponent={typingUserInvertedHeader}
           renderItem={renderItems}
           renderSectionHeader={sectionHeader}
           ListHeaderComponent={listHeaderComponent}
           stickySectionHeadersEnabled
           />

          </View> 













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



