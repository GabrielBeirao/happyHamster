import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataJSON = await AsyncStorage.getItem('userSalvos');
                if (userDataJSON) {
                    const userData = JSON.parse(userDataJSON);
                    setUserData(userData);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil do Usuário</Text>
            <View style={styles.userInfoContainer}>
                <Text>Nome de usuário: {userData.username}</Text>
                <Text>Email: {userData.email}</Text>
                <Text>Telefone: {userData.telefone || 'Não fornecido'}</Text>
                <Text>Nickname: {userData.nickname || 'Não fornecido'}</Text>
                <Text>Gênero: {userData.genere || 'Não fornecido'}</Text>
                <Text>Data de Nascimento: {userData.birthdate || 'Não fornecido'}</Text>
                <Text>Imagem do Avatar: {userData.avatarImage || 'Não fornecido'}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfileScreen")}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF4D7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfoContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#495D32',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
