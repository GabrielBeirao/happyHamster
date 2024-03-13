//Login.js
import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/authContext';

//import { useAuth } from './AuthContext'; // Importe useAuth
//import { Context } from '../context/authContext';



export default function Login() {
    //const {state, teste} = useContext(Context)
    const navigation = useNavigation();
    const [nomeLogin, setNomeLogin] = useState('')
    const [senhaLogin, setSenhaLogin] = useState('')
    const { login } = useAuth()

    const logar = async () => {
        try {  
          //await AsyncStorage.removeItem('userSalvos')
          // Recupera os dados de usuários do AsyncStorage
          const usuariosVetor = JSON.parse(await AsyncStorage.getItem('userSalvos')) || [];
          console.log("usuarios no vetor: ", usuariosVetor)
          
          // Verifica se as credenciais de login correspondem a algum usuário
          const usuarioLogado = usuariosVetor.find(user => user.username === nomeLogin && user.password === senhaLogin);
    
          if (usuarioLogado) {
            Alert.alert('Login efetuado com sucesso!');
            login()
            //navigation.navigate('HomeScreen')
            
          } else {
            Alert.alert('Deu ruim! :(');
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
        }
      };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Login</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                <Text style={styles.title}>Username</Text>
                <TextInput placeholder='Write your Username' value={nomeLogin} onChangeText={setNomeLogin} style={styles.input} />

                <Text style={styles.title}>Password</Text>
                <TextInput placeholder='Write your password' value={senhaLogin} onChangeText={setSenhaLogin} secureTextEntry={true} style={styles.input} />

                <TouchableOpacity onPress={logar} style={styles.button}>
                    <Text style={styles.buttonText}>Access</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonGoogle}>
                    <Text style={styles.buttonTextGoogle}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('RegisterUser')}>
                    <Text style={styles.buttonRegisterText}>Don't have an account? Register</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF4D7'

    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black'
    },
    containerForm: {
        backgroundColor: '#EFFDE1',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28

    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#495D32',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonGoogle: {
        backgroundColor: '#CCCCCC',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonTextGoogle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 50,
        //justifyContent: 'center'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'

    },
    registerText: {
        color: '#a1a1a1'
    }

})

//export default Login;