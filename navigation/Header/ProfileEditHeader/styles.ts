import {Dimensions, StyleSheet} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../../AppTheme/customStyles"

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
    
  
  header:{
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "100%", 
    alignItems: "center",
    backgroundColor: colors.primaryBackgroundColor,
    paddingRight: 15,
    paddingLeft:15,
    paddingTop: 50,
    paddingBottom: "18%",
    marginBottom: "-50rem",
      
    
    },
  
    image:{
      width: 40, 
      height: 40, 
      borderRadius: 40,
    },
    editIcon:{
      marginHorizontal: 5,
      marginRight: 20,
    },
    text: {
      flex: 1, 
      textAlign: "center",
      marginLeft: 20,
      fontWeight: "bold",
      
    },
  
      textInputView:{
        flexDirection: "row",
        alignContent: "center",
        flex: 1,
        marginRight:10,
        padding : 10,
        backgroundColor: "#F6F9FA",
        borderRadius: 15,

    },
    textInput:{
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 20,
    },

    createButton: {
      marginRight: 10,
    },
  })

  


export default styles;
