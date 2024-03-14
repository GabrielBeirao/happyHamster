import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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

export default function LeagueScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>League Screen</Text>
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
      <Text style={styles.header}>Resultado da Batalha</Text>
      <View style={styles.battleContainer}>
        {battleWinners.map((winner) => (
          <View key={winner.id} style={styles.winnerEntry}>
            <Image source={winner.imageUrl} style={styles.winnerImage} />
            <Text style={styles.winnerName}>{winner.name}</Text>
          </View>
        ))}
      </View>
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
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
    padding: 10, // Adicionando espaço interno para os componentes
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
});


