import React, { useEffect, useState } from "react";
import {View, Text, Image, ScrollView} from "react-native"
import RiderTask from "../RiderTask";
import siteMapPhoto from "../../assets/images/sitemap.png";
import styles from "../../screens/WorkingScreen/WorkingScreenStyles";
import customStyles from "../../AppTheme/customStyles";
import { useNavigation } from "@react-navigation/native";



export default function NewTaskScreen ({riderNewTask, acceptNewTask, skipNewTask, }) {


const [timer, setTimer] = useState(0)
const [newTaskReadyAt, setNewTaskReadyAt] = useState("");

const navigation = useNavigation();


    useEffect(() => {

        var nowDate = new Date()
          const nowTime = nowDate.getTime() / (1000 * 60);
          const mustBeReadyTime = new Date(riderNewTask?.mustBePreparedAt).getTime() / (1000 * 60);
          const mustBeReadyAt = mustBeReadyTime - nowTime
        setNewTaskReadyAt(`${mustBeReadyAt.toFixed()} min`)
          setTimer(15)
    }, [])

    useEffect(() => {

        if(riderNewTask?.id > 0) {
          const interval = setInterval(() => {
            if(timer >= 1) {
              setTimer(it => it - 1)
            //   console.log("test: ", timer)
            }
        }, 1000);
        return () => clearInterval(interval);
        }
      
        if(timer <= 0) {
      
          //TODO call skipNewTask function here <=
          // setNewTask({})
        }
      
      
      },[timer])




    return(
        <>
        <ScrollView
        style={{backgroundColor: customStyles.widgetColor}}
        alwaysBounceVertical={false}
        >
          
          <View
          style={
            styles.newTaskModalView
          }
          >
             <Text
            style={styles.newTaskTitle}
            >
              {"New Delivery"}
            </Text>
            
          <Image
          source={siteMapPhoto}
          style={styles.newTaskimage}
          />

           
          </View>



         
           <RiderTask 
          details={null}
          widgetColor={undefined}
          widget1firstTitle={riderNewTask?.vendorName}
          widget1firstText={riderNewTask?.customerAddress}
          widget1firstIcon={"ios-location"}
          widget1secondText={newTaskReadyAt !== "0" ? newTaskReadyAt : null}
          widget1secondIcon={"ios-checkmark-circle"}
          widget1thridText={`${riderNewTask?.distance} KM`}
          widget1thridIcon={"ios-walk-outline"}

          widget1firstButtonPress={() => {
            // console.log("before navigating messages", riderMessages); 
          navigation.navigate("support")}}
          mainButtonColor={"white"}
          mainButtonIcon={"ios-checkmark-circle"}
          mainButtonText={"Take task"}
          onMainButtonPress={acceptNewTask}
          onTopButtonPress={skipNewTask}
          timerValue={timer}
          /> 
          {/* <View
          style={{backgroundColor: "white", height: "100%", }}
          /> */}


        </ScrollView>

       
        </>
    )
} 