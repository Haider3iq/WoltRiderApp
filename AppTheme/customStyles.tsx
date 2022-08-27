import React from "react";
import { ColorSchemeName, Appearance, Platform} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import customerPlace from "../assets/images/customerPlace.png"
// import resturantPng from "../assets/images/fast-food.png"
import vendorPlace from "../assets/images/vendorPlace.png"




export default {
        statusbar: (Appearance.getColorScheme() === 'dark' ? "light" : "dark"),
        primaryBackgroundColor:(Appearance.getColorScheme() === 'dark' ? "#202124" : "#fff") ,
        secondPrimaryColor: (Appearance.getColorScheme() === 'dark' ? "#fff" : "#202124"),
        whiteGray: (Appearance.getColorScheme() !== 'dark' ? "rgba(13,17,23,0.5)" : "rgba(255,255,255,0.7)"),
        // primaryColor: "lightgreen",
        primaryColor: "#6043D5",
        textPrimaryColor: (Appearance.getColorScheme() === 'dark' ? "#fff" : "#6043D5"),
        white: "#fff",
        negativeColor: "red",
        dividerColor: (Appearance.getColorScheme() === 'dark' ? "rgba(255,255,255,0.3)" : "white") ,
        fontWeight: (Platform.OS === "ios" ? "600" : "700"),
        customerPlace: customerPlace,
        vendorPlace: vendorPlace,
        // carPng: carPng,
        widgetColor: (Appearance.getColorScheme() === 'dark' ? "#393F48" : "#ECF0F3"),
        taskBackgroundColor: (Appearance.getColorScheme() === 'dark' ? "#202124" : "#fff"),
        taskSecondColor: (Appearance.getColorScheme() === 'dark' ? "#fff" : "#202124"),
        successColor: "#25D366",
        speacialColor: "orange",

        //Chat theme colors 

        authUserColor:  "#6043D5",
        receiverColor: (Appearance.getColorScheme() === 'dark' ? "#202124" : "#F4F8FB"),
        receiverTextColor: (Appearance.getColorScheme() === 'dark' ? "#fff" : "#161B22"),
        authUserTextColor: "#fff"
        //secondaryColor: (Appearance.getColorScheme() === 'dark' ?  "#202124" : "#fff"),
}

// purple: "#6043D5"



