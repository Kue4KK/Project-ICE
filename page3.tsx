import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { useFonts } from 'expo-font';

const Page3 = () => {
  const navigation = useNavigation();
  
  const [fontsLoaded] = useFonts({
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
  });

  return (
    <View style={styles.bg}>
      <Text style={styles.heading}>คุณเป็นเจ้าของสาย ?</Text>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={() => navigation.navigate("page5")}>
          <Text style={styles.buttonText}>เจ้าของสาย</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.noButton]} onPress={() => navigation.navigate("ride")}>
          <Text style={styles.buttonText}>ขับแทน</Text>
        </TouchableOpacity>
      </View>
    </View>
);
};

const handleYesPress = () => {
  // Handle action for "Yes" button press
  console.log('Yes button pressed');
};

const handleNoPress = () => {
  // Handle action for "No" button press
  console.log('No button pressed');
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#6fd7fc',
  },
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#6fd7fc',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Kanit-Medium',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 25,
    paddingTop: 60,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#ffff',

  },
  button: {
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 30,
    shadowOffset: {
      width: 2.5,
      height: 4,
    },
    shadowOpacity:0.6,
    shadowRadius: 3,
    shadowColor: '#343636',
  },
  buttonText: {
    fontFamily: 'Kanit-Regular',
    color: '#ffff',
    fontSize: 18,

  },
  yesButton: {
    alignItems: 'center',
    backgroundColor: 'green',
  },
  noButton: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Page3;
