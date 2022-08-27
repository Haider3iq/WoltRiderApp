import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import { Auth, DataStore } from "aws-amplify";
// import { S3Image } from "aws-amplify-react-native";
// import { BlurView } from "expo-blur";

import {
    Animated,
    FlatList,
    Keyboard, KeyboardAvoidingView,
    Platform, Pressable, Text, TextInput, TouchableOpacity, useWindowDimensions, View
} from "react-native";
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from "./Styles";



export default function CommenttingKeyboard({
    commentting,
    replyUser,
    removeReplyUser,
    updateCommentsScreen,
    removeCommentting,
    replyToComment,
    post,
}) {

   
    



    const [focusTextInput, setFocusInput] = useState<any | null>();

    // const AnimatedBlueView = Animated.createAnimatedComponent(
    //     BlurView
    // )

    const { height } = useWindowDimensions();
    const [commentContent, setCommentContent] = useState("");
    // const [replyingToUser, setReplyingToUser] = useState<User | undefined>();
    // const [mentionUsers, setMentionUsers] = useState<User[]>([])
    // const [user, setUser] = useState<User | null>();
    const [usersToSendTo, setUsersToSendTo] = useState("");

    // const fetchUser = async () => {
    //     const userData = await Auth.currentAuthenticatedUser();
    //     const user = await DataStore.query(User, userData.attributes.sub);
        
    //     const metionUsers = await DataStore.query(User)
    //     setMentionUsers(metionUsers)
    //     if (user) {
    //       setUser(user);
    //     }
    //   }

    //   useEffect(() => {
    //     fetchUser();
    //   },[])



    // useEffect(() => {
    //     if(!replyToComment) {
    //         return undefined
    //     } 
        
    //     DataStore.query(User, replyToComment?.userID).then(setReplyingToUser)
    // },[replyToComment])

    const onSendComment = async () => {
        // console.log("post", post)
    
        // if (commentContent.trim().length >= 1) {
        //   Keyboard.dismiss();
        //   setCommentContent("");
        //   removeReplyUser();
        //   updateCommentsScreen();
        //   // setLoading(true)
        //   await DataStore.save(new Comment({
        //   postID: post.id,
        //   userID: user?.id,
        //   content: commentContent.trim()
        //   }));
        //   updateCommentsScreen();
        //   removeCommentting();
          // setLoading(false);
          console.log("Comment added successfully")
        }
    
      }


    // useEffect(() => {
    //     if (replyToComment) {
    //         focusTextInput.focus();
    //     }
    // }, [replyToComment]);

  // const atSignPosition = commentContent.indexOf("@")
  // const lastIndexOfAtSign = commentContent.lastIndexOf("@")

    const AnimatedMentionView = useRef(new Animated.Value(500)).current

  



    const runAnimation = () => {
      Animated.spring(AnimatedMentionView, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  
      const hideAnimation = () => {
        Animated.spring(AnimatedMentionView, {
          toValue: 500,
        //   duration: 400,
          useNativeDriver: true,
      }).start();
    }


    return (<KeyboardAvoidingView


        keyboardVerticalOffset={-20}
        behavior={Platform.OS === "ios" ? "position" : "height"}

    >
        {/* {commentContent.includes("@") && */}
        {/* {<AnimatedBlueView */}
        <View
                // tint={Platform.OS === "ios" ? "default" : "dark"} 
                intensity={100}
                style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "60%",
                    paddingVertical: "5%",
                    aspectRatio: 1 / 1.2,
                    bottom: "100%",
                    left: "5%",
                    borderRadius: hp("2"),
                    paddingHorizontal: "10%",
                    overflow: "hidden",
                    transform: [{ translateY: AnimatedMentionView, }]
                }}>
                <ShowMentionList />
                </View>
            {/* </AnimatedBlueView> */}



        {/* //Reply r here */}

        {replyToComment && <TouchableOpacity
        activeOpacity={0.7}
            onPress={() => {removeReplyUser(); Keyboard.dismiss();}}
            style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                padding: 6,
                paddingHorizontal: 8,
                alignSelf: "flex-end",
                marginRight: "3%",
                overflow: "hidden",
                borderRadius: 10,
                marginBottom: "2%"
            }}>


            <FontAwesome
                style={{ padding: 5, }}
                name="close"
                size={24}
                color="white"
            />
        </TouchableOpacity>}

        <View

            style={{
                paddingTop: "2%",

                // borderTopLeftRadius: hp("3"),
                // borderTopRightRadius: hp("3"),
                overflow: "hidden",
            }}
        >

            {replyingToUser && replyToComment && <View
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "flex-end",
                }}>

                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: "6%",
                        alignItems: "center",
                    }}>

                    {replyingToUser?.imageUri && (<S3Image
                        imgKey={replyingToUser?.imageUri}
                        style={{
                        width: 25,
                        aspectRatio: 2 / 2,
                        marginRight: "5%",
                        borderRadius: 10,

                        }}
                    />)}

                    {!replyingToUser?.imageUri && <View style={{
                        backgroundColor: replyingToUser?.color,
                        width: 25,
                        aspectRatio: 2 / 2,
                        marginRight: "5%",
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        
                    }}>
                        <Text style={styles.replyNoImageText}>
                            {replyingToUser?.name[0]}
                        </Text>
                    </View>}

                    <Text
                        style={{
                            fontSize: 20,
                            color: "#4A4D55",
                            fontWeight: "600",
                            shadowOpacity: 1,
                            shadowColor: (user?.color === "lightgreen" ? "white" : "transparent")
                        }}>
                        {replyingToUser?.name}
                    </Text>
                </View>



                <Ionicons
                    style={{ position: "absolute", right: "6%" }}
                    name="arrow-undo-outline"
                    size={20}
                    color="black"
                />
            </View>}

            <View
                style={{
                    paddingBottom: "10%",
                    paddingVertical: "3%",
                    paddingHorizontal: "3%",
                    padding: "2%",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    backgroundColor: "#ECF0F3",
                    // borderTopRightRadius: hp("2"),
                    // borderTopLeftRadius: hp("2"),
                    overflow: "hidden",
                }}>

                <Pressable
                // style={{
                // justifyContent: "flex-start",
                // }}
                >
                    {user?.imageUri && (<S3Image
                        imgKey={user?.imageUri}
                        style={styles.image}
                    />)}

                    {!user?.imageUri && <TouchableOpacity
                        /* onPress={onScrollToBottom} */
                        style={{
                            backgroundColor: user?.color,
                            width: "11%",
                            aspectRatio: 2 / 2,
                            marginRight: "2%",
                            // marginLeft: "-2%",
                            borderRadius: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text style={styles.noImageText1}>
                            {user?.name[0]}
                        </Text>
                    </TouchableOpacity>}

                </Pressable>

                {/* <View style={{
        // backgroundColor: "white", 
        // width: "85%", 
        borderRadius: hp("2"),
        borderWidth: hp("0.11"),
        // justifyContent: "space-between",
        // borderColor: "#90A8B2",
        backgroundColor: "red",
        alignItems: "flex-end",
        flexDirection: "row",
        // paddingHorizontal: "3%",
        // paddingVertical: "2%",
        // justifyContent: "flex-end",
        }}>
            
        <TextInput 
         placeholder="Type your comment..."
         onChangeText={setCommentContent}
         onPressOut={() => Keyboard.dismiss()}
         multiline={true}
         numberOfLines={5}
         returnKeyType="done"
         onSubmitEditing={() => Keyboard.dismiss()}
         style={{
         maxWidth: "80%",
         maxHeight: "90%",
         backgroundColor: "white",
        //  minHeight: hp("2"),
         flex: 1,
          }}
          
        />
        <TouchableOpacity 
        onPress={onSendComment}
        activeOpacity={0.7} 
        
        >
        <MaterialCommunityIcons
         name="comment-arrow-left" 
         size={commentContent.length >= 1 ? 35 : 24} 
         color={commentContent.length >= 1 ? "#705AD0" : "#90A8B2"} />
         </TouchableOpacity>
        </View> */}


                <View
                    style={{
                        //Below width is for chat room
                        //Width: "60%", 
                        width: "85%",
                        flexDirection: "row",
                        justifyContent: "space-between",

                        borderWidth: 10,
                        borderColor: "rgba(0,0,0,0.1)",
                        borderRadius: 15,
                        alignItems: "flex-end",
                        paddingVertical: "2%",
                        paddingBottom: "3%",
                    }}>


                    {/* <Pressable
        // style={{
        // alignItems: "center",
        // }} 
        >
        <MaterialCommunityIcons 
        name="sticker-emoji" 
        size={23} 
        color="#5c5c5c" 
        // style={{flex: 1}} 
        />
        </Pressable> */}

                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        ref={(input) => { setFocusInput(input) }}
                        style={[{
                            // marginLeft: "3%",
                            // color: "rgba(0,0,0,0.9)",
                            // height: hp("3"),
                            // flex: 1,

                            // }, 
                            marginLeft: "3%",
                            color: "rgba(0,0,0,0.9)",
                            // minHeight: hp("10"),
                            maxHeight: 20,
                            flex: 1,

                        }]}
                        value={commentContent}
                        onChangeText={setCommentContent}
                        placeholder="Type comment or mention @user..."
                    // onFocus={() =>  setTyping(true)}
                    // onBlur={() => setTyping(false)}
                    />

                    {/* <Pressable 
        // onPress={takePhoto}
        >
        <EvilIcons 
        name="camera" 
        size={30} 
        color="black" 
        // style={{flex: 1,}} 
        />
        </Pressable>
        
        <Pressable 
        // onPress={pickImage}
        >
        <EvilIcons 
        name="image" 
        size={30} 
        color="black" 
        // style={{flex: 1}} 
        />
        </Pressable> */}
                    <TouchableOpacity
                        activeOpacity={commentContent.trim().length >= 1 ? 0.3 : 1}
                        onPress={onSendComment}
                        style={{
                            // alignSelf: "flex-end",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 25,
                                color: (commentContent.trim().length >= 1 ? "#705AD0" :
                                    "rgba(0,0,0,0.2)"),
                                fontWeight: (Platform.OS === "ios" ? "600" : "700"),
                                paddingRight: "3%",
                                paddingLeft: "3%"

                            }}
                        >
                            {"Post"}
                        </Text>
                    </TouchableOpacity>

                </View>


            </View>
        </View>
    </KeyboardAvoidingView>)
}