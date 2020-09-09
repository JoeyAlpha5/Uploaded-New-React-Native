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
    AsyncStorage,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const Login= ({navigation, route}) =>{
    const [emailInputColor,setEmailInputColor] = useState('#f2f2f2');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handlePasswordChange = (pass)=>{
        setPassword(pass)
    };
    const handleEmailChange =(em) =>{
        var email_array = em.split(" ");
        var trimmed_email = email_array.join("");
        var valid_email = validate_email(trimmed_email);
        setEmail(trimmed_email);
    };

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

    const loginHandle = (em,pass)=>{
        var valid_email = validate_email(em);
        if(em == "" || valid_email == false || em == null || em == undefined){
            Alert.alert('Please enter a valid email address');
        }else if(pass == "" || pass == null || pass == undefined){
            Alert.alert('Please enter your password');
        }else{
        // console.log(em,pass);
        fetch('http://185.237.96.39:3000/users/users?type=login&&email='+em+'&&password='+pass)
        .then((response) => response.json())
        // .then((json) => setFeed(json.Outcome))
        .then( async (json) =>{
            if(json.Outcome == 'Authentication test passed'){
                await AsyncStorage.setItem('email', em);
                var savedEmail = await AsyncStorage.getItem("email");
                // navigation.navigate('Uploaded');
                // console.log(savedEmail);
                route.params.login(true,savedEmail);
                // console.log(route);

            }else{
                Alert.alert('User does not exist, please check your email address or password');
            }
        })
        .catch((error) => console.error(error))
        // .finally(() => navigation.navigate('Uploaded'));
        }

    };
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#eb8d35' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign in to Uploaded</Text>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.text_footer, {
                    color: 'white'
                }]}>Email</Text>
                <View style={[styles.action,{borderBottomColor:'#000'}]}>
                    <TextInput 
                        // placeholder="Your Email"
                        // placeholderTextColor="#666666"
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
                    // placeholder="Your Password"
                    // placeholderTextColor="#666666"
                    secureTextEntry={true}
                    style={[styles.textInput, {
                        color: 'white',
                    }]}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={()=>navigation.navigate('PasswordReset')}>
                    <Text style={{color: '#eb8d35', marginTop:15}}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {loginHandle( email, password )}}
                    >
                    <LinearGradient
                        colors={['#eb8d35', '#eb8d35']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#000'
                        }]}>Sign In</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Login
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
        marginTop: 50
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