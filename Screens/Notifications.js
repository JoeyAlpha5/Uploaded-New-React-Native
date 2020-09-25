import React, {useState, useEffect} from 'react';
import {View, Text, FlatList,RefreshControl,Image} from 'react-native';
// import notifications from '../firebase/firebase';
import { FirebaseNotifications } from '../firebase/firebase';
import { Header } from 'react-native-elements';


export const Notifications = () =>{
    const [notificationsArray, setNotificationsArray] = useState([]);
    const [serverTime,setServerTime] = useState();
    const [Refreshing,setRefreshing] =useState(false);

    const getNotifications = ()=>{
        let notif_array = [];
        FirebaseNotifications.orderByChild('-notification_date').limitToLast(30).once('value', data=>{
            data.forEach(notification=>{
                console.log("notification ", notification.val());
                notif_array.push(notification.val());
            })
        }).then(()=>{
            setNotificationsArray(notif_array.reverse());
            setRefreshing(false);
        });
    }
    useEffect(()=>{
        fetch('http://185.237.96.39:3000/users/users?type=getservertime')
        .then((re)=>re.json())
        .then(server_date=>{
            // console.log(getDateDiff(server_date['Server time'],date));
        //    date_diff =  console.log(getDateDiff(server_date['Server time'],date));
        //    console.log("date difference ",date_diff);
            setServerTime(server_date['Server time']);
        }).then(()=>{
            getNotifications();
        });
    },[])


    const getDate = (notif_date) => {
        var today = new Date(serverTime);
        var other_date = new Date(notif_date);
        var minutes = today.getMinutes() - other_date.getMinutes();
        var month = today.getMonth() - other_date.getMonth();
        var hours =  today.getHours() - other_date.getHours();
        var _date = today.getDate() - other_date.getDate();
        var year = today.getFullYear() - other_date.getFullYear();

        console.log(today);
        console.log("min ", minutes, " month ", month, " hrs ", hours, " date ", _date, " year ", year);
        
        if(year > 0){
          if(year == 1){
            return (1+ " year ago");
          }else{
            return (year + " years ago");
          }
        }else if(month > 0 ){
          if(month == 1){
            return (1+ " month ago");
          }else{
            return (month+ " months ago");
          }
        }else if(_date > 0){
            if(_date == 1){
              return (1+ " day ago");
            }else if(_date < 7){
              return (_date+ " days ago");
            }else{
              return (Math.floor(_date/7)+" weeks ago");
            }
        }
        else if(hours > 0){
          if(hours == 1){
            return (1+ " hour ago");
          }else{
            return (hours+ " hours ago");
          }
        }else if(minutes > 0){
          if(minutes == 1){
            return (1+ " minute ago");
          }else{
            return (minutes + " minutes agao");
          }
        }
        else{
            return "seconds ago";
        }
      
    }


    const onRefresh = ()=>{
        setRefreshing(true);
        getNotifications()
    }



    return (
        <View style={{flex:1,height:'100%', width:'100%',backgroundColor:'#000000',justifyContent: 'center',alignItems: 'center',}}>
            <Header
                placement="left"
                containerStyle={{
                    backgroundColor: '#181818',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#000',
                }}
                centerComponent={{ text: 'Notifications', style: { color: '#fff',fontSize:20,borderBottomWidth:0 } }}
            />
           {/* <Text style={{color:'#717171'}}>Coming soon</Text> */}
           <FlatList
                style={{flexDirection:'column',width:'100%'}} 
                refreshControl={<RefreshControl refreshing={Refreshing} onRefresh={onRefresh}/>} 
                data={notificationsArray}
                keyExtractor={({ id }, index) => index.toFixed()}
                renderItem={({ item }) => (
                    <View style={{flexDirection:'row',width:'100%',justifyContent:"space-evenly",backgroundColor:'#181818',flex:1,padding:15,borderBottomWidth: 0.5,}}>
                        <Image  style={{width:40,height:40,borderRadius:50}} source={{uri:item.profile}}/>
                        <View style={{marginLeft:15,width:'70%'}}>
                            <Text style={{color:'#717171',fontSize:11}}>{getDate(item.notification_date)}</Text>
                            <Text style={{color:'white'}}>{item.msg}</Text>
                        </View>
                        <Image  style={{width:40,height:40,borderRadius:5}} source={{uri:item.post_image}}/>
                    </View>
                )}

           />
        </View>
    )

}
// export default Notifications