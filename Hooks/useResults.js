import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import publicIP from 'react-native-public-ip';

export default () => {
  const [results, setResults] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  const searchApi = async searchTerm => {
    var user_id = await AsyncStorage.getItem('user_id');
    publicIP().then(ip=>{
      fetch('http://185.237.96.39:3000/users/users?type=searchmostviewed&&count=0&&user_ip='+ip+'&&user_id='+user_id)
      .then(response=>response.json())
      .then(res=>{
        if(searchTerm === ''){
          setSearched(false)
          setResults(res.Response)
        }else{
          // const res = res.Response;
          setSearched(true)
          const filter = [];
          res.forEach(element => {
             if(element.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
                 filter.push(element);
             }
          });
          setResults(filter);
        }
      }).catch(err=>{
        console.log(err);
      })
    });
  };

  useEffect(() => {
    searchApi('');
  }, []);

  return [searchApi, results, errorMessage,isSearched];
};
