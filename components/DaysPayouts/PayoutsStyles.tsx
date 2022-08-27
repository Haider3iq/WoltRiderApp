import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../AppTheme/customStyles";



const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const PayoutsStyles  = EStyleSheet.create({
  container: {
    
   flex:1,
    backgroundColor: customStyles.primaryColor,
    paddingBottom: "30rem"
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
    marginRight: "15rem",
    alignSelf: "flex-end"
  },

  payoutView: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    // borderBottomWidth: "0.5rem", 
    borderColor: customStyles.dividerColor, 
    paddingVertical: "15rem",
  },

  iconSize: {
    fontSize: "20rem"
  }, 

  arrowIcon: {
    fontSize: "12rem",
  },

  headerArrow: {
    fontSize: "14rem"
  },


  payoutAmountText: {
    fontSize: "15rem",
    color: customStyles.white,
  },

  payoutAmountView: {
    padding: "5%",
    borderRadius: "8rem",
    backgroundColor: customStyles.primaryColor,
    marginRight: "50rem",
  },

  title: {
    fontSize: "15rem",
    color: customStyles.secondPrimaryColor,
    marginLeft: "10rem"
  },
  settingView: {
    backgroundColor: customStyles.primaryBackgroundColor, 
    margin: "10rem", 
    padding: "10rem", 
    borderRadius: "15rem",
    justifyContent: "center",
    marginHorizontal: "5%",
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
    width: "130rem", 
    height: "130rem", 
  }
});

export default PayoutsStyles 