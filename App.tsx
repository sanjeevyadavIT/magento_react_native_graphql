import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

const App = () => {
  const [fetchData, setFetchData] = useState('');
  const [axiosData, setAxiosData] = useState('');

  useEffect(() => {
    // Fetch Request
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => setFetchData(JSON.stringify(json)))
      .catch((error) => {
        console.log('FETCH', JSON.stringify(error));
        setFetchData('ERROR ' + JSON.stringify(error));
      });
  }, []);

  useEffect(() => {
    // Axios Request
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => setAxiosData(JSON.stringify(response)))
      .catch((error) => {
        console.log('AXIOS', JSON.stringify(error));
        setAxiosData('ERROR ' + JSON.stringify(error));
      });
  }, []);

  return (
    <View>
      <Text>FETCH REQUEST RESPONSE</Text>
      <Text>{fetchData}</Text>
      <Text>AXIOS REQUEST RESPONSE</Text>
      <Text>{axiosData}</Text>
    </View>
  );
};

export default App;
