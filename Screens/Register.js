import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    TextInput,
    Alert, 
    CheckBox,
    Linking,
    SafeAreaView, 
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const Register= ({navigation, route}) =>{
    const [emailInputColor,setEmailInputColor] = useState('#f2f2f2');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [terms, setTerms] = useState(false);
    const terms_url = 'http://uploadedstream.com/Terms%20of%20Service%20for%20uploaded.pdf';

    useEffect(()=>{
        console.log("params ",route.params.login);
    })
    //

    const OpenURL = async () =>{
        await Linking.openURL(terms_url);
    }

    const handleEmailChange = (em)=>{
        var email_array = em.split(" ");
        var trimmed_email = email_array.join("");
        var valid_email = validate_email(trimmed_email);
        setEmail(trimmed_email);
    }

    const handlePasswordChange = (pass)=>{
        console.log("password change");
        setPassword(pass);
    }

    const handleUsernameChange = (username)=>{
        console.log("username change");
        setUsername(username);
    }

    const validate_email = (email) =>{
        console.log(email);
        var email_regex = new RegExp(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/);
        var email_valid = email_regex.test(email);
        //if email is not valid
        if(email_valid == false){
            console.log("email is invalid");
            setEmailInputColor("#f44336");
            return false;
        }else{
            console.log("email is valid");
            setEmailInputColor("#4caf50");
            return true;
        }
    }

    //sing up form submission
    const signUp = ()=>{
        var valid_email = validate_email(email);
        if(username == "" || username == null || username == undefined || username.length < 2){
            Alert.alert("Your username must be at least 2 characters long.");
        }
        else if(valid_email == false || email == "" || email == null || email == undefined){
            Alert.alert("Please enter a valid email address");
        }else if(password == "" || password == null || password == undefined || password.length < 8){
            Alert.alert("Your password must be at least 8 characters long.");
        }else if(terms == false){
            Alert.alert("You must accept the terms and conditions before signing up");
        }
        else{
            registerApi();
        }
    }

    const registerApi = () =>{
        fetch('http://185.237.96.39:3000/users/users?type=register&&email='+email+'&&password='+password+"&&username="+username)
        .then((response) => response.json())
        .then( async (json) =>{
            if(json.Outcome == 'Registration successfull'){
                await AsyncStorage.setItem('email', email);
                // navigation.navigate('Uploaded');
                route.params.login(true,email);
            }else if(json.Outcome == 'Registration failed. Email exists. Authentication test failed'){
                Alert.alert("The email address belongs to an existing account.");
            }
            else{
                Alert.alert('Registration unsuccessful');
            }
        })
        .catch((error) => console.error(error))
        // .finally(() => navigation.navigate('Uploaded'));
    }


    return(
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <StatusBar backgroundColor='#eb8d35' barStyle="light-content"/>
            <View style={styles.header}>
                {/* <Text style={styles.text_header}>Sign up</Text> */}
            </View>
            <View style={styles.footer}>
                <Text style={[styles.text_footer, {
                    color: 'white'
                }]}>Username</Text>
                <View style={styles.action}>
                    <TextInput 
                        style={[styles.textInput, {
                            color: 'white'
                        }]}
                        autoCapitalize="none"
                        value={username}
                        onChangeText={(val) => handleUsernameChange(val)}
                    />
                </View>
                <Text style={[styles.text_footer, {
                    color: 'white',
                    marginTop:35
                }]}>Email</Text>
                <View style={[styles.action,{borderBottomColor:'#000'}]}>
                    <TextInput 
                        style={[styles.textInput, {
                            color: 'white',
                            borderColor:emailInputColor,
                            borderBottomWidth:1
                        }]}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(val) => handleEmailChange(val)}
                    />
                </View>
                <Text style={[styles.text_footer, {
                    color: 'white',
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                <TextInput 
                    secureTextEntry={true}
                    style={[styles.textInput, {
                        color: 'white'
                    }]}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(val) => handlePasswordChange(val)}
                />
            </View>
                <View style={{color:'white',justifyContent: 'center',flexDirection: 'row',marginTop:20}}> 
                    <CheckBox
                        value={terms}
                        // checked={true}
                        tintColors={{ true: '#eb8d35', false: 'black' }}
                        onValueChange={()=> setTerms(!terms)}
                    />
                    <Text onPress={()=>OpenURL()} style={{color:'white',marginTop:5,textDecorationLine:'underline'}}>Accecpt terms and conditions</Text>
                </View>
            <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn} 
                        onPress={()=>signUp()}
                    >
                    <LinearGradient
                        colors={['#eb8d35', '#eb8d35']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#000'
                        }]}>Sign up</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>

    )
}
export default Register
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000000'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#000000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#fff',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });