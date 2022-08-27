import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../AppTheme/customStyles";

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export const styles = EStyleSheet.create({
  mainView: {
    padding: "5%",
    backgroundColor: customStyles.primaryBackgroundColor,
    marginHorizontal: "3%",
    borderRadius: "20rem"
  },
  widgetView: {
    marginVertical: "5%",
    backgroundColor: customStyles.primaryBackgroundColor,
    padding: "3.5%",
    borderRadius: "10rem"
  },
  title: {
    fontSize: "16rem",
    fontWeight: customStyles.fontWeight,
    color: customStyles.secondPrimaryColor,
    opacity: 0.8,
    // marginVertical: "5rem"
  },
  discraption: {
    fontSize: "14rem",
    color: customStyles.whiteGray,
    fontWeight: customStyles.fontWeight,
    
  }, 
  button: {
    marginHorizontal: "20rem",
    backgroundColor: customStyles.widgetColor, 
    padding: "5%",
    borderRadius: "10rem",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    paddingVertical: "2rem",
    marginVertical: "10rem",
   marginHorizontal: "-10%",
    width: '150%',
    backgroundColor: customStyles.widgetColor,
    // opacity: 0.05,
  },
  icon: {
    fontSize: "25rem",
    color: customStyles.secondPrimaryColor,

  }, 
  modal: {
      justifyContent: "center", 
      alignContent: "center", 
      alignItems: "center", 
      backgroundColor: "red", 
      flex: 1,
  },
  lottie: {
    width: "100%",
    height: "200rem",
    backgroundColor: customStyles.primaryBackgroundColor,
    
    marginBottom: "-5%"
  }, 
  titleNoTask: {
    fontWeight: customStyles.fontWeight, 
    fontSize: "22rem", 
    color: customStyles.secondPrimaryColor,
    paddingVertical: "20rem",
    paddingHorizontal: "5%",
    textAlign: "center",
    alignSelf: "center"
   },
   deliveriesTitle: {
    fontWeight: customStyles.fontWeight, 
    fontSize: "22rem", 
    color: customStyles.white,
    paddingVertical: "20rem",
    paddingHorizontal: "5%",
    textAlign: "center",
    alignSelf: "center"
   },
   linkView: {
    alignItems: "center",
    paddingVertical : "10rem",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "15%",
  },


  linkText: {
      color: customStyles.whiteGray,
      fontSize: "15rem",
     
  },

  applyText: {
      color: customStyles.primaryColor,
      fontSize: "15rem",
      fontWeight: customStyles.fontWeight
  },
   modalView: {
    backgroundColor: customStyles.primaryColor,
    paddingTop: "0%",
    alignItems: "center",
    paddingBottom: "30%",
    alignContent: "center",
    marginBottom: "-25%",
    borderBottomStartRadius: "20rem",
    borderBottomEndRadius: "20rem",
  },
  image: {
    width: "98rem", 
    height: "98rem", 
    padding: "5%", 
    backgroundColor: customStyles.white, 
    borderRadius: "20rem",
  },
  selectionView: {
    backgroundColor: customStyles.primaryBackgroundColor,
    padding: "2.5%",
    minWidth: "100rem",
    borderRadius: "10rem",
    borderColor: "rgba(0,0,0,0)",
    borderWidth: "2rem",
    alignItems: "center"
  },
  selectionText: {
    fontSize: "18rem",
    color: customStyles.whiteGray,
    fontWeight: customStyles.fontWeight,
  }, 
  selctionMainView: {
    backgroundColor: customStyles.primaryBackgroundColor,
    width: "94%",
    paddingHorizontal: "5%",
    flexDirection: "row",
    marginBottom: "-5%",
    paddingVertical: "5%",
    borderTopEndRadius: "20rem",
    borderTopStartRadius: "20rem",
    justifyContent: "space-between"
  }, 
  readyTextMainView: {
    backgroundColor: customStyles.primaryBackgroundColor,
    width: "94%",
    paddingHorizontal: "5%",
    flexDirection: "row",
    marginBottom: "-5%",
    paddingBottom: "2.5%",
    paddingTop: "5%",
    borderTopEndRadius: "20rem",
    borderTopStartRadius: "20rem",
    justifyContent: "space-between",
    zIndex: 1,
  }, 
  readyTextView: {
    backgroundColor: customStyles.primaryBackgroundColor,
    padding: "1.5%",
    // minWidth: "80rem",
    borderRadius: "10rem",
    borderColor: "rgba(0,0,0,0)",
    borderWidth: "2rem",
    alignItems: "center",
    marginHorizontal: "6%"
  },
  readyText: {
    fontSize: "12rem",
    color: customStyles.whiteGray,
    fontWeight: customStyles.fontWeight,
  }, 
  nodeliveriesView: {
    flex: 1,
    marginHorizontal: "5%",
    backgroundColor: customStyles.primaryBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15rem"
  },
  
  modalView1: {
    backgroundColor: customStyles.primaryColor,
    paddingTop: "10%",
    alignItems: "center",
    paddingBottom: "30%",
    alignContent: "center",
    marginBottom: "-25%",
    borderBottomStartRadius: "20rem",
    borderBottomEndRadius: "20rem",
  },
  image1: {
    width: "100rem", 
    height: "100rem", 
    padding: "5%", 
    marginHorizontal: "10%",
    // backgroundColor: customStyles.white, 
    borderRadius: "15rem",
  },
  newTaskTitle: {
    fontWeight: customStyles.fontWeight, 
    fontSize: "22rem", 
    color: "white",
    paddingVertical: "20rem",
    paddingHorizontal: "5%",
    textAlign: "center",
    alignSelf: "center"
   },
   newTaskModalView: {
    backgroundColor: customStyles.successColor,
    paddingTop: "10%",
    alignItems: "center",
    paddingBottom: "30%",
    alignContent: "center",
    marginBottom: "-22%",
    borderBottomStartRadius: "20rem",
    borderBottomEndRadius: "20rem",
  },
  newTaskimage: {
    width: "120rem", 
    height: "120rem", 
    padding: "5%", 
    // backgroundColor: customStyles.white, 
    borderRadius: "15rem",
  }
});

export default styles