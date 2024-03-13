//RegisterUser.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useAuth } from './AuthContext'; // Importe useAuth

export default function RegisterUser() {
    const navigation = useNavigation();
    const [nomeInput, setNomeInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const cadastrar = async () => {
        try {
            // Recupera os dados de usuários do AsyncStorage
            const usuariosVetor = JSON.parse(await AsyncStorage.getItem('userSalvos')) || [];

            // Cria um novo usuário
            const newUser = {
                username: nomeInput,
                password: senhaInput,
                email: emailInput,
                telefone: '',
                dispositivos: [],
                nickname: '', // Adicione o campo de nickname ao novo usuário
                genere: '', // Adicione o campo de genere ao novo usuário
                birthdate: '', // Adicione o campo de birthdate ao novo usuário
                avatarImage: '' 
            };

            // Adicione as informações de nickname, genere e birthdate ao novo usuário
            //newUser.nickname = ''; // Inicialmente deixe vazio
            //newUser.genere = '';
            //newUser.birthdate = '';
            // Adiciona o novo usuário ao vetor de usuários
            usuariosVetor.push(newUser);

            // Salva os dados atualizados no AsyncStorage
            await AsyncStorage.setItem('userSalvos', JSON.stringify(usuariosVetor));

            // Navegar para a próxima tela, passando os dados como parâmetros
            navigation.navigate('FirstAccess', {
                newUser: newUser // Passa o novo usuário como parâmetro
            });
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Registration Form</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Name</Text>
                <TextInput placeholder='Write your name or nickname' value={nomeInput} onChangeText={setNomeInput} style={styles.input} />

                <Text style={styles.title}>Email</Text>
                <TextInput placeholder='Write your Email' value={emailInput} onChangeText={setEmailInput} style={styles.input} />

                <Text style={styles.title}>Password</Text>
                <TextInput placeholder='Write your password' value={senhaInput} onChangeText={setSenhaInput} secureTextEntry={true} style={styles.input} />

                <TouchableOpacity style={styles.button} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonGoogle}>
                    <Text style={styles.buttonTextGoogle}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonRegisterText}>Already have an account? Login</Text>
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