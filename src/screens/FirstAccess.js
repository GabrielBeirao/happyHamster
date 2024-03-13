//FirstAccess.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstAccess() {
    const navigation = useNavigation();
    const route = useRoute();
    const { newUser } = route.params; // Obtenha o novo usuário dos parâmetros de rota
    const [nickname, setNickname] = useState(newUser.nickname); // Inicialize os estados com os valores passados ​​nos parâmetros
    const [genere, setGenere] = useState(newUser.genere);
    const [birthdate, setBirthdate] = useState(newUser.birthdate ? new Date(newUser.birthdate) : new Date()); // Se birthdate não estiver definido, use a data atual
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const cadastrarFirstAcees = async () => {
        try {
            // Salvar a data de nascimento
            await AsyncStorage.setItem('birthdate', birthdate.toString());
            await AsyncStorage.setItem('nickname', nickname);
            await AsyncStorage.setItem('genere', genere);
            
            // Navegar para a próxima tela
            navigation.navigate('AvatarScreen', {
                newUser: newUser // Passa o novo usuário como parâmetro
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthdate; // Use birthdate em vez de date
        setShowDatePicker(Platform.OS === 'ios');
        setBirthdate(currentDate); // Use setBirthdate em vez de setDate
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>How do you wish to be called?</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Animatable.View delay={500} >
                    <Text style={styles.title}>Nickname</Text>
                    <TextInput 
                        placeholder='Write your hamster name/nickname' 
                        style={styles.input} 
                        value={nickname} 
                        onChangeText={setNickname} // Corrigido o uso de onChangeText
                    />
                </Animatable.View>

                <Animatable.View delay={500} >
                    <Text style={styles.title}>Genere Screen</Text>
                    <TextInput 
                        placeholder='Write your genere' 
                        style={styles.input} 
                        value={genere} 
                        onChangeText={setGenere} // Corrigido o uso de onChangeText
                    />
                </Animatable.View>

                <Animatable.View delay={500} >
                    <Text style={styles.title}>Birthdate</Text>
                    <TouchableOpacity onPress={showDatepicker}>
                        <Text>{birthdate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={birthdate}
                            mode="date"
                            display="default"
                            onChange={onChange}
                            textColor="#333333" // Cor do texto
                            backgroundColor="#DAF7A6" // Cor de fundo do calendário
                            headerTextColor="#DAF7A6" // Cor do texto do cabeçalho
                            headerBackgroundColor="#DAF7A6" // Cor de fundo do cabeçalho
                        />
                    )}
                </Animatable.View>

                <TouchableOpacity style={styles.button} onPress={cadastrarFirstAcees}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonRegisterText}>Já possui uma conta? Faça o Login</Text>
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
        marginBottom: '3%',
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
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#a1a1a1'
    }
});
