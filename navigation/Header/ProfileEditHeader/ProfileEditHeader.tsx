import { StatusBar } from 'expo-status-bar';
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react"
import {Text, View, Image, Pressable, TextInput, Platform,} from "react-native"
import styles from "./styles";


export default function ProfileEditHeader () {



    const navigation = useNavigation();


  
return (
      <View style={styles.header}>

        <Pressable onPress={() => navigation.goBack()} style={{
          flexDirection: "row",
          alignItems: "center",
          }}>
        <View style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2,} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2,} } >
               <Ionicons name="arrow-back" size={30} color="white"/>
               
               </View>
        
        </Pressable>
        
        <Text style={{color: "white", fontWeight: "700", fontSize: 20,}} > Edit profile </Text>

        <Pressable onPress={() => navigation.goBack()} style={{
          flexDirection: "row",
          alignItems: "center",
          }}>
        <View style={Platform.OS === "ios" ? {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5} : {borderWidth: 1.5, borderColor: "white", borderRadius: 5, padding: 2, marginRight: 5,} } >
        <MaterialIcons name="file-download-done" size={30} color="white" />
               </View>
        
        </Pressable>
        

      
      
    
      <StatusBar style={"light"} />
      </View>
  );
}