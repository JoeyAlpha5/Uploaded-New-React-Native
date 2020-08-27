import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    TextInput
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const Register= ({navigation}) =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mobile, setMobile] = useState();
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#eb8d35' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign up</Text>
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
                        // onChangeText={(val) => handleEmailChange(val)}
                    />

                </View>
                <Text style={[styles.text_footer, {
                    color: 'white',
                    marginTop:35
                }]}>Mobile</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="phone"
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
                        value={mobile}
                        // onChangeText={(val) => handleEmailChange(val)}
                    />

                </View>
                <Text style={[styles.text_footer, {
                    color: 'white',
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                <Feather 
                    name="lock"
                    color='#eb8d35'
                    size={20}
                />
                <TextInput 
                    // placeholder="Your Password"
                    // placeholderTextColor="#666666"
                    secureTextEntry={true}
                    style={[styles.textInput, {
                        color: 'white'
                    }]}
                    autoCapitalize="none"
                    value={password}
                    // onChangeText={(val) => handlePasswordChange(val)}
                />
            </View>
            <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        
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
        </View>
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