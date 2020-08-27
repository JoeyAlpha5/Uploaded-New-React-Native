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
    Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const ResetPassword = () =>{
    const { colors } = useTheme();
    const [email, setEmail] = useState();
    const handleEmailChange =(em) =>{
        setEmail(em);
    };

    const ResetHandle = () =>{
        if(email == null || email == ""){
            Alert.alert("Please enter your email address");
        }else{
            fetch('http://185.237.96.39:3000/users/users?type=pwdreset&&email='+email)
            .then((response) => response.json())
            .then((json) => {
                console.log(json.Outcome);
                Alert.alert("Password reset link has been sent to your email");
                setEmail("");
            })
            .catch((error) => {
                console.error(error);
            });
            
        }
    }
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#eb8d35' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Reset Password</Text>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.text_footer, {
                    color: 'white'
                }]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color='#eb8d35'
                        size={20}
                    />
                    <TextInput 
                        // placeholder="Your Email"
                        // placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: 'white'
                        }]}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(val) => handleEmailChange(val)}
                    />
                </View>
            <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {ResetHandle()}}
                    >
                    <LinearGradient
                        colors={['#eb8d35', '#eb8d35']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#000'
                        }]}>Reset password</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default ResetPassword
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
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
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