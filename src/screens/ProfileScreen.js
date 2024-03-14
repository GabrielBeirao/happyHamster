import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
                <View style={styles.userInfoContainer}>

                <View style={styles.userInfoRow}>
                    <Text style={styles.titleUserInfo}>Name: </Text>
                    <Text style={styles.label}>{user.username || 'Não fornecido'}</Text>
                </View>

                <View style={styles.userInfoRow}>
                    <Text style={styles.titleUserInfo}>Email: </Text>
                    <Text style={styles.userInfo}>{user.email || 'Não fornecido'}</Text>
                </View>

                <View style={styles.userInfoRow}>
                    <Text style={styles.titleUserInfo}>Nickname: </Text>
                    <Text style={styles.userInfo}>{user.nickname || 'Não fornecido'}</Text>
                </View>
                    
                <View style={styles.userInfoRow}>
                    <Text style={styles.titleUserInfo}>Gênero: </Text>
                    <Text style={styles.userInfo}>{user.genere || 'Não fornecido'} </Text>
                </View>
                    
                <View style={styles.userInfoRow}>
                    <Text style={styles.titleUserInfo}>Data de Nascimento: </Text>
                    <Text style={styles.userInfo}>{user.birthdate || 'Não fornecido'}</Text>
                </View>
                    

                    <Text style={styles.titleUserInfo}>Imagem do Avatar:</Text>

                </View>
                    <View style={styles.imageContainer}>
                    
                        <Image style={styles.image} source={user.avatarImage || 'Não fornecido'}></Image> 
                        
                        
                    </View> 

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
    titleUserInfo: {
        fontWeight: "bold"
    },
    userInfoRow: {
        flexDirection: 'row',
        marginBottom: 5, // Ajuste o espaçamento conforme necessário
    },
    userInfoContainer: {
        marginBottom: 20,
        marginTop: 20,
        paddingStart: '8%',
        paddingEnd: '8%'
    },
    label: {
        fontWeight: 'normal',
        
    },
    button: {
        backgroundColor: '#495D32',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 150,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
        //marginTop: 10,
    }
});
