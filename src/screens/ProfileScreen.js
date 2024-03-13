
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Information</Text>
            {user && (
                <>
                    <Text style={styles.label}>Name: {user.username || 'Não fornecido'}</Text>
                    <Text style={styles.label}>Email: {user.email || 'Não fornecido'}</Text>
                    <Text style={styles.label}>Nickname: {user.nickname || 'Não fornecido'}</Text>
                    <Text style={styles.label}>Gênero: {user.genere || 'Não fornecido'}</Text>
                    <Text style={styles.label}>Data de Nascimento: {user.birthdate || 'Não fornecido'}</Text>
                    <Text style={styles.label}>Imagem do Avatar: {user.avatarImage || 'Não fornecido'}</Text>

                </>
            )}
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
