import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text,FlatList, Platform, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ToastAndroid, SectionList, Modal} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../AppTheme/customStyles";
// import TextInput from "./Chatroom/TextInput";
import uuid from 'react-native-uuid';

import { useRoute } from '@react-navigation/native';
import { acceptNewTask, fetch_messages_request, skipNewTask } from '../src/functions';
import { useSelector } from 'react-redux';


import socketIOClient from "socket.io-client";
import moment from "moment";
import NewTaskScreen from "../components/ScreenComponents/NewTaskScreen";
import { StatusBar } from "expo-status-bar";
const ENDPOINT = "http://192.168.0.6:5000";

const fakeImage = "https://cima4u.cloud/wp-content/uploads/01-1370.jpg"

const createDummyMessages = () => {

    let data = []
    for(let i = 0; i < 300; i++) {
        const object = {
            "_id": i,
            "textMessage": `test message ${i}`
        }
        data.push(object)
    }
    return data
}

function showToast() {
  ToastAndroid.show('You need to implement this!', ToastAndroid.SHORT);
}


const RenderItem = ({item = {} || null, riderID = Number || null, index = Number, onLongPress, onPress, }) => {

  const ref = useRef();
  const messageTime = moment(item?.createdAt).format("LT")


  
    return (
        <View style={[styles.messageBubble, {alignItems: (item?.user?._id === riderID ? "flex-end" : "flex-start") }]}>
            
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} onLongPress={() => onLongPress(ref)}
             style={[styles.textMessageView, 
            {backgroundColor: (item?.user?._id === riderID ? "green" : "black"), }]}
             >



                {/* //#222 image   */}

                {item?.imageUri && <TouchableOpacity activeOpacity={0.7}>
                <Image
                style={styles.imageMessage}
                source={{uri: "https://cima4u.cloud/wp-content/uploads/01-1370.jpg"}}
                />
                </TouchableOpacity>}




             {/* //#111 message text   */}
            <Text
            
            style={[styles.textMessage, {color: (item?.user?._id === riderID ? "white" : "white")}]}
            >
            {item?.text}
            </Text>



            {/* //#333 time and check   */}
            <View style={styles.timeAndCheckView }>
            <Text style={styles.timeText}>{messageTime}</Text>
           {item?.sent && <Ionicons name="checkmark-outline" style={styles.checkIcon} />}
            </View>
            </TouchableOpacity>

            {item?.longPressed && <>
              <View style={styles.optionsArrow}/>
                    <View style={styles.optionsView}>
                      <TouchableOpacity activeOpacity={0.7} onPress={showToast}>
                        <Text style={styles.optionsText}>{"Copy text message"}</Text>
                      </TouchableOpacity>
              </View>    
             </>}
            
            
        </View>
    )
};


export default function Chat () {

  const {newTask, tasks} = useSelector(state=> state.riderReducer)

    const {riderData} = useSelector(state => state.riderReducer)
    const messagesData = useSelector(state => state.riderReducer.messages);

    const [messages, setMessages] = useState([])
    const [text, setText] = useState("");
    const [rider, setRider] = useState(riderData ? riderData : []); 
    const [isRender, setIsRender] = useState(false)
    const [index, setIndex] = useState(0);
   

    const flatListRef = useRef(null);




    

    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("message", ({textMessage, riderID, messageId, createdAt, sent}) => {
    //         if(riderID === riderData?.id) {
    //           const newMessageObject = {
    //             _id: messageId,
    //             text: textMessage,
    //             createdAt: createdAt,
    //             // pending: true,
    //             sent: sent,
    //             // received: true,
    //             user: {
    //               _id: riderID,
    //               name: "",
    //               // avatar: 'https://placeimg.com/140/140/any',
    //               },
    //             }

    //           const data = [...messages]
        
    //           data.unshift(newMessageObject)
        
    //           setMessages(data)
    //         }
    //     });
    
    //   },[riderData, messages])

    // useEffect(() => {
    //   console.log("messages before: ", messages.map(it => it._id))
    // },[])
   


    useEffect(() => {
        if(!messagesData && rider.id) {
          console.log("messages before: ", messages.map(it => it.id))
          fetch_messages_request(rider.id)
        }
        // console.log("messages before: ", messages)
      },[])

    useMemo(() => {
    //   console.log("messages changed")
      if(messages.length < 1 && messagesData && messagesData.length > 0){
          console.log("messagesData ",messages)
        // const data = [...messagesData]
        setMessages(messagesData)
      }
      
    },[messagesData])



    // const onSend = useCallback((messages = []) => {
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])


    const onSend = () => {
      console.log("messages", text)
      if(text) {
        const riderID = rider.id
        const vendorID = null;
        const customerID = null;
        const textMessage = text.trim();
  
        console.log("text", text)
  
        const data = [...messages]
        
        const newMessageObject = {
          _id: messages ? messages.length + 1 : 1,
          text: text.trim(),
          createdAt: new Date(),
          // pending: true,
          sent: false,
          // received: true,
          user: {
            _id: riderID,
            name: "",
            // avatar: 'https://placeimg.com/140/140/any',
            },
          }
  
        data.unshift(newMessageObject)
          // setIsRender(!isRender)
        setMessages(data)
        setText("")
          
        const socket = socketIOClient(ENDPOINT);
        socket.emit("message", {textMessage, riderID, customerID, vendorID,});
        console.log("sent")
      }
    
    }

    


    const onMessageLongPress = (index) => {
        const pressedMessageIndex = messages.findIndex((it => it.longPressed === true)) 
        if(pressedMessageIndex !== -1){
          messages[pressedMessageIndex].longPressed = false;
        setIsRender(!isRender);
        }
        messages[index].longPressed = true;
        setIndex(0)
        setIsRender(!isRender)
      // console.log("last element",messages[messages.length])
    }

  
   const onMessagePress = () => {
     
      const pressedMessageIndex = messages.findIndex((it => it.longPressed === true)) 
      // console.log("pressedMessage", pressedMessageIndex)
      if(pressedMessageIndex !== -1){
        console.log("pressedMessage", pressedMessageIndex)
        messages[pressedMessageIndex].longPressed = false;
        setIsRender(!isRender);
      }
      // setIndex(0)
      // setIsRender(!isRender)
  
    }




//    function onSend() {
//         const data = [...messages]
//         data.push({"id": data.length + 1, "text": text})
//         setText("");
//         setMessages(data)
//         // flatListRef?.current?.scrollToEnd()
//     }



const DATA = Object.values(messages.reduce((acc, item) => {
  
    const getMessageDate = () => {
      // if (moment(item.createdAt).isSame(moment(), 'day')) {
      //   return  `Today`
  
      if (moment(item.createdAt).isSame(moment(), "day")) {
          return `Today`;
      } 
      else if (moment(item.createdAt).isBefore(moment(),'day') && !moment(item.createdAt).isBefore(moment(),'day'))   {
       return `${moment(item.createdAt).format("dddd")}`;
        
      } 
      else if (moment(item.createdAt).isBefore(moment(), "days") &&  !moment(item.createdAt).isBefore(moment(), "year")){
        return `${moment(item.createdAt).format("MMMM D")}`;
      }
  
       else {
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



const sectionHeader = ({section}) => (<View>
{ <View style={styles.groupView}>
<View style={styles.yearDateView}>
<Text style ={styles.yearDateText}>
{section.title}
</Text>
</View>

</View>}
</View>)




    const keyExtractor = (item) => item?._id.toString()

    const renderItem = ({item, index,}) => {

      return(
        <RenderItem item={item} riderID={rider?.id} 
        onPress={onMessagePress}

        onLongPress={(ref) => {setIndex(index); onMessageLongPress(index); }}/>
      )
    }
     


    return(

 <>
      
      <KeyboardAvoidingView 
        // onTouchStart={onMessagePress}
        behavior={Platform.OS === "ios" && "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={styles.mainView}
        >
            <SectionList 
            // onTouchStart={onMessagePress}
            sections={DATA}
            renderSectionFooter={sectionHeader}
            onScroll={onMessagePress}
            initialNumToRender={30}
            // data={messages} 
            renderItem={renderItem} 
            // ref={ref => row[index] = ref}
            inverted={true}
            extraData={isRender}
            // onContentSizeChange={()=> flatListRef.current.scrollToEnd()} 
            keyExtractor={keyExtractor}
            />

                <View onTouchStart={onMessagePress} style={styles.inputView}>
                        <TextInput
                        // maxLength={100}
                        multiline
                        
                        // numberOfLines={5}
                        style={styles.inputStyle}
                        
                        value={text}
                        onChangeText={setText}
                        placeholder="Type a message here..."
                        placeholderTextColor={customStyles.whiteGray}
                        />
                        
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => onSend(messages)}
                        >
                        <MaterialCommunityIcons name="send-circle" style={[styles.sendButton, {opacity: (text ? 1: 0.2)}]} />
                        </TouchableOpacity>
                </View>
         
        </KeyboardAvoidingView>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      {/* //new task modal */}
      <Modal
      statusBarTranslucent
      // style={{backgroundColor: "red"}}
      animationType="fade"
        transparent={false}
        visible={newTask?.id ? true : false} 
        
        // onRequestClose={() => setModal(it => !it)}
      >
        <NewTaskScreen riderNewTask={newTask} acceptNewTask={() => acceptNewTask(newTask, tasks, riderData?.id)} skipNewTask={() => skipNewTask(newTask, tasks)} />
        
        <StatusBar style={"light"}  backgroundColor={customStyles.primaryColor} />
      </Modal>
 
 </>
     
    )
};



const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({

    mainView: {
        backgroundColor: customStyles.primaryBackgroundColor,
        flex: 1,
        paddingBottom: (Platform.OS === "ios" ? "10%" : 0),
    },
    messageBubble: {
        alignItems: "flex-start",
    },

    sendButton: {
        fontSize: "35rem",
        color: customStyles.authUserColor,
        marginBottom: "5rem",
        marginRight: "10rem",
        marginLeft: "10rem",
        
    }, 
    scrollToButtomIcon: {
        fontSize: "32rem",
        color: customStyles.receiverColor,
        
    },
    
    cameraIcon: {
      color: customStyles.secondPrimaryColor,
      fontSize: "35rem",
    },
    
    verticalLine:  {
      color: customStyles.secondPrimaryColor, 
      fontSize: "20rem",
      marginBottom: "2%",
      opacity: 0.5,
     
    },
    textInput:{
      maxHeight: "100rem",
    //   paddingTop: "3.5%",
      paddingTop: (Platform.OS == "ios" ? "3.5%" : "1.1%"),
      color: customStyles.secondPrimaryColor,
    },

    image: {
        width: entireScreenWidth,
        aspectRatio: 3/3,
        alignSelf: "center",
        borderRadius: "20rem"
    },
    imageView: {
    justifyContent: "center",
    width: entireScreenWidth,
    // position: "absolute",
    // zIndex: 1,
    height: "100%",
    backgroundColor: "black",
    },
    cancelText: {
        fontSize: "18rem",
        fontWeight: customStyles.fontWeight,
        color: "white",
        marginHorizontal: "5%",
    },
    cancelButtonView:{
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "red",   
        paddingVertical: "5%",
        borderRadius: "20rem",
    },
    photoWarningMessage: {
        fontSize: "20rem",
        color: "white",
        fontWeight: customStyles.fontWeight,
        marginBottom: "10%",
        marginHorizontal: "2.5%",
    }, 
  

    inputView: {
        backgroundColor: customStyles.widgetColor,
        flexDirection: "row",
        paddingBottom: "10%",
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        // borderWidth: "10rem",
        borderRadius: "10rem",
        borderBottomLeftRadius: "10rem",
        borderBottomRightRadius: "10rem",
    },
    inputStyle: {
        width: "88%",
        padding: "2%",
        fontSize: "15rem",
        color: customStyles.secondPrimaryColor
        // marginHorizontal: "2%",
    },

    imageMessage : {
      width: "250rem",
      aspectRatio: 1,
      borderRadius: 13,
      margin: "1rem",
      resizeMode: 'cover',
    },
  
  textMessageView: {
    marginHorizontal: "3%",
    margin: "0.8%",
    backgroundColor: "orange",
    borderRadius: "10rem",
    },

    textMessage: {
      paddingVertical: "1%",
      paddingHorizontal: "2%",
      fontSize: "15rem",
      color: customStyles.white
    },

    timeAndCheckView: {
      flexDirection: "row", 
      justifyContent: "flex-end",
      alignItems: "center", 
      paddingHorizontal: "2%", 
      paddingBottom: "1%"
    },
    timeText:{
      color: customStyles.white,
      fontSize: "12rem"
    },
    checkIcon: {
      fontSize: "14rem",
      color: customStyles.white,
      marginLeft: "5rem",
    },

    optionsView: {
      backgroundColor: customStyles.secondPrimaryColor,
      borderRadius: "10rem",
      padding: "2%",
      margin: "2%",
    },

    optionsText: {
      color: customStyles.primaryBackgroundColor,
      fontSize: "16rem",
    },
    optionsArrow: {
      backgroundColor: 
      customStyles.secondPrimaryColor, 
      width: "10rem", 
      height: "10rem",
      position: "absolute",
      top: "53%",
      right: "5%",
      transform: [{rotate: "4010deg",}]
        
      
      
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
    
    
    });



