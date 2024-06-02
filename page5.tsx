import React, { useState, useEffect } from 'react'; 
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import { useFonts } from 'expo-font';

const ToDoList = () => {
  const navigation = useNavigation();
  const [store, setStore] = useState([]);

  const [fontsLoaded] = useFonts({
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
  });

  const toggleTaskCompletion = (number) => {
    const updatedTasks = store.map((task) =>
      task.number === number ? { ...task, completed: !task.completed } : task
    );
    setStore(updatedTasks);
    navigation.navigate('pageInput');
  };

  useEffect(() => {
    axios.get('https://sheet.best/api/sheets/1d722dea-fc6b-4150-86e5-0f74347853eb')
      .then(response => {
        console.log("Fetched data:", response.data); // Log the fetched data
        setStore(response.data); // Update the state with fetched data
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  


  return (
    <View style={styles.bg}>
      <Text style={styles.heading}>ร้านที่ต้องส่ง</Text>
      <View style={styles.container}>
        <ScrollView style={styles.tasksContainer}>
        {store.map((task) => (
        <TouchableOpacity
          key={task.number}
          onPress={() => !task.completed && toggleTaskCompletion(task.number)} // Check if task is not completed before allowing toggle
          style={[styles.task, task.completed && styles.completedTask]}
        >
          <Text style={task.completed && styles.completedText || styles.text}>{task.number}     {task.store}</Text>

        </TouchableOpacity>
      ))}
        </ScrollView>
      </View>
    </View>
  );
};

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
  tasksContainer: {
    flex: 1,
    padding: 5,
  },
  task: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    padding: 25,
    marginBottom: 15,
    flexDirection: 'row',
    borderRadius: 25,
    justifyContent: 'space-between', // Align the GPS button to the right
    alignItems: 'center', // Align items vertically
    shadowOffset: {
        width: 2.5,
        height: 4,
      },
      shadowOpacity:0.6,
      shadowRadius: 3,
      shadowColor: '#343636',
  },
  completedTask: {
    backgroundColor: '#b8bebf',
  },
  completedText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  button: {
    backgroundColor: '#555959',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
  },
  text: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
  }
});

export default ToDoList;
