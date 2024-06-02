import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'; 

const Pageinput = () => {
  const navigation = useNavigation();
  const [largeTube, setLargeTube] = useState('');
  const [smallTube, setSmallTube] = useState(''); 
  const [crushedIce, setCrushedIce] = useState('');
  const [number, setNumber] = useState('');
  const [store, setStore] = useState('');
  const [location, setLocation] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('');
  const [fontsLoaded] = useFonts({
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
  });

  const handleLargeTubeChange = (text) => {
    if (!submitted) {
      setLargeTube(text);
    }
  };

  const handleSmallTubeChange = (text) => {
    if (!submitted) {
      setSmallTube(text);
    }
  };

  const handleCrushedIceChange = (text) => {
    if (!submitted) {
      setCrushedIce(text);
    }
  };

  const handleSubmit = async () => {
    Alert.alert(
      "Confirmation",
      "คุณต้องการยืนยัน?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: async () => {
            const loc = await getLocation(); // Get the location
            if (loc) {
              submitData(loc); // Call submitData function when user clicks Yes
              navigation.navigate('page5');
            } else {
              Alert.alert('ไม่สามารถดึงตำแหน่งได้');
            }
          }
        }
      ]
    );
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      return location;
    } catch (error) {
      console.error("Error getting location: ", error);
      return null;
    }
  };
  
  const generateMapLink = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  const submitData = (location) => {
    const mapLink = generateMapLink(location.coords.latitude, location.coords.longitude);
  
    console.log('ร้านที่:', number);
    console.log('ชื่อร้าน:', store);
    console.log('หลอดใหญ่:', largeTube);
    console.log('หลอดเล็ก:', smallTube);
    console.log('น้ำแข็งบด:', crushedIce);
    console.log('Location:', location);
    console.log('Type:', type);
    console.log('Google Map Link:', mapLink);
  
    const googleMapLinkFormula = '=HYPERLINK("' + mapLink + '", "ดูที่ตั้งบน Google Maps")';
  
    axios.post('https://sheet.best/api/sheets/eaedd777-3f47-4583-851c-e15ff6571cb0', {
      number,
      store,
      largeTube,
      smallTube,
      crushedIce,
      latitude: location ? location.coords.latitude : null,
      longitude: location ? location.coords.longitude : null,
      type: 'ปกติ',
      googleMapLink: googleMapLinkFormula,
    })
    .then(response => {
      console.log(response.data);
      setSubmitted(true);
    })
    .catch(error => {
      console.error("Error submitting data: ", error);
    });
  };

  useEffect(() => {
    axios.get('https://sheet.best/api/sheets/1d722dea-fc6b-4150-86e5-0f74347853eb')
      .then(response => {
        console.log("Fetched data:", response.data);
        setStore(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <View style={styles.background}>
      <Text style={styles.header}>กรอกข้อมูล</Text>
      <View style={styles.container}>
        <View style={styles.bg}>
          <Text style={styles.type}>ประเภท</Text>
          <View style={styles.item}>
            <Text style={styles.label}>หลอดใหญ่:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleLargeTubeChange}
              value={largeTube}
              placeholder="ป้อนจำนวน"
              editable={!submitted} 
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>หลอดเล็ก:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleSmallTubeChange}
              value={smallTube}
              placeholder="ป้อนจำนวน"
              editable={!submitted} 
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>แบบบด:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleCrushedIceChange}
              value={crushedIce}
              placeholder="ป้อนจำนวน"
              editable={!submitted} 
            />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>ยืนยัน</Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              description="This is your current location"
            />
          </MapView>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#6fd7fc',
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#6fd7fc',
  },
  label: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Kanit-Regular',
    height: 40,
    width: 90,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    fontFamily: 'Kanit-Medium',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 25,
    paddingTop: 60,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#ffff',
  },
  item: {
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    marginBottom: 40,
    borderRadius: 20,
    shadowOffset: {
      width: 2.5,
      height: 4,
    },
    shadowOpacity:0.9,
    shadowRadius: 5,
    shadowColor: '#343636',
  },
  bg: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 10,
    borderRadius: 25,
    shadowOffset: {
      width: 2.5,
      height: 7,
    },
    shadowOpacity:0.6,
    shadowRadius: 8,
    shadowColor: '#343636',
  },
  type: {
    fontFamily: 'Kanit-Medium',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  buttonText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
});

export default Pageinput;