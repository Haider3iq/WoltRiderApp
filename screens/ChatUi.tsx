//TODO

//expo install expo-image-picker
//yarn add react-native-gifted-chat || npm install react-native-gifted-chat --save
// yarn add @expo/vector-icons
// yarn add react-native-extended-stylesheet
// @expo/react-native-action-sheet
// yarn add expo-image-picker
// yarn add react-native-image-zoom-viewer
// warap the app.tsx or app.js with <ActionSheetProvider>

//__issues with gifted chat 
//solution => check the react-native-safe-area-context version used in gifted chat (in packge.js of gifted chat) and install the version of it. 



import { View, Text, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Keyboard, Button, Modal} from 'react-native'
import React, { useState, useCallback, useEffect, useRef, useMemo} from 'react'
import { Bubble, Composer, GiftedChat,  Send } from 'react-native-gifted-chat';
import customStyles from '../AppTheme/customStyles';
import { EvilIcons, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as ImagePicker  from "expo-image-picker";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { withDecay } from 'react-native-reanimated';
import uuid from 'react-native-uuid';
import MessageImage from '../components/MessageImage';
import {ImageViewer} from 'react-native-image-zoom-viewer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import io from "socket.io-client";

import { useRoute } from '@react-navigation/native';
import { fetch_messages_request } from '../src/functions';
import { useSelector } from 'react-redux';
// import { GiftedChat } from 'react-native-gifted-chat'


import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.0.6:5000";


export default function ChatUi() {

  const {riderData} = useSelector(state => state.riderReducer)
  const messagesData = useSelector(state => state.riderReducer.messages);

  const route = useRoute();
    
    const fakeData = [{"id1": "1", "msg": "msw", "userID": 32}, {"id1": "1", "msg": "msw", "userID": 32}, {"id1": "1", "msg": "msw", "userID": 32}]

    const testMesages = fakeData

    // const [messages, setMessages] = useState([
    //   {
    //     _id: 1,
    //   //   text: 'Receiver message here',
    //     createdAt: new Date(),
    //     image: "https://shahed4u.click/wp-content/uploads/2022/06/MV5BMzU0MjM3YTQtZmNjYi00ODI5LThhYzQtOWMwZjAxMjg2MTRjXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX700-377x550.jpg",
    //     user: {
    //       _id: 2,
    //       name: 'Ahmed',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //       _id: 2,
    //       text: 'My message here',
    //       createdAt: new Date(),
    //       // pending: true,
    //       sent: true,
    //       // received: true,
    //       user: {
    //         _id: 1,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    // ]);
    
    const [messages, setMessages] = useState(messagesData);
    const [text, setText] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [rider, setRider] = useState(riderData ? riderData : []); 




    // const socketMessageRef = useRef();

    // useEffect(() => {
    // //  console.log("messages from support", route.params?.riderMessages)
    //   // socketMessageRef.current = io("http://192.168.0.6:5000");
    //    const socket = socketIOClient(ENDPOINT);
    //   // console.log("notification: new message received")
    //   socket.on("message", ({textMessage, riderID, messageId, createdAt}) => {
    //     if(riderID === rider?.id) {
    //               setMessages([...messages, 
    //                 {
    //                   _id: messageId,
    //                   text: textMessage,
    //                   createdAt: new Date(createdAt),
    //                   // pending: true,
    //                   sent: false,
    //                   // received: true,
    //                   user: {
    //                     _id: riderID,
    //                     name: "",
    //                     // avatar: 'https://placeimg.com/140/140/any',
    //                   },
    //                 }
    //             ]);
    //     }

    //   });

    // },[])


    useEffect(() => {
      if(!messagesData && rider.id) {
        console.log("messages before: ", messages)
        fetch_messages_request(rider.id)
      }
    
    },[])

    // useCallback((messages = []) => {
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])

    // useEffect(() => {
    //   // console.log("messages changed")
    //   setMessages(messagesData ? messagesData : [])
    // },[messagesData])

    useEffect(() => {
      // console.log(messagesData);
      setMessages(messagesData ? messagesData : undefined)
      }
    ,[messagesData])



// async function fetch_messages_request (myId: Number){

//   const function_name = "fetch_messages_request"
//   try{
//     await fetch('http://192.168.0.6:5000/fetchMessages', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     //  body: JSON.stringify({
//     //   "name": "jae"
//     // }),
     
//     body: JSON.stringify({
//          "riderID": myId,
//      })

//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
    
//     if(responseJson.empty) {
       
//     } else {
//         // console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
//         setMessages(responseJson)
//         // console.log("responseJson.lastDelivery",responseJson.lastDelivery)
//     }
//     // console.log(`here is the response: ${responseJson}`)
//   })

// } catch(error){
//     console.log(`error in ${function_name}: ${error}`)
// } 


// }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
    
        if (!result.cancelled) {
            setImageUri(result.uri);
          }
          
        };

        const takePhoto = async () => {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.cancelled) {
                setImageUri(result.uri);
            }
        };

        const {showActionSheetWithOptions} = useActionSheet();

        const onActionPress = (index) => {
            if(index === 0) {
                takePhoto()
            } else if(index ===2) {
                null
            } else {
                pickImage()
            }
        };

        const openMessageMenu = () => {

          

            const options = ["Take a photo"];
            
            options.push("Chose from library");
    
            options.push("Cancel")
            const destructiveButtonIndex = 1;
            const cancelButtonIndex = 2;
            
            showActionSheetWithOptions(
                {
                options,
            }, 
                onActionPress
            );
        } 

            
        
            
    

    // useEffect(() => {
    //   setMessages([
    //     {
    //       _id: 1,
    //     //   text: 'Receiver message here',
    //       createdAt: new Date(),
    //       image: "https://shahed4u.click/wp-content/uploads/2022/06/MV5BMzU0MjM3YTQtZmNjYi00ODI5LThhYzQtOWMwZjAxMjg2MTRjXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX700-377x550.jpg",
    //       user: {
    //         _id: 2,
    //         name: 'Ahmed',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //     {
    //         _id: 2,
    //         text: 'My message here',
    //         createdAt: new Date(),
    //         // pending: true,
    //         sent: true,
    //         // received: true,
    //         user: {
    //           _id: 1,
    //           name: 'React Native',
    //           avatar: 'https://placeimg.com/140/140/any',
    //         },
    //       },
    //   ])
    // }, [])

    // useEffect(() => {
    //     if(imageUri ) {
    //         console.log("imageUri: ", imageUri)
    //     }
    // }, [imageUri])

    useEffect(() => {
        
        (async () => {
          if (Platform.OS !== 'web') {
            const libraryResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const photoRosponse = await ImagePicker.requestCameraPermissionsAsync();
             if (
                libraryResponse.status !== 'granted' || 
                photoRosponse.status !== "granted"
                ) {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        
      }, []);


  
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

    
    const renderBubble = (props) => {

        return(
            <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: customStyles.authUserColor,
                }, 
                left: {
                    backgroundColor: customStyles.receiverColor,
                }
            }}

            textStyle={{
                right: {
                    color: customStyles.authUserTextColor
                }, 
                left: {
                    color: customStyles.receiverTextColor
                }
            }}
            />

        )
    }

        //TODO only send button customazation... if not included in the bottom contaner renderComposer
        const renderSend = (props) => {
            return(
                <Send
                {...props}
                >
                  
                <View>
                   {/* <MaterialCommunityIcons name="send-circle" style={[styles.sendButton, {opacity: (text ? 1: 0.5)}]} /> */}
                </View>
                
                </Send>
            )
        }
    
        const scrollToBottomIcon = () => {
            
            return (
                <FontAwesome name="angle-double-down" style={styles.scrollToButtomIcon}/>
            )
        }


    const Button = ({word, viewColor, iconName, iconColor, height, width, onPress}) => {

        return(
            <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.cancelButtonView, {
                backgroundColor: viewColor,
            }, height && { height: height, width: width } ]}
            >
            <FontAwesome name={iconName} style={[styles.scrollToButtomIcon, {marginLeft: "3%", color: iconColor}]}/>
        
            <Text
            style={styles.cancelText}
            >{word}</Text>
            </TouchableOpacity>
        )
      
    }



    const entireScreenWidth = Dimensions.get('window').width;
    const entireScreenHeigth = Dimensions.get('window').height;

    const sendMessage = () => {
        // console.log("message", message)
      //   onSend([
      //     {
      //      "_id": uuid.v4(),
      //      "createdAt": new Date(),
      //      "text": text,
      //      "image": imageUri ? imageUri : null,
      //      "user": {
      //        "_id": 1,
      //      },
      //    },
      //  ])
      const date = new Date()
      const messageId = uuid.v4()
      const riderID = rider.id
      const vendorID = null;
      const customerID = null;
      const textMessage = text
      console.log("text", text)
      const socket = socketIOClient(ENDPOINT);
      // socketMessageRef.current.emit("message", {textMessage, riderID, customerID, vendorID});
      socket.emit("message", {textMessage, riderID, customerID, vendorID});
      // setText("");

  }


const ImageView = () => {

        return (
            <View
     style={styles.imageView}
     >

            <View>
            <Text
            style={styles.photoWarningMessage}
            >
                {"You are about to send the following photo!"}
            </Text>
            </View>

          <Image
          style={styles.image}
          source={{uri: imageUri}}
          />

<View
style={{
    marginVertical: "5%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    width: "100%",
}}
>
<Button iconName={"close"} iconColor={"white"} viewColor={"red"} word={"Un send"} height={80} width={"45%"}
onPress={() => {
    Keyboard.dismiss()
    setShowImage(false);
    setImageUri(null);
    }}
/>
<Button iconName={"send"} iconColor={"white"} viewColor={customStyles.primaryColor} word={"Send photo"} height={80} width={"45%"}
onPress={() => {
    sendMessage();
    Keyboard.dismiss()
    setShowImage(false);
    setImageUri(null);
}
    
    }
/>


</View>
          </View>
        )
    }

    

  //TODO this is for custome styling the bottom container..
  const RenderComposer =  (props) => {
   
      const { text, messageIdGenerator, user, onSend } = props

      return (
          <>
          
          <View style={{
              flexDirection: 'row',
              flex: 1,
              backgroundColor: customStyles.primaryBackgroundColor,
            //   backgroundColor: "red",
              // width: wp('90%'),
              alignItems: "flex-end",
              paddingHorizontal: "5%",
          }}>
             
              <TouchableOpacity
              style={{
                  marginRight: "2%",
                  marginBottom: "1.2%",
                }}
                activeOpacity={0.5}
                onPress={openMessageMenu}
              >
             <EvilIcons name="camera" style={styles.cameraIcon} />

              </TouchableOpacity>

              <Text
             style={styles.verticalLine}
              >
                {"|"}
              </Text>

              <View style={{
                  width:"90%",
                  flexDirection: 'row',
              }}>

       
                 {Platform.OS === "android" && <Composer {...props} 
                  textInputStyle={styles.textInput} 
                  // composerHeight={"auto"}
                  />}
                  
                  {Platform.OS === "ios" && <Composer {...props} 
                  textInputStyle={styles.textInput}
                  
                  />}
      
                         
            <Send
            {...props}
            >
              
            <View>
               <MaterialCommunityIcons name="send-circle" style={[styles.sendButton, {opacity: (text ? 1 : 0.8)}]} />
            </View>
            
            </Send>
                          
                      
        
              </View>

          </View>

          </>
      );
  }




  const [imageUrls, setImageUrls] = useState([])
  const renderMessageImage = (props) => {
    const images = [{
      // Simplest usage.
      url: props.currentMessage.image,
      width: entireScreenWidth /1,
      // You can pass props to <Image />.
      props: {
        // headers: ...
      }
    }, 
    ];
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => {setImageUrls(images)}}>
        <Image
          source={{ uri: props.currentMessage.image }}
          style = {styles.messageImage}
        />
      </TouchableOpacity>
    );
  }


    return (
      <>
                {imageUri && <ImageView/> }
        
        <Modal 
        animationType="slide"
        transparent={false}
        visible={imageUrls.length > 0 ? true : false} 
        onRequestClose={() => setImageUrls([])}
        >
            <View
            style={{
                // marginTop: "15%",
                backgroundColor: "black",
                paddingTop: "15%"
            }}
            >
            <Button iconName={"close"} iconColor={"white"} viewColor={"rgba(0,0,0,0)"} word={"Close"} height={null} width={null}
            onPress={() => {
            setImageUrls([])}}
            />
            </View>
            
                <ImageViewer  imageUrls={imageUrls} 
                index={0}
                useNativeDriver={true}
                />

        </Modal>

     {!imageUri && <View style={{
         flex: 1,
          backgroundColor: customStyles.primaryBackgroundColor
      }}>
   <GiftedChat
          text={text}
          onInputTextChanged={text => setText(text)}
          messages={messages}
          // onSend={sendMessage}
          onSend={message => onSend(message)}
          user={{
            _id: rider?.id,
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          // inverted={false}
          
          isTyping={false}
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={scrollToBottomIcon}
          renderComposer={RenderComposer}
          bottomOffset={Platform.OS == "ios" ? 35 : 0}
          keyboardShouldPersistTaps={'handled'}
        //   renderMessageImage={(props) => (<MessageImage props={props}/>)}
        
         renderMessageImage={renderMessageImage}
        //  imageProps={{openImageViewer: openImageViewer}}
         
          
          
        //   maxComposerHeight={1000}
          
        //   minComposerHeight={entireScreenHeigth / 12}
          // minInputToolbarHeight={1000}
          // renderInputToolbar={renderInputToolbar}
          
        />
   {
      // Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
</View>}
</>
        
      )
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
sendButton: {
    fontSize: "30rem",
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
messageImage : {
    width: "250rem",
    aspectRatio: 1,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
}


});

