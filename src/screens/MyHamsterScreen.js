import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Pressable, StyleSheet, Text, Modal, TouchableOpacity, FlatList, Alert, Button } from 'react-native';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable'

export default function MyHamsterScreen() {
  
  const hamsterList = [
    { id: 1, name: 'Hamster A', genere: genereHamster, minWalk: "Min walk: " + 12, maxWalk: "Max walk: " + 105 + "Km",  imageUrl: require('../assets/images/avatarList/8.png') },
    { id: 2, name: 'Hamster B', genere: genereHamster, minWalk: "Min walk: " + 25, maxWalk: "Max walk: " + 95 + "Km",  imageUrl: require('../assets/images/avatarList/7.png') },
    { id: 3, name: nameHamster, genere: genereHamster, minWalk: "Min walk: " + 17, maxWalk: "Max walk: " + 112 + "Km",  imageUrl: imgHamster }
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const registerNewHamster = (newHamster) => {
    Alert.alert('New hamster added!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Hamster Screen</Text>
      </View>

      <Animatable.View animation="bounceInLeft" delay={500}>
        <Text style={styles.header}>My hamsters</Text> 
        <View style={styles.myHamsterContainer}>
        <View style={styles.rankingContainer}>
          {hamsterList.map((hamster, index) => (
            <View key={hamster.id} style={styles.hamsterEntry}>
              <Image source={hamster.imageUrl} style={styles.hamsterImage} />
              <Text style={styles.rankText}>{index + 1}</Text>
              <Text style={styles.nameText}>{hamster.name}</Text>
              <Text style={styles.scoreText}>{hamster.minWalk}</Text>
              <Text style={styles.scoreText}>{hamster.maxWalk}</Text>
            </View>
          ))}
        </View>
        </View>
      </Animatable.View>

      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Register a new Hamster</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCF4D7',
    flex: 1,
    padding: 25,
    marginTop: 20
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  hamsterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rankingContainer: {
    marginBottom: 20,
    paddingStart: '2%',
    paddingEnd: '5%'
  },
  hamsterEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rankText: {
    fontWeight: 'bold',
  },
  nameText: {

  },
  scoreText: {

  },
  myHamsterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 2, // Adicionando uma borda
    borderColor: 'black', // Cor da borda
    borderRadius: 10,
    padding: 10, // Adicionando espaço interno para os componentes
    alignItems: 'center', // Alinha verticalmente
  },
  winnerEntry: {
    alignItems: 'center',
  },
  winnerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  winnerName: {

  },
  trophyLottieAnimation: {
    width: 70,
    height: 80,
    marginRight: 10,
  },
  battleLottieAnimation: {
    width: 100,
    height: 100,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#EFFDE1',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    flex: 1,
  },
  inviteButton: {
    backgroundColor: '#FCF4D7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  }
});