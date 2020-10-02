import React, { useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView ,Dimensions, FlatList, Image} from 'react-native';
import SearchBar from '../components/SearchBar';
import { Header } from 'react-native-elements';
// import useResults from '../Hooks/useResults';
import Searched from './Searched';
import SearchComponent from './SearchComponent';
import publicIP from 'react-native-public-ip';
import AsyncStorage from '@react-native-community/async-storage';
const WIDTH = Dimensions.get('window').width

export const Search  = ({navigation}) => {
    const [term, setTerm] = useState('');
    // const [searchApi, results, errorMessage,isSearched] = useResults();
    const [count, setCount] = useState(0);
    const [results, setResults] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearched, setSearched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // const [SearchResults,setSearchResults] = useState([]);

    _renderItem=()=>{
         if(!isSearched){
           return <SearchComponent results={results} play={Player} endReached={endReached}/>
         }
         else{
           return  <Searched results={searchResults} play={Player}/>
         }
    }

    const updateLike = ()=>{
      console.log('like');
    } 

    const Player = async (post)=>{
      var user_id = await AsyncStorage.getItem('user_id');
      publicIP().then(ip=>{
        fetch('http://185.237.96.39:3000/users/users?type=getpostinfo&&user_ip='+ip+'&&user_id='+user_id+'&&post_id='+post.id)
        .then(re=>re.json())
        .then(video=>{
          console.log(video);
          navigation.navigate('Player',{data:video,updateLike:updateLike()});
  
        })
      });
  
    }

    const endReached = ()=>{
      console.log("reached end");
      // console.log(count);
      searchApi('');
    }

    const searchApi = async searchTerm => {
      var user_id = await AsyncStorage.getItem('user_id');
      publicIP().then(ip=>{
        fetch('http://185.237.96.39:3000/users/users?type=searchmostviewed&&count='+count+'&&user_ip='+ip+'&&user_id='+user_id)
        .then(response=>response.json())
        .then(res=>{
          if(searchTerm === ''){
            setSearched(false)
            // setCount(count+31);
            setResults([...results,...res.Response]);
          }else{
            // const res = res.Response;
            console.log(res);
            // setCount(0);
            setSearched(true)
            const filter = [];
            res.Response.forEach(element => {
               if(element.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
                   filter.push(element);
               }
            });
            setSearchResults(filter)
            // setCount(count+10);
          }
        }).catch(err=>{
          console.log(err);
        })
      });
    };

    useEffect(() => {
      // setCount(0);
      // console.log(count);
      searchApi(term);
    }, [term]);

  return (
    <View style={{width:'100%',height:'100%',backgroundColor:'#131313'}}>  
        <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={() => searchApi(term)}
            // textChanged={() => doLiveSearch()}
          />
      <View style={styles.container}>
            {_renderItem()}
      </View>

    </View>
  );
};
// export default Search;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // paddingTop: 10,
        backgroundColor:'#000'
    },
    itemStyle:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height:WIDTH/3,
        width:((WIDTH/3)-2)
    },
    itemInvisible:{
        backgroundColor:'transparent'
    },

      titleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
        color: '#f73d0f',
      },
      imageStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#fff',
      },
      itemstyle: {
        backgroundColor: 'rgba(211, 222, 235, 0.3)',
        borderColor: 'white',
        borderWidth: 1,
        height: 70,
      },
      avatarStyle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 6,
      },
      textStyle: {
        flexDirection: 'column',
        marginLeft: 10,
      },
});

