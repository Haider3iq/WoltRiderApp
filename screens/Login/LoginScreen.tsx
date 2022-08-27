import React, { useEffect, useState } from "react";
import {View, Text, Dimensions, Image, TextInput, Keyboard, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Modal} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../AppTheme/customStyles";
import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { color } from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from "../../components/SplashScreen";
import loginImage from "../../assets/images/loginImage.png"
import { useSelector, useDispatch } from "react-redux";

import uuid from 'react-native-uuid';

import { 
    setRiderData, 
    setRiderTasks, 
    setRiderNewTask, 
    setRiderMessages, 
    setRiderNewMessage, 
    setRiderPayouts,
    setRiderLastDelivery,
    setNewDevice,
} 
from "../../src/redux/actions"



//socket.io
import socketIOClient from "socket.io-client";
import { Store } from "../../src/redux/store";
import NoteMessage from "../../components/NoteMessage";
const ENDPOINT = "http://192.168.0.6:5000";







async function saveCredentails(email_key: string, email_value: string, password_key : string, password_value :string) {
    await SecureStore.setItemAsync(email_key, email_value);
    await SecureStore.setItemAsync(password_key, password_value)
  }

export default function LoginScreen () {

    const {newDevice} = useSelector(state => state.riderReducer)
    
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [emailLine, setEmailLine] = useState("");
    const [passwordLine, setPasswordLine] = useState("");
    const [data, setData] = useState([]);
    const [showSplashScreen, setShowSplashScreen] = useState(true)
    const [showModal, setShowModal] = useState(false);

    //redux
    

    const dispatch = useDispatch();


    const route = useRoute();

    const deleteCredentails = route?.params?.delete; 

    const anotherDevice = route?.params?.anotherDevice; 



    const navigation = useNavigation();


    const code = uuid.v4();

    const login_request = async (email_key: string, password_key: string) => {
        
        // console.log("here we got")
        const function_name = "login_request"
        setLoading(true)

        try{
            await fetch('http://192.168.0.6:5000/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            //  body: JSON.stringify({
            //   "name": "jae"
            // }),
             
            body: JSON.stringify({
                 "email": email_key,
                 "password" : password_key,
             })
    
          })
          .then((response) => response.json())
          .then((responseJson) => {
            
            if(responseJson.empty) {
                setEmailLine(responseJson.empty)
                setShowSplashScreen(false);
                setLoading(false);
            } else {
                // console.log("email", typeof responseJson[0].email, "password", typeof responseJson[0].password)
                saveCredentails("email", responseJson.riderData.email, "password", responseJson.riderData.password)
                // navigation.navigate("Home", {
                //     data: responseJson[0],
                //     riderName: `${responseJson[0]?.firstName} ${responseJson[0]?.lastName}`,
                // })
                // console.log("messages", responseJson.riderMessages)


               
                const riderID = responseJson.riderData?.id 


                //live update rider login 
                const socket = socketIOClient(ENDPOINT); 
                const data : [] = newDevice ? newDevice : [];
                data.push(code)
                Store.dispatch(setNewDevice(data));
                // console.log("code: ", code)
                // console.log("new device code: ", newDevice);
                // console.log("current device code and new device code match: ", newDevice == code ? "true" : "false")
                // console.log("login mounting times")
                socket.emit("riderLogin", {riderID, code});

                Store.dispatch(setRiderData(responseJson.riderData))
                Store.dispatch(setRiderTasks(responseJson.activeDeliveries))
                Store.dispatch(setRiderMessages(responseJson.riderMessages))
                Store.dispatch(setRiderLastDelivery(responseJson.lastDelivery))
                // dispatch(setRider(responseJson.riderData))
                // dispatch(setRider(responseJson.riderData))
                setEmailLine("");
                setPasswordLine("");
                navigation.navigate("WorkingScreen", {
                    data: responseJson.riderData,
                    riderMessages: responseJson.riderMessages,
                    riderName: `${responseJson?.riderData.firstName} ${responseJson?.riderData.lastName}`,
                    deliveries: responseJson.activeDeliveries,
                    lastDelivery: responseJson.lastDelivery,
                    deviceCode: code
                })
                
                // navigation.navigate("WorkingScreen", {data: responseJson[0]})
                
                setPassword("");
                setEmail("");
                setLoading(false);
                // console.log(`responsejson: ${JSON.stringify(responseJson[0])}`);
                setShowSplashScreen(false);
            }
            // console.log(`here is the response: ${responseJson}`)
          })

        } catch(error){
            console.log(`error in ${function_name}, ${error}`)
        } 
        
    }


    async function getValueFor(first_key: string, second_key: string) {
        let email_key = await SecureStore.getItemAsync(first_key);
        let password_key = await SecureStore.getItemAsync(second_key);
        // console.log("email: ", email_key, "password: ", password_key)
        if (email_key && password_key) {
            // console.log("email: ", email_key, "password: ", password_key)
          login_request(email_key, password_key)
        } else {
          setShowSplashScreen(false);
        }
      }

      async function deleteValueFor(first_key: string, second_key: string) {
        await SecureStore.deleteItemAsync(first_key);
        await SecureStore.deleteItemAsync(second_key);
      }



      

    const onLoginPress = () => {
        if(email && password) {
            login_request(email,password);
        } else if (!email) {
            setEmailLine("Email field can't be blank");
        } else if (!password) {
            setPasswordLine("Password field can't be blank");
        }
    }
    

    


    useEffect(() => {
       
        const unsubscribe = navigation.addListener('focus', () => { 
            console.log(anotherDevice)
            if(anotherDevice === "Another device has just connected to this account!") {
                setShowModal(true)
            }
        })
        return unsubscribe
    }, [anotherDevice])
    



    useEffect(() => {
        if(!anotherDevice) {
            getValueFor("email", "password")
            // setShowSplashScreen(false);
        } 
     },[])
     
      useEffect(() => {
       if(deleteCredentails){
          deleteValueFor("email", "password")
       }
      },[deleteCredentails])


   useEffect(() => {
       if(email) {
           setEmailLine("")
       }
   },[email])

   useEffect(() => {
       if(password) {
           setPasswordLine("")
       }
   },[password])






    let sampleImageUri = "https://shahed4u.click/wp-content/uploads/2022/06/MV5BMzU0MjM3YTQtZmNjYi00ODI5LThhYzQtOWMwZjAxMjg2MTRjXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX700-377x550.jpg"

    return (
        <>

        <Modal
         statusBarTranslucent
         // style={{backgroundColor: "red", paddingBottom: 300}}
         animationType="slide"
        transparent={true}
        visible={showModal} 
        >

           <NoteMessage 
           text={anotherDevice} IconMarkName={Ionicons} buttonText={"Yes, I know"} hideButton={false} 
           onPress={() => setShowModal(it => !it)}/>
            
        </Modal>
        <View style={{backgroundColor: customStyles.primaryBackgroundColor, height: "100%", width: "100%", position: "absolute"}} />
        
        {showSplashScreen && <SplashScreen/>}


        

        {!showSplashScreen && 
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainView}
        // keyboardVerticalOffset={-100}
        >
            
            <TouchableOpacity
            onPress={() => Keyboard.dismiss()}
            activeOpacity={1}
            style={{paddingTop: "8%", paddingBottom: "4%", backgroundColor: customStyles.primaryBackgroundColor}}
             >
                <Image
                style={styles.loginImage} 
                source={loginImage}
                />
            </TouchableOpacity>
            
        <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
        
       
        >

            {/* <View>
                <Image
                style={styles.mainImage} 
                source={{uri: sampleImageUri}}
                />
            </View> */}


            {/* <View
            style={{
                marginVertical: "8%",
            }}
            >
                <Text
                style={styles.mainTitleText}
                >
                        {"Login"}
                </Text>
            </View> */}



            


            <View
           style={{paddingHorizontal: "5%", marginBottom: "10%"}}
            >

            {emailLine.length > 0 && <View
            style={[styles.linkView, {justifyContent: "flex-start"}]}
            >
                <Text
                style={[styles.linkText, {color: customStyles.negativeColor}]}
                >
                    {emailLine}
                </Text>


            </View>}

                    <Text
                    style={styles.titleText}
                    >
                        {"Email"}
                    </Text>
                        <TextInput
                        maxLength={100}
                        style={[styles.inputStyle, , {paddingVertical: "10%", marginVertical: "-10%"}]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Your email address goes here"
                        placeholderTextColor={customStyles.whiteGray}
                        />
                        
                    <View style={[styles.separator, {backgroundColor: (emailLine ? customStyles.negativeColor : customStyles.widgetColor)}]}/>
            </View>


            
            <View
            style={{paddingHorizontal: "5%", marginBottom: "5%"}}
            >

                    {passwordLine.length > 0 && <View
                        style={[styles.linkView, {justifyContent: "flex-start"}]}
                        >
                            <Text
                            style={[styles.linkText, {color: customStyles.negativeColor}]}
                            >
                                {passwordLine}
                            </Text>


                        </View>}

                
                    <Text
                    style={styles.titleText}
                    >
                        {"Password"}
                    </Text>
                    <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                    >
                        <TextInput
                        maxLength={100}
                        style={[styles.inputStyle, , {paddingVertical: "10%", marginVertical: "-10%"}]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Your password goes here"
                        placeholderTextColor={customStyles.whiteGray}
                        secureTextEntry={showPassword ? false : true}
                        
                        />
                       <Entypo 
                       onPress={() => setShowPassword(it => !it)} 
                       name={showPassword ? "eye-with-line" : "eye"} 
                       style={styles.eyeIcon} 
                       />
                    </View>
                        
                    <View style={[styles.separator, {backgroundColor: (passwordLine ? customStyles.negativeColor : customStyles.widgetColor)}]}/>
            </View>


           <TouchableOpacity
           onPress={onLoginPress}
           activeOpacity={0.8}
           style={styles.loginButton}
           >
               {!loading && <Text
               style={styles.loginText}
               >
                   {"Login"}
               </Text>}

               {loading &&
                   <ActivityIndicator size={"small"} color="white" />
               }

           </TouchableOpacity>
            

            <View
            style={styles.linkView}
            >
                <Text
                style={styles.linkText}
                >
                    {"Don't have an account ? "}
                </Text>

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {}}
                >
                <Text
                style={styles.applyText}
                >
                {"Apply for Haidori now"}
                </Text>

                </TouchableOpacity>


            </View>

            
            {/* <View
            style={[styles.linkView, {marginTop: "5%"}]}
            >
                <View style={[styles.separator, {position: "absolute", bottom: "80%", marginHorizontal: "20%"}]}/>
                <Text
                style={[styles.linkText, {backgroundColor: customStyles.primaryBackgroundColor, paddingHorizontal: "2%"}]}
                >
                    {"Having issues?"}
                </Text>
            </View>


             <View
            style={styles.linkView}
            >
                <Text
                style={styles.applyText}
                >
                    {"Contact support now  "}
                </Text>

                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {}}
                >
                <Entypo 
                       
                       name={"help-with-circle"} 
                       style={styles.eyeIcon} 
                       />

                </TouchableOpacity>
            </View> */}

        </TouchableOpacity>
        
        </KeyboardAvoidingView>}



        
        
        <StatusBar style={customStyles.statusbar} />
        </>
    )
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({

  mainView: {
    padding: "5%",
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: customStyles.primaryBackgroundColor,
    height: "100%",
   
    // flex:1,
  },
  mainImage: {
      width: "100%",
      aspectRatio: 3/3,
  },
  loginImage: {
   
    width: "100%",
    height: "200rem",
    borderRadius: "10rem",
    // aspectRatio: 3/3,
},
  separator: {
    paddingVertical: "1rem",
    width: '100%',
    backgroundColor: customStyles.widgetColor,    
    // opacity: 0.05,
  },
  mainTitleText: {
      fontSize: "40rem",
      color: customStyles.secondPrimaryColor,
      fontWeight: customStyles.fontWeight
  },

  titleText: {
      fontSize: "20rem",
      fontWeight: customStyles.fontWeight,
      color: customStyles.secondPrimaryColor,
      opacity: 0.8,
      marginBottom: "5rem"
  },
  inputStyle: {
      fontSize: "15rem",
      maxWidth: "100%",
      minWidth: "90%",
      color: customStyles.secondPrimaryColor,
      
  },
  
  eyeIcon: {
      fontSize: "20rem",
      color: customStyles.secondPrimaryColor
  },

  loginButton:{
    backgroundColor: customStyles.primaryColor,
    height: "45rem",
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: "10rem",
    alignItems: "center",

  },
  loginText: {
      color: customStyles.white,
      fontSize: "20rem",
      paddingVertical: "8rem",
      
  },

  linkView: {
    alignItems: "center",
    paddingVertical : "10rem",
    justifyContent: "center",
    flexDirection: "row",
  },


  linkText: {
      color: customStyles.whiteGray,
      fontSize: "15rem",
  },

  applyText: {
      color: customStyles.textPrimaryColor,
      fontSize: "15rem",
    //   fontWeight: customStyles.fontWeight,
  }
 
});