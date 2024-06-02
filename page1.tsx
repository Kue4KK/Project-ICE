import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';


const Page1 = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
  });

  
  
  return (
    <View style={styles.bg}>
      <Text style={styles.heading}>เลือกประเภทผู้ใช้งาน</Text>
      <View style={styles.container}>
        <View style={styles.content}>

          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("")}>
            <Image 
              style={styles.image}
              source={require('./image/user-pen.png')}/>
            <Text style={styles.buttonText}>ส่วนกลาง</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("page2")}>
            <Image 
                style={styles.image}
                source={require('./image/shipping-fast.png')}/> 
            <Text style={styles.buttonText}>พนักงานจัดส่ง</Text>
          </TouchableOpacity>

        </View>
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
    paddingHorizontal: 25,
    backgroundColor: '#6fd7fc',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  buttonText: {
    fontFamily: 'Kanit-Regular',
    color: 'black',
    fontSize: 20,
    paddingTop: 40,
  },

  item: {
    width: 160,
    height: 230,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowOffset: {
      width: 2.5,
      height: 4,
    },
    shadowOpacity:0.9,
    shadowRadius: 5,
    shadowColor: '#343636',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Page1;
