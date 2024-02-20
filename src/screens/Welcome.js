import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'



export default function Welcome() {
 const navigation = useNavigation()

 return (
      <View style={styles.container}>

        <View style={styles.containerLogo}>
            <Animatable.Image
                animation={"flipInY"}
                source={require("../assets/images/LogoHappyHamster.png")}
                style={{ width: '100%'}}
                resizeMode='contain'
            />
        </View>

            <Animatable.View animation="fadeInUp" delay={600} style={styles.containerForm}>
                <Text style={styles.title}> Have a nice day! </Text>
                <Text style={styles.text}> How do you want to access? </Text>

                <TouchableOpacity style={styles.button} onPress={ ()=> navigation.navigate('Login')}>
                    <Text style={styles.buttonText}> Acessar </Text>
                </TouchableOpacity>
            </Animatable.View>
        
      </View>
    )
  
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCF4D7'
    },
    containerLogo:{
        flex: 2,
        backgroundColor: '#FCF4D7',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    containerForm:{
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    text:{
        color: '#a1a1a1'
    },
    button:{
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        botton: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 18,
        color: '#FFC800',
        fontWeight: 'bold'
    }
})