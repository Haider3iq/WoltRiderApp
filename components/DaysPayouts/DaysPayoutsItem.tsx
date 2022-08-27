
import React, {useState, useEffect, useMemo, useCallback, Component, useRef} from "react";
import {
    View,
    TouchableOpacity,
    Text,
} 


from "react-native";
import {useNavigation,} from "@react-navigation/core";
import moment from "moment";
import { useFonts } from "expo-font";

import styles from "./PayoutsStyles";
import { MaterialIcons } from "@expo/vector-icons";


export default function DaysPayoutsItem ({item, index }) {


    const navigation = useNavigation();
    // const payoutDate = moment(item.date).format('L')
    const payoutDate = moment(item.date).format('YYYY-MM-DD')
  
  
    return(
    <>
    {/* //Notification */}
    <TouchableOpacity onPress={() => {navigation.navigate("Deliveries", {riderID: null, deliveriesDate: payoutDate})} } activeOpacity={0.7} style={styles.settingView}>
  
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