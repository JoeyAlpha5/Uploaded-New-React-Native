import React from 'react';
import {View, Text,FlatList, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CommentsComponent = (props) =>{
    return(
        <View style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'column',flex: 1,backgroundColor:'#181818',marginTop: 5,width:'98%',borderRadius:10,marginBottom:5}}>
        {props.spinner == true?
            
            (<ActivityIndicator size="large" color="#eb8d35"/>)
            :
            (
                <FlatList
                data={props.comments}
                style={{width:'100%'}}
                keyExtractor={({ id }, index) => index.toFixed()}
                renderItem={({ item }) => (
                <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:1,marginTop:20,   height:'auto',padding: 10,paddingTop:20,paddingBottom:20,borderColor:'#242424',width:'100%'}}>
                    <View style={{width:40,height:40,borderRadius:50,justifyContent: 'center',alignItems: 'center',backgroundColor:'#242424'}}>
                        <Ionicons name="person-outline" size={25} color={'#717171'}/>
                    </View>
                    <View style={{marginLeft:15,}}>
                        <Text style={{color:'black',fontSize:11,color:'#717171'}}>
                            {item.username}
                        </Text>
                        <Text style={{fontSize:11,lineHeight:18,color:'white',paddingRight: 50,}}>
                            {item.comment}
                        </Text>
                    </View>
                </View>

                )}
            />
            )
        }
    </View>
    )
}

export default CommentsComponent
