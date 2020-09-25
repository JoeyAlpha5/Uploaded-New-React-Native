import { useEffect, useState } from 'react';
import axios from 'axios';

export default () => {
  const [results, setResults] = useState([]);
  const [isSearched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    try{
        const response = await axios.get('http://185.237.96.39:3000/users/users?type=searchmostviewed&&count=0&&user_ip=10.10.25.155&&user_id=1');
        if(searchTerm === ''){
            setSearched(false)
            setResults(response.data.Response)
        }
        else{
                const res = response.data.Response;
                setSearched(true)
                const filter = [];
                res.forEach(element => {
                   if(element.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
                       filter.push(element);
                   }
                });
                setResults(filter);
        }
       
    } 
    catch{
        console.log('Something went wrong')
    }  
  };

  // Call searchApi when component
  // is first rendered.  BAD CODE!
  // searchApi('pasta');
  useEffect(() => {
    searchApi('');
  }, []);

  return [searchApi, results, errorMessage,isSearched];
};
