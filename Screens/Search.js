import React, { useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView ,Dimensions, FlatList, Image} from 'react-native';
import SearchBar from '../components/SearchBar';
import { Header } from 'react-native-elements';
import useResults from '../Hooks/useResults';
import Searched from './Searched';
import SearchComponent from './SearchComponent';
const WIDTH = Dimensions.get('window').width

export const Search  = ({navigation}) => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage,isSearched] = useResults();
    _renderItem=()=>{
         if(!isSearched){
           return <SearchComponent results={results}/>
         }
         else{
           return  <Searched results={results}/>
         }
    }

  return (
    <View style={{width:'100%',height:'100%',backgroundColor:'#131313'}}>  
        <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={() => searchApi(term)}
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

