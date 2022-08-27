/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View, Text, Dimensions, Platform, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import customStyles from '../AppTheme/customStyles';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer' 
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import MapBottom from './Bottom/WhereToButton';
import LinkingConfiguration from './LinkingConfiguration';
import googleMaps from "../assets/images/googleMaps.png"
import appleMaps from "../assets/images/appleMaps.png"
import Task from './Task/Task';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import SettingsScreen from '../screens/SettingsScreen';
import Payouts from '../screens/Payouts/PayoutScreen';
import Home from '../screens/Home';
import Chatroom from '../screens/Chatroom/Chatroom';
import  ChatUi  from '../screens/ChatUi';
import DeliveriesScreen from '../screens/Payouts/DeliveriesScreen';
import DeliveryInfoScreen from '../screens/PreviousDelivery';
import LoginScreen from '../screens/Login/LoginScreen';
import WorkingScreen from '../screens/WorkingScreen/WorkingScreen';
import PreviousDelivery from '../screens/PreviousDelivery';
import PayoutsDaysScreen from '../screens/Payouts/PayoutsDaysScreen';
import Chat from '../screens/Chat';
import { useSelector } from 'react-redux';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {


  



  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      {/* <DrawerStack/> */}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const styles = EStyleSheet.create({

  iconSize: {
    fontSize: "20rem",
    borderRadius: "100rem",
    marginRight: "20rem",
    textAlignVertical: "bottom"
  },
  locationIcon: {
    width: "30rem",
    height: "30rem"
  },
  title: {
   fontWeight: customStyles.fontWeight, 
   fontSize: "15rem", 
   color: customStyles.secondPrimaryColor
  }, 

  arrowIcon: {
    color: customStyles.secondPrimaryColor, 
    fontSize: "20rem",
  },

  arrowView: {
    backgroundColor: customStyles.widgetColor,
    paddingLeft: "10rem",
    paddingRight: "2.5rem",
    paddingVertical: "5rem",
    borderRadius: "10rem"
  },

  arrowViewHomeScreen: {
    backgroundColor: customStyles.widgetColor,
    paddingLeft: "10rem",
    paddingRight: "2.5rem",
    paddingVertical: "5rem",
    borderRadius: "10rem",
    marginRight: "20rem",
  },
  settingIconView: {
    backgroundColor: customStyles.widgetColor,
    paddingHorizontal: "5rem",
    paddingVertical: "5rem",
    borderRadius: "10rem",
    marginRight: "20rem",
  },
  contactView: {
    backgroundColor: customStyles.widgetColor,
    paddingLeft: "6rem",
    paddingRight: "6rem",
    paddingVertical: "5rem",
    borderRadius: "10rem"
  }

});

const mapImage = Platform.OS === "ios" ? appleMaps : googleMaps

      let online; 
  


function RootNavigator() {
  return (
    <Stack.Navigator>
      

      


<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />


<Stack.Screen name="Chat" component={Chat} options={({route, navigation}) => ({
        title: 'Chat',
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
         

          return (
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowView}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
            )}, })} />

<Stack.Screen name="support" component={ChatUi} options={({route, navigation}) => ({
title: 'Live support',
headerTitleAlign: "center",
headerStyle: {},
headerLeft: () => {
  

  return (
  <TouchableOpacity
  activeOpacity={0.7}
  onPress={() => navigation.goBack()}
  style={styles.arrowView}
  >
    <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
    </TouchableOpacity>
    )}, 
  })
    } />


<Stack.Screen name="Deliveries" component={DeliveriesScreen} options={({route, navigation}) => ({
        title: 'Deliveries',
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
         

          return (
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowView}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
            )}, })} />







<Stack.Screen name="Payouts" component={Payouts} options={({route, navigation}) => ({
        title: 'Payouts',
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
         

          return (
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowView}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
            )}, })} />


<Stack.Screen name="PayoutsDays" component={PayoutsDaysScreen} options={({route, navigation}) => ({
        title: route.params?.month,
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
         

          return (
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowView}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
            )}, })} />

            

      {/* <Stack.Screen name="Task" component={Task} options={{ headerShown: false }} /> */}

      


      {/* <Stack.Screen name="Chatroom" component={Chatroom} options={({route, navigation}) => ({
        title: 'Live chat',
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
         

          return (
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowView}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
            )}, })} /> */}




      <Stack.Screen name="Home" 
      component={Home} options={({route, navigation }) => ({
        title: '',
        headerTitleAlign: "left",
        headerStyle: {},
      
        headerLeft: () => {
          online = route.params?.online

          return (
          <View
          style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
          >

      <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowViewHomeScreen}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
           
          
           <Text
           style={styles.title}
           >{route.params?.Address}</Text>
            </View>
            )},
          //   headerRight: () => (
            
          //     <TouchableOpacity
          //     activeOpacity={0.7}
          //     onPress={() => route.params?.directionToAddress()}
          //     >
          //     <Image style={styles.locationIcon} source={mapImage} />
          //     </TouchableOpacity>
          // ),
            // headerRight: route?.params?.riderName,
        // headerRight: route?.params?.address !== "You are currently not working" && route?.params?.address !== "You are currently working" ? 

       })}
      />


<Stack.Screen name="WorkingScreen" 
      component={WorkingScreen} options={({route, navigation}) => ({
        title: 'Home',
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
          return (
          // <TouchableOpacity
          // activeOpacity={0.7}
          // onPress={() => { navigation.navigate("Home", {
          //   "Address": null,
          //   "latitude": null,
          //   "longitude": null,
          //   "customerName": null,
          //   "iconName": null,
          //   "riderName": `${route.params?.data?.firstName} ${route.params?.data?.lastName}`
          // })}}
          // style={styles.arrowView}
          // >
          //  <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
          //   </TouchableOpacity>

          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Settings", {"rider": route.params?.data})}
          style={styles.settingIconView}
          >
           <Ionicons name="md-settings" style={styles.arrowIcon}/> 
            </TouchableOpacity>



            )}, 
            headerRight: () => {
              return(
                <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {console.log("before navigating messages", route.params?.riderMessages); navigation.navigate("Chat", {riderMessages: route.params?.riderMessages})}}
          style={styles.contactView}
          >
                <Ionicons name="ios-help-buoy" style={styles.arrowIcon} />
                </TouchableOpacity>
              )
            }
          })}
            
            />


      
<Stack.Screen name="PreviousDelivery" component={PreviousDelivery} options={({route, navigation}) => ({
        title: 'Previous order',
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
         

          return (
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowView}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
            )}, })} />















      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={({route, navigation}) => ({
        title: 'Settings',
        headerTitleAlign: "center",
        headerStyle: {},
        headerLeft: () => {
         

          return (
          <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.arrowView}
          >
           <MaterialIcons name="arrow-back-ios" style={styles.arrowIcon}/> 
            </TouchableOpacity>
            )}, })} />

       


      
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      
    // drawerStyle={{
	  //   width: Dimensions.get('window').width
	  // }}
    drawerContent={({navigation})=> <DrawerContainer navigation={navigation} userOnline={online}/>}
      
      screenOptions={{headerShown: false, drawerPosition: "right", drawerStyle:{
        width: "80%",
        backgroundColor: customStyles.primaryBackgroundColor,
      },}}
    >
      <Drawer.Screen name='Root' component={RootNavigator}/>
    </Drawer.Navigator>
  )
} 




/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'TakeAway',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
