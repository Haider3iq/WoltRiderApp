import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react"
import { View, Text, Dimensions, TouchableOpacity} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../AppTheme/customStyles";




export default function NoteMessage ({IconMarkName ,text, buttonText, hideButton, onPress, iconName, iconColor, buttonColor, noteIcon, noteIconName}) {




    const LoginButton = ({IconMark, iconName, iconColor, buttonText, buttonColor}) => {

        return(
          <View style={{alignItems: "center", marginVertical: "2.5%",}}>
          <TouchableOpacity  activeOpacity={0.7} onPress={onPress} style={[styles.loginButtonView, {backgroundColor: buttonColor}]}>
          
          {/* //The default one MaterialIcons */}
          <IconMark name={iconName} style={styles.iconSize} color={iconColor} />
          <Text style={styles.buttonText}> {buttonText} </Text>
            
          </TouchableOpacity>
          </View>
        )
      }
         
    return (
        <View
        style={styles.mainPageView}
        >
                <View style={styles.secondView}>
                        <View style={styles.textView}>
                            <Text style={styles.text}>
                                {text}
                            </Text>

                            {!noteIcon && <Ionicons name={noteIconName ? noteIconName : "ios-phone-portrait"} style={styles.icon} />}
                        </View>


                        {!hideButton && <LoginButton IconMark={IconMarkName ? IconMarkName : Ionicons} iconName={iconName ? iconName : "checkmark-circle"} iconColor={iconColor ? iconColor : customStyles.white} buttonText={buttonText ? buttonText : "set hide button to true"} buttonColor={buttonColor ? buttonColor : customStyles.primaryColor}/>}
                </View>    
        </View>
    )
};

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles  = EStyleSheet.create({
  mainPageView:{
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(96,67,213,0.4)",

    justifyContent: "center",
  },

  secondView: {
    backgroundColor: customStyles.primaryBackgroundColor,
    alignItems: "center",
    padding: "5%",
    margin: "5%",
    borderRadius: "10rem",
  },

  textView: {

  },

  text: {
    color: customStyles.secondPrimaryColor,
    fontSize: "18rem",
    fontWeight: customStyles.fontWeight,
    
  }, 

  backgroundPage: {
    backgroundColor: customStyles.widgetColor, 
    width: "100%", 
    height: "100%", 
    position: "absolute", 
    borderBottomRightRadius: "40rem",
    borderBottomLeftRadius: "40rem"
  },
  separator: {
    paddingBottom: "1rem",
    marginBottom: "20rem",
    
    width: '200%',
    backgroundColor: customStyles.secondPrimaryColor,
    opacity: 0.09
  },

  iconView: {
    borderWidth: "1.5rem", 
    borderColor: "rgba(0,0,0,0.0)", 
    borderRadius: "5rem", 
    padding: "2rem", 
    marginRight: "15rem"
  },

  loginButtonView: { 
    backgroundColor: customStyles.primaryColor , 
    height: "50rem", 
    width: "300rem", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: "15rem", 
    marginTop: "5%",
  },

  
  iconSize: {
    fontSize: "20rem"
  }, 
  buttonText: {
    color:"white", 
    fontWeight: customStyles.fontWeight,
    fontSize: "18rem"
  },

  icon: {
      fontSize: "35rem",
      alignSelf: "center",
      paddingTop: "5%",
      color: customStyles.secondPrimaryColor,
  }

});
