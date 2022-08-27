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
import DaysPayoutsItem from "../../components/DaysPayouts/DaysPayoutsItem";
import { useSelector } from "react-redux";
import NewTaskScreen from "../../components/ScreenComponents/NewTaskScreen";
import { acceptNewTask, skipNewTask } from "../../src/functions";
import { StatusBar } from "expo-status-bar";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)







export default function PayoutsDaysScreen() {


  const {newTask, tasks, riderData} = useSelector(state=> state.riderReducer)


  // const [messages, setMessages] = useState<MessageModel[]>([]);
  const route = useRoute();
  const navigation = useNavigation()

  const [currentIndex, setCurrentIndex] = useState();
  // const [rider, setRider] = useState(route.params?.riderID)
  const [totalPaid, setTotalPaid] = useState(0);
  const [refFlatList, setRefFlatList] = useState();
  const [payouts, setPayouts] = useState(route.params?.daysPayouts);

  const data = [{}]


//TODO test useEffect
useEffect(() => {

},[])









useEffect(() => {
  if(payouts.length > 0) {
   

   for (let i = 0; i < payouts.length; i++) {
     setTotalPaid(it => it + payouts[i].payment);
   }
 // console.log(sum);
  }
 },[payouts.length])

   






const DATA = Object.values(payouts.reduce((acc, item) => {
  // console.log("payouts days: ", payouts.length)
  const getMessageDate = () => {

    if (moment(item?.date).isSame(moment(), "day")) {
        return `Today`;

    // } else if (moment(item?.date).isSame(moment(), "week")) {
    //   return `${moment(item?.date).format("dddd")}`;
    } else {
      // return `${moment(item?.date).format("Do")}`;
      return `${moment(item?.date).format("dddd")}`;
    }
    
  };

  if (!acc[moment(item?.date).format('Do')]) acc[moment(item?.date).format('Do')] = {
    title: getMessageDate(),
    data: []
  };
  acc[moment(item.date).format('Do')].data.push(item);
  return acc;

}, {}))



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

        <Text style={[styles.tasksTitle, {color: (data.length < 5 ? customStyles.secondPrimaryColor : customStyles.white)}]}>
          {`${route.params?.unPaid ? "Estimates" : "Total paid"} ${totalPaid.toFixed(2)} €`}
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

      


      








        

      if(!data) {
        return <ActivityIndicator />
    }


    // useEffect(() => {
    //   console.log("data.length", payouts[0])
    // },[])


    const keyExtractor = (item, index) => index?.toString()

    const renderItem = ({item, index}) => {

      return (
        <DaysPayoutsItem item={item} index={index}/>
      )
    }
  

     
    return (

      <>
          <View style={[styles.container, {backgroundColor: (DATA.length !== 5 ? customStyles.primaryColor : customStyles.widgetColor  ) }]}>
             <View
          style={data.length < 3 ? [styles.backgroundPage] : [styles.backgroundPage, {borderRadius: 0}]}
        />
          <SectionList
           sections={DATA} 
        //    ListFooterComponent={groupRoomHeader}
        //    ListHeaderComponent={typingUserInvertedHeader}
           renderItem={renderItem}
           renderSectionHeader={sectionHeader}
           ListHeaderComponent={listHeaderComponent}
           keyExtractor={keyExtractor}
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


