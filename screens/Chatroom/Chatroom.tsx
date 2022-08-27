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
    TouchableOpacity ,
    TextInput,
    KeyboardAvoidingView,
    Platform
} 


from "react-native";
import {useRoute,} from "@react-navigation/core";
import moment from "moment";
import { useFonts } from "expo-font";
// import { BlurView } from "expo-blur";
// import Chats from "../assets/dummy-data/Chats"
import Chatrooms from "../../assets/testData/Chatrooms"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import customStyles from "../../AppTheme/customStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import ChatroomItem from "./ChatroomItem";
// import TextInput from "./TextInput";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

export default function Chatroom() {

  const [messageContent, setMessageContent] = useState("");

  // const [messages, setMessages] = useState<MessageModel[]>([]);



  const [currentIndex, setCurrentIndex] = useState();
  const [refFlatList, setRefFlatList] = useState();

  const data = Chatrooms

  const authUser = Chatrooms.filter(it => it.lastMessage.id === "m1")





    const route = useRoute();


   
    



const DATA = Object.values(data.reduce((acc, item) => {

  const getMessageDate = () => {
    if (moment(item.lastMessage.createdAt).isSame(moment(), 'day')) {
      return  `Today`

    } else if (moment(item.lastMessage.createdAt).isBefore(moment(),'day') && !moment(item.lastMessage.createdAt).isBefore(moment(),'day'))   {
      return `${moment(item.lastMessage.createdAt).format("dddd")}`;
      

    } else if (moment(item.lastMessage.createdAt).isBefore(moment(), "days") &&  !moment(item.lastMessage.createdAt).isBefore(moment(), "year")){
      return `${moment(item.lastMessage.createdAt).format("MMMM D")}`;

    } else if (moment(item.lastMessage.createdAt).isBefore(moment(), "year")) {
        return `${moment(item.lastMessage.createdAt).format("D.MM.YYYY")}`;

      }

      }
    

  if (!acc[moment(item.lastMessage.createdAt).format('L')]) acc[moment(item.lastMessage.createdAt).format('L')] = {
    title: getMessageDate(),
    data: []
  };
  acc[moment(item.lastMessage.createdAt).format('L')].data.push(item);
  return acc;

}, {}))


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

        const payoutDate = moment(item.lastMessage.createdAt).format('L')


        return(
        <>
        {/* //Notification */}
      <TouchableOpacity onPress={()=> {} } activeOpacity={0.7}>
      <ChatroomItem item={item}/>
      </TouchableOpacity >
      </>
      
      )}








        

      if(!data) {
        return <ActivityIndicator />
    }

  

     
    return (
       
          <View style={styles.chat}>
          
          <SectionList
           sections={DATA} 
        //    ListFooterComponent={groupRoomHeader}
        //    ListHeaderComponent={typingUserInvertedHeader}
           renderItem={renderItems}
           renderSectionHeader={sectionHeader}
           stickySectionHeadersEnabled
           />
    <KeyboardAvoidingView
   
    behavior={Platform.OS === "ios" ? "position" : "height"}
    >
      <View
        style={{
            width: "100%",
            backgroundColor: customStyles.primaryBackgroundColor,
            paddingHorizontal: "5%",
            minHeight: "20%"
        }}
      >
      <View
      style={[styles.textInputView, {justifyContent: "center"}]}
      >

      <TextInput 
          style={styles.textInput}
          multiline={true}
          numberOfLines={5}
          value={messageContent}
          onChangeText={setMessageContent}
          placeholder="Type a message to start a chat..."
          placeholderTextColor={customStyles.secondPrimaryColor}
        />

      </View>
        
      </View>

        </KeyboardAvoidingView>
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
  separator: {
    height: "1%",
    width: '200%',
    backgroundColor: customStyles.secondPrimaryColor
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
    margin: "5rem", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    // borderBottomWidth: "0.5rem", 
    borderColor: customStyles.dividerColor, 
    paddingVertical: "15rem",
  },

  iconSize: {
    fontSize: "20rem"
  }, 

  arrowIcon: {
    fontSize: "15rem",
    marginRight: "15rem"
  },


  payoutAmountText: {
    fontSize: "15rem",
    color: customStyles.white,
  },

  payoutAmountView: {
    padding: "5%",
    borderRadius: "8rem",
    backgroundColor: customStyles.primaryColor,
    marginRight: "50rem",
  },

  title: {
    fontSize: "15rem",
    color: customStyles.secondPrimaryColor,
    marginLeft: "10rem"
  },
  chat: {
    marginBottom: "15%" ,
    backgroundColor: customStyles.primaryBackgroundColor
  },

  textInput: {
      backgroundColor: customStyles.primaryBackgroundColor, 
      color: customStyles.secondPrimaryColor,
      width: "100%"
    },
  textInputView: {
    borderRadius: "20rem",
    borderColor: "white", 
    borderWidth: "1rem",
    padding: "3%",
  }
  
});