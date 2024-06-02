import { StyleSheet, } from 'react-native'
import React from 'react'
import Page2 from './page2';
import Page3 from './page3';
import Pageinput from './pageInput';
import Page4 from './page4';
import Ride from './ride';
import Page5 from './page5';
import Page1 from './page1';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">

        <Stack.Screen
          name="page1"
          component={Page1}
          options={{ headerShown: false}}
        />
 
        <Stack.Screen
          name="page2"
          component={Page2}
          options={{ headerShown: false}}
        />

        <Stack.Screen
          name="page3"
          component={Page3}
          options={{ headerShown: false, title: ''}}
        />

        <Stack.Screen
          name="pageInput"
          component={Pageinput}
          options={{ headerShown: false, title: ''}}
        />

        <Stack.Screen
          name="ride"
          component={Ride}
          options={{ headerShown: false, title: ''}}
        />

        <Stack.Screen
          name="page4"
          component={Page4}
          options={{ headerShown: false, title: 'Input'}}
        />

        <Stack.Screen
          name="page5"
          component={Page5}
          options={{ headerShown: false, title: ''}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})