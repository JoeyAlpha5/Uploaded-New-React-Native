import React, {useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({navigation})=>{
    useEffect(() => {
        SplashScreen.hide();
      }, []);
    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='#eb8d35' barStyle="light-content"/>
                <Image source={require('../assets/logo.png')} resizeMode="stretch" style={styles.logo}/>
                <Text style={styles.title}>Bringing you closer to the music.</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <LinearGradient
                            colors={['#eb8d35', '#eb8d35']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Sign in</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                        <LinearGradient
                            colors={['#ffffff', '#ffffff']}
                            style={styles.register}
                        >
                            <Text style={styles.textRegister}>Sign up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
        </View>
    )
}
export default Splash
const {height, width} = Dimensions.get("screen");
const height_logo = height * 0.28;
const button_width = width * 0.95;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000000',
    alignItems:'center',
    justifyContent:'center'
  },
  logo: {
      width: 125,
      height: 125
  },
  title: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      alignItems:'center'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 30,
      width:'100%',
      justifyContent:'center',
  },
  signIn: {
      width: button_width,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
  },
  register: {
        width: button_width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop:15
    },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  textRegister: {
    color: 'black',
    fontWeight: 'bold'
    }
});