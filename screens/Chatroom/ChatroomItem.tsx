import React, {useState, useEffect} from "react";
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



export default function ChatroomItem({item}) {

    const [courier, setCourier] = useState<typeof item | null>();
    let auth;


        
    
    useEffect(() => {
        
        const courier = Chatrooms.filter(item => item.lastMessage.id = "m1");
        console.log("courier", courier[0]?.lastMessage.id);
        auth = item.lastMessage.id === courier[0]?.lastMessage?.id
        setCourier(courier[0])
        
    },[])

    return (
        <>
        <View style={{
            flexDirection: "row", 
            alignItems: "flex-end",
            justifyContent: auth ? "flex-end" : "flex-start",
            marginHorizontal: !auth ? "2.5%": "0%",
            marginBottom: "5%",
            }}>
            
            {!auth && <Image style={styles.userImage} source={{url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"}} />}
            <View
            style={[styles.messageView, {backgroundColor: auth ? customStyles.primaryColor : customStyles.secondPrimaryColor }]}
            >
            <Text style={[styles.messageText, {color: auth ? customStyles.white : customStyles.primaryBackgroundColor}]}
            
            >{"here is the message test flaksjdfl alskdjfl asdlfkjalksdj flkasjdf lkjasdlf alksdjflka jsdflk jasdlk"}</Text>

             {/* Time here */}
            <View style={{alignSelf: auth ? "flex-end" : "flex-start", marginBottom: "-2.5%", marginTop: "2.5%"}}>


            <Text
            style={[styles.timeText, {}]}
            >
            {moment(item.createdAt).format("LT")}
            </Text>
            </View>
            </View>
        </View>

       
        </>


    )
};




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

  messageView: {
        backgroundColor: customStyles.secondPrimaryColor,
        minWidth: "auto",
        maxWidth: "80%",
        borderRadius: "10rem",
        paddingHorizontal: "2%",
        paddingVertical: "3.5%",
  },
  userImage: {
    width: "10%",
    aspectRatio: 1/1,
    borderRadius: "10rem",
    marginHorizontal: "2%",
  },


  messageText: {
    fontSize: "15rem",
    color: customStyles.primaryBackgroundColor,
    
  },
  timeText: {
    fontSize: "12rem",
    color: customStyles.primaryBackgroundColor,
  }
});