//AvatarScreen.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatarList = [
    require('../assets/images/avatarList/1.png'),
    require('../assets/images/avatarList/2.png'),
    require('../assets/images/avatarList/3.png'),
    require('../assets/images/avatarList/4.png'),
    require('../assets/images/avatarList/5.png'),
    require('../assets/images/avatarList/6.png'),
    require('../assets/images/avatarList/7.png'),
    require('../assets/images/avatarList/8.png'),
    require('../assets/images/avatarList/9.png'),
    require('../assets/images/avatarList/10.png'),
    require('../assets/images/avatarList/11.png'),
    require('../assets/images/avatarList/12.png'),
    require('../assets/images/avatarList/13.png'),
    require('../assets/images/avatarList/14.png'),
    require('../assets/images/avatarList/15.png'),
    require('../assets/images/avatarList/16.png'),
    require('../assets/images/avatarList/17.png'),
    require('../assets/images/avatarList/18.png'),
    require('../assets/images/avatarList/19.png'),
    require('../assets/images/avatarList/20.png'),
    require('../assets/images/avatarList/21.png')
];

export default function AvatarScreen({ route }) {
    const navigation = useNavigation();
    const { newUser } = route.params;
    console.log("new user: ", newUser)
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const onSavePressed = async () => {
        try {
            let selectedImage = image;
            if (!selectedImage && selectedAvatar) {
                // Se nenhum avatar foi selecionado da galeria ou da câmera,
                // mas um avatar da lista foi escolhido, usamos o caminho desse avatar.
                selectedImage = selectedAvatar;
            }
            if (selectedImage) {
                // Salvar a imagem do avatar no objeto newUser
                newUser.avatarImage = selectedImage;

                // Salvar a imagem do avatar no AsyncStorage (se necessário)
                await AsyncStorage.setItem('user', JSON.stringify(newUser));
            } else {
                // Caso nenhum avatar ou imagem tenha sido selecionado, você pode
                // tratar isso de acordo com o que for apropriado para sua aplicação.
                console.log('Nenhum avatar selecionado');
            }
            
            // Recupera os dados de usuários do AsyncStorage
            const usuariosVetor = JSON.parse(await AsyncStorage.getItem('userSalvos')) || [];
            // Adiciona o novo usuário ao vetor de usuários
            usuariosVetor.push(newUser);

            // Salva os dados atualizados no AsyncStorage
            await AsyncStorage.setItem('userSalvos', JSON.stringify(usuariosVetor));

            // Navegar para a tela de login
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Desculpe, precisamos da permissão da câmera para acessar a galeria de imagens.');
                }
            
        })();
    }, []);

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setSelectedAvatar(null); // Limpa o avatar selecionado da lista pré-disponibilizada
        }
    };

    const chooseFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setSelectedAvatar(null); // Limpa o avatar selecionado da lista pré-disponibilizada
        }
    };

    const chooseFromAvatarList = (avatar) => {
        setSelectedAvatar(avatar);
        setModalVisible(false);
    };

    const renderAvatarItem = ({ item }) => (
        <TouchableOpacity onPress={() => chooseFromAvatarList(item)}>
            <Image source={item} style={styles.avatarItem} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Choose your avatar</Text>
                <TouchableOpacity style={styles.buttonAvatar} onPress={() => setModalVisible(true)}>
                    <Ionicons name="images-outline" size={24} color="black" style={{ marginRight: 10 }} />
                    <Text style={styles.buttonTextAvatar}>Avatar</Text>
                </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.messageContainer}>or take a picture</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonGalerie} onPress={chooseFromGallery}>
                        <Ionicons name="images-outline" size={24} color="black" style={{ marginRight: 10 }} />
                        <Text style={styles.buttonTextGallery}>Gallery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonPicture} onPress={takePicture} >
                        <Ionicons name="camera-outline" size={24} color="black" style={{ marginRight: 10 }} />
                        <Text style={styles.buttonText}>Take a picture</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}></Text>
                <View style={styles.imageContainer}>
                    {selectedAvatar ? (
                        <Image source={selectedAvatar} style={styles.image} />
                    ) : (
                        <Text style={styles.placeholderText}>Profile Picture</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={onSavePressed}>
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonRegisterText}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </Animatable.View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Choose Avatar</Text>
                    <FlatList
                        data={avatarList}
                        renderItem={renderAvatarItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.avatarListContainer}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF4D7'
    },
    containerHeader: {
        marginTop: '5%',
        paddingStart: '5%',
        paddingEnd: '5%',
        height: 100
        //marginBottom: '3%',

    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20
    },
    messageContainer: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    containerForm: {
        backgroundColor: '#EFFDE1',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingTop: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#495D32',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonGalerie: {
        backgroundColor: '#CCCCCC',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '50%'
    },
    buttonTextGallery: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonPicture: {
        backgroundColor: '#495D32',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        width: '50%'
    },
    buttonAvatar: {
        backgroundColor: '#495D32',
        width: '100%',
        height: '35%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',


    },
    buttonTextAvatar: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',

    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    buttonRegisterText: {
        color: '#a1a1a1'
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
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    closeButton: {
        backgroundColor: '#495D32',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
    },
    avatarItem: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 5,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCF4D7'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 15
    },
    avatarListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
});
