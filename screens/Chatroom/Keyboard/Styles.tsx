import { Dimensions, StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import customStyles from "../../../AppTheme/customStyles";





const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#ECF0F3",
        // borderRadius: wp(""10rem""),
        
        // height: ""10rem"0%",
    },
    container: {
      
        flexDirection: "row",
        paddingTop: "15rem",
        paddingRight: "5rem",
        paddingLeft: "5rem",
        zIndex: 0,
        marginRight: "20rem",
        marginLeft: "20rem",
        borderRadius: "10rem",
    },

    container2: {
        flexDirection: "row",
        paddingTop: "15rem",
        paddingRight: "5rem",
        paddingLeft: "5rem",
        zIndex: 0,
        marginRight: "20rem",
        marginLeft: "20rem",
        borderRadius: "10rem",
    },

    image: {
        aspectRatio: 2 / 2,
        width: "15%",
        borderRadius: "20rem",
        marginRight: "3%",
    },

    otherCommenterImage: {
        aspectRatio: 2 / 2,
        width: "15%",
        borderRadius: "15rem",
        marginRight: "3%",
    },




    noImageText: {
        fontSize: "12rem",
        fontWeight: "bold",
        color: "#FAFAFA",
        textTransform: "uppercase",

    },

    noImageText1: {
        fontSize: "14rem",
        fontWeight: "bold",
        color: "#FAFAFA",
        textTransform: "uppercase",

    },

    replyNoImageText: {
        fontSize: "13rem",
        fontWeight: "bold",
        color: "#FAFAFA",
        textTransform: "uppercase",
    },

    noImageTextOtherCommenter: {
        fontSize: "13rem",
        fontWeight: "bold",
        color: "#FAFAFA",
        textTransform: "uppercase",

    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },


    rightContainer: {
        justifyContent: "center",
    },
    name: {
        fontSize: "13rem",
        fontWeight: "bold",
        marginRight: "3%",
        color: "rgba(0,0,0,0.9)",

    },
    nameAndTimeView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    reactionsText: {
        color: "#8E8E8E",
        fontSize: "15rem",
    },

    textStatus: {
        marginTop: "0.5%",
        marginBottom: "1.5%",
        color: "#4A4D55",
        fontSize: "20rem",
        fontWeight: customStyles.fontWeight,
        textAlign: "left",
        paddingRight: "18%"

    },

    textStatus2: {
        marginTop: "0.5%",
        marginBottom: "1.5%",
        color: "#4A4D55",
        fontSize: "12rem",
        fontWeight: "600",
        textAlign: "left",

    },

    admin: {
        flexDirection: "row",
        alignItems: "center",
    },
    reactionsView: {
        flexDirection: "row",
    },

    replies: {
        flexDirection: "row",
        marginBottom: "6%",
        maxWidth: "70%"
    },

    inputContainer: {
        backgroundColor: "white",
        flex: 1,
        borderWidth: "1rem",
        borderColor: "#DBDBDB",
        marginRight: "17rem",
        borderRadius: "50rem",
        justifyContent: "center",
        marginBottom: "10rem",
        flexDirection: "row",
        padding: "10rem",
        maxHeight: "300rem",
    },


});

export default styles;