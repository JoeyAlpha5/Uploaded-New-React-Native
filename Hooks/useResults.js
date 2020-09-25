import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  const [results, setResults] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    
    fetch('http://185.237.96.39:3000/users/users?type=searchmostviewed&&count=0&&user_ip=10.10.25.155&&user_id=1')
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
    })


  };

  useEffect(() => {
    searchApi('');
  }, []);

  return [searchApi, results, errorMessage,isSearched];
};
