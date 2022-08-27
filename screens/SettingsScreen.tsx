import React, {useEffect, useState, } from 'react';
import { StyleSheet, SafeAreaView, Image, Platform, ScrollView, TouchableOpacity, Dimensions, Linking, Share, Modal } from 'react-native';
import { Text, View, } from 'react-native';
import { Feather, MaterialIcons, Fontisto, Ionicons, Entypo, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'; 
// import {User} from "../../src/models"
import { useNavigation, useRoute } from '@react-navigation/core';
import EStyleSheet from 'react-native-extended-stylesheet';
import customStyles from '../AppTheme/customStyles';
import previousDelivery from "../assets/images/schedule.png";
import settingPhoto from "../assets/images/setting.png";
import { useActionSheet } from '@expo/react-native-action-sheet';
import moment from 'moment';
import { acceptNewTask, addNewTask, skipNewTask } from '../src/functions';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import NewTaskScreen from '../components/ScreenComponents/NewTaskScreen';
import { Store } from '../src/redux/store';
import { setRiderNewTask } from '../src/redux/actions';
// import SettingsHeader from '../../navigation/SettingsHeader/SettingsHeader';
// import * as Sharing from 'expo-sharing';
// import Share from 'react-native-share';


export default function SettingsScreen() {
  
  const [bounce, setBounce] = useState(true);
   const route = useRoute();

   const date = new Date();
   const dateOfToday = moment(date).format('YYYY-MM-DD')
   const fakeDate = "2022-06-09"

   useEffect(() => {
    console.log(dateOfToday)
   },[])

   const rider = route.params?.rider

    const navigation = useNavigation()

    const handleOpenSettings = () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 
        'TakeAway Courier | A delivery dashboard app that TakeAway Couriers can use in order to work with TakeAway https://www.google.com/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const shareApp = () => {
    Linking.openURL("https://expo.dev")
  }



  const OptionButton = ({text, IconMark,  iconName, iconColor, onPress}) => {

    return(
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={styles.threeElement}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
              <View style={styles.iconView} >
              <IconMark name={iconName} style={styles.iconSize} color={iconColor}/>
               </View>

               <Text style={styles.title} >
              {text}
              </Text>
              </View>
              
              
              <View style={{justifyContent: "center"}} >
               <MaterialIcons name="arrow-forward-ios" style={styles.arrowIcon} color={customStyles.secondPrimaryColor}/>
               
               </View>
               
            </View>
            </TouchableOpacity >
    )
  }

  const LoginButton = ({IconMark, onPress, iconName, iconColor}) => {

    return(
      <View style={{alignItems: "center", marginTop: "2.5%"}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={onPress} style={styles.loginButtonView}>
      
      {/* //The default one MaterialIcons */}
      <IconMark name={iconName} style={styles.iconSize} color={iconColor} />
      <Text style={{color:"white", fontWeight: customStyles.fontWeight,}}> Logout </Text>
        
      </TouchableOpacity>
      </View>
    )
  }




  const {showActionSheetWithOptions} = useActionSheet();

  const onActionPress = (index) => {
      if(index === 0) {
          navigation.navigate("Login", {"delete": true})
      } else if(index ===2) {
          null
      } 
      // else {
      //     // pickImage()
      // }
  };

  const openMessageMenu = () => {

    
      
      const options = ["Logout"];
      
      // options.push("Chose from library");

      options.push("Cancel")
      const destructiveButtonIndex = 0;
      const cancelButtonIndex = 2;
      const title = "Are you sure you want to logout?"
      
      showActionSheetWithOptions(
      {
          title,
          options,
          destructiveButtonIndex,
      }, 
          onActionPress,
      );
  } 




  
    
  //await DataStore.clear();

  

const {newTask, tasks, riderData} = useSelector(state=> state.riderReducer)


  
  return (
    <>


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


  <ScrollView  style={styles.container}
  >
     <View
   style={{backgroundColor: customStyles.widgetColor, width: "100%", height: "100%", position: "absolute"}}
   />
  <View
          style={
            styles.modalView
          }
          >
            
            




          <View
          style={styles.imageView}
          >

         
          <Image
          source={settingPhoto}
          style={styles.image}
          />
           </View>

    
           
    </View>
      
     {/* //Profile */}
     <View style={styles.settingView}>
       
       <TouchableOpacity>
             <View style={styles.lastElemet}>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={styles.iconView} >
                <Image style={styles.profileImage} source={{uri: "https://shahed4u.click/wp-content/uploads/2022/06/MV5BMzU0MjM3YTQtZmNjYi00ODI5LThhYzQtOWMwZjAxMjg2MTRjXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX700-377x550.jpg"}}/> 
                 </View>
  
 
                 <View>
                 <Text style={styles.title}>
                {`${rider?.firstName} ${rider?.lastName}`}
                </Text>

                 <Text style={styles.discraption}>
                {`You are currently ${rider?.onlineStatus}`}
                </Text>
                 </View>
                 
                </View>

                
                
                <View style={{justifyContent: "center"}} >
                 {/* <MaterialIcons name="arrow-forward-ios" style={styles.arrowIcon} color={customStyles.secondPrimaryColor}/> */}
                 
                 </View>
              </View>
              </TouchableOpacity>
     </View>




     
        {/* //Body */}
        <View style={styles.settingView}>



            <OptionButton text={"Payouts"} IconMark={MaterialCommunityIcons} iconName={"finance"} iconColor={"#00BCF2"} 
            onPress={()=> navigation.navigate("Payouts", {"rider": rider})} />

            <View style={styles.separator}/>

            <OptionButton text={"Delivery history"} IconMark={MaterialIcons} iconName={"history"} iconColor={"#79DB75"} 
            onPress={()=> {navigation.navigate("Deliveries", {riderID: rider?.id, deliveriesDate: dateOfToday})}} />

            <View style={styles.separator}/>

              <OptionButton text={"Scores"} IconMark={FontAwesome} iconName={"eye"} iconColor={"orange"} 
            onPress={()=> {}} />
              
        </View>




        
{/* ////////////////////////////////////////////////////////////////////////////*/}

         <View style={styles.settingView}>

            <OptionButton text={"Permissions"} IconMark={MaterialIcons} iconName={"notifications"} iconColor={"red"} 
            onPress={handleOpenSettings} />
            {/* <View style={styles.separator}/> */}

        </View>


{/* ////////////////////////////////////////////////////////////////////////////*/}

       <View style={styles.settingView}>


            <OptionButton text={"Share app"} IconMark={Ionicons} iconName={"ios-share"} iconColor={"#00BCF2"} 
            onPress={onShare} />
            <View style={styles.separator}/>

            <OptionButton text={"Help"} IconMark={MaterialIcons} iconName={"support"} iconColor={"lightgreen"} 
            onPress={() => navigation.navigate("support")} />
        </View>
      
      {/* //Login style */}
      <LoginButton IconMark={MaterialIcons} onPress={openMessageMenu} iconName={"logout"} iconColor={"white"} />
      

   </ScrollView>
   </>

  );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
  container: {
    backgroundColor: customStyles.primaryColor,
  },
  // separator: {
  //   marginVertical:"30rem",
  //   height: 1,
  //   width: '80%',
  // },
  separator: {
    paddingVertical: "1rem",
    marginBottom: "1rem",
    // marginVertical: "10rem",
    marginHorizontal: "-10%",
    width: '150%',
    backgroundColor: customStyles.widgetColor,
    // opacity: 0.05,
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
    marginRight: "15rem"
  },

  threeElement: {
    margin: "5rem", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    // borderBottomWidth: "0.5rem", 
    borderColor: customStyles.dividerColor, 
    paddingVertical: "10rem",
  },

  lastElemet: {
      margin: "5rem", 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "space-between",  
      borderColor: customStyles.dividerColor, 
      paddingVertical: "5rem",
  }, 
  loginButtonView: { 
    backgroundColor: customStyles.primaryColor , 
    height: "50rem", 
    width: "300rem", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: "15rem", 
    marginBottom: "15%",
  },

  iconSize: {
    fontSize: "20rem"
  }, 

  arrowIcon: {
    fontSize: "12rem"
  },

  settingView: {
    backgroundColor: customStyles.primaryBackgroundColor, 
    margin: "10rem", 
    padding: "10rem", 
    borderRadius: "15rem",
    justifyContent: "center",
    marginHorizontal: "5%",
  },

  iconSizeBigger: {
    fontSize: "25rem"
  }, 
  title: {
    fontSize: "15rem",
    color: customStyles.secondPrimaryColor
  },
  profileImage: {
    width: "45rem",
    height: "45rem",
    borderRadius: "10rem"
  },
  discraption: {
    fontSize: "12rem",
    color: customStyles.whiteGray,
    // fontWeight: customStyles.fontWeight,
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





<>
{/* //Privacy */}
<View style={styles.threeElement}>
 
 <View style={{flexDirection: "row", alignItems: "center"}}>
   <View style={styles.iconView} >
   <MaterialIcons name="lock" style={styles.iconSize} color={customStyles.secondPrimaryColor} />
    </View>

    <Text style={styles.title}>
   Privacy
   </Text>
   </View>
   


   <View style={{justifyContent: "center"}} >
    <MaterialIcons name="arrow-forward-ios" style={styles.arrowIcon} color={customStyles.secondPrimaryColor}/>
    
    </View>
 </View>

  {/* //Data and Storage */}
  <View style={styles.threeElement}>
   
   <View style={{flexDirection: "row", alignItems: "center"}}>
     <View style={styles.iconView} >
     <MaterialIcons name="storage" style={styles.iconSize} color="#40AE5E" />
      </View>

      <Text style={styles.title}>
     Data and Storage
     </Text>
     </View>
     
     <View style={{justifyContent: "center"}} >
      <MaterialIcons name="arrow-forward-ios" style={styles.arrowIcon} color={customStyles.secondPrimaryColor}/>
      
      </View>
   </View>

   {/* //Language */}
 <View style={styles.lastElemet}>
   
   <View style={{flexDirection: "row", alignItems: "center"}}>
     <View style={styles.iconView} >
     <Entypo name="language" style={styles.iconSize} color="#83BEEC" />
      </View>

      <Text style={styles.title}>
     Language
     </Text>
     </View>
     
     <View style={{justifyContent: "center"}} >
      <MaterialIcons name="arrow-forward-ios" style={styles.arrowIcon} color={customStyles.secondPrimaryColor}/>
      
      </View>
   </View>
</>


