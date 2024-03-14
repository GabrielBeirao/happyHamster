import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, Button, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';


const hamsters = [
  { id: 1, name: 'Hamster A', score: 98 },
  { id: 2, name: 'Hamster B', score: 97 },
  { id: 3, name: 'Hamster C', score: 89 },
  { id: 4, name: 'Hamster D', score: 88 },
  { id: 5, name: 'Hamster E', score: 85 },
];

const battleWinners = [
  { id: 1, name: 'Hamster A', imageUrl: require('../assets/images/avatarList/10.png') },
  { id: 2, name: 'Hamster B', imageUrl: require('../assets/images/avatarList/15.png') },
];

const friendsList = [
  { id: 1, name: 'Friend 1', imageUrl: require('../assets/images/avatarList/1.png') },
  { id: 2, name: 'Friend 2', imageUrl: require('../assets/images/avatarList/2.png') },
  { id: 3, name: 'Friend 3', imageUrl: require('../assets/images/avatarList/3.png') },
  { id: 4, name: 'Friend 4', imageUrl: require('../assets/images/avatarList/4.png') },
  { id: 5, name: 'Friend 5', imageUrl: require('../assets/images/avatarList/5.png') },
  { id: 6, name: 'Friend 6', imageUrl: require('../assets/images/avatarList/6.png') }
]


export default function LeagueScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const inviteFriend = (friendName) => {
    Alert.alert('Challenge invited!');
  };

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={item.imageUrl} style={styles.friendImage} />
      <Text style={styles.friendName}>{item.name}</Text>
      <Button title="Invite" onPress={() => inviteFriend(item.name)} style={styles.inviteButton}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>League Screen</Text>
        <LottieView source={require('../assets/animations/trophyAnimation.json')} autoPlay loop style={styles.trophyLottieAnimation} />
      </View>

      <Animatable.View animation="bounceInLeft" delay={500}>
        <Text style={styles.header}>Ranking Geral</Text>
        <View style={styles.rankingContainer}>
          {hamsters.map((hamster, index) => (
            <View key={hamster.id} style={styles.hamsterEntry}>
              <Text style={styles.rankText}>{index + 1}</Text>
              <Text style={styles.nameText}>{hamster.name}</Text>
              <Text style={styles.scoreText}>{hamster.score}</Text>
            </View>
          ))}
        </View>
      </Animatable.View>

      <Animatable.View animation="bounceInRight" delay={500}>
        <Text style={styles.header}>Resultado da Batalha</Text>
        <View style={styles.battleContainer}>
          {battleWinners.map((winner, index) => (
            <View key={winner.id} style={styles.winnerEntry}>
              <Image source={winner.imageUrl} style={styles.winnerImage} />
              <Text style={styles.winnerName}>{winner.name}</Text>
              {index === Math.floor(battleWinners.length / 2) && <LottieView source={require('../assets/animations/battleAnimation.json')} autoPlay loop style={styles.battleLottieAnimation} />}
            </View>
          ))}
        </View>
      </Animatable.View>

      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Challange a friend!</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={friendsList}
              renderItem={renderFriendItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

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
  battleContainer: {
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

