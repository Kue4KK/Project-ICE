import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

function page2({}) {
  const navigation = useNavigation();
  const [currentScreen, setCurrentScreen] = useState('Home'); // Home screen by default
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [fontsLoaded] = useFonts({
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
  });

  const [routes] = useState([
    { id: '1', name: 'Chotipong', description: 'กก 1234' },
    { id: '2', name: 'Thanapat', description: 'Scenic route along the coast' },
    { id: '3', name: 'Kristichai', description: 'Direct route via highway' },
    { id: '4', name: 'Athichart', description: 'Direct route via highway' },
    { id: '5', name: 'Arkom', description: 'Direct route via highway' },
    { id: '6', name: 'Pramuan', description: 'Direct route via highway' },
    { id: '7', name: 'Chotipong', description: 'Fastest route through downtown' },
    { id: '8', name: 'Thanapat', description: 'Scenic route along the coast' },
    { id: '9', name: 'Kristichai', description: 'Direct route via highway' },
    { id: '10', name: 'Athichart', description: 'Direct route via highway' },
    { id: '11', name: 'Arkom', description: 'Direct route via highway' },
    { id: '12', name: 'Pramuan', description: 'Direct route via highway' },
  ]);
    // other routes...



  // Render the current screen
  if (currentScreen === 'Home') {
    return (
      <View style={styles.bg}>
        <Text style={styles.title}>เลือกสายการจัดส่ง</Text>
        <View style={styles.container}>
          <FlatList
            data={routes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.routeItem}
                onPress={() => navigation.navigate("page3")}
              >
                <Text style={styles.routeName}>{item.name}</Text>
                <Text style={styles.routeDescription}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
 
  }

  return null;
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#6fd7fc',
    
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#6fd7fc',
  },
  title: {
    fontSize: 30,
    paddingBottom: 25,
    paddingTop: 60,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#ffff',
    fontFamily: 'Kanit-Medium',
  },
  routeItem: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 20,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity:0.6,
    shadowRadius: 3,
    shadowColor: '#343636',
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default page2;