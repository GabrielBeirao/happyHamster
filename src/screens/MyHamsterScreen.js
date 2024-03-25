import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Pressable, StyleSheet, Text, Modal, TouchableOpacity, FlatList, Alert, Button, TextInput,} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import mockHamsterHistory from './mockHamsterHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomProgressBar from '../components/statusBar/CustomProgressBar'

export default function MyHamsterScreen() {
  const [nameHamster, setNameHamster] = useState('');
  const [genereHamster, setGenereHamster] = useState('');
  const [imgHamster, setImgHamster] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleHistory, setModalVisibleHistory] = useState(false);
  const [hamsterList, setHamsterList] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedHamsterData, setSelectedHamsterData] = useState(null);
  const [hamsterHistory, setHamsterHistory] = useState([]);
  const [rewardModalVisible, setRewardModalVisible] = useState(false);

  // Atualize o estado para incluir o progresso máximo das recompensas
  const [rewardProgress, setRewardProgress] = useState([
    { currentProgress: 100, maxProgress: 100 }, // Recompensa 1 - definida como 100 para mostrar a reward
    { currentProgress: 60, maxProgress: 100 }, // Recompensa 2 - colocar 0 em todas depois para a lógica correta
    { currentProgress: 30, maxProgress: 100 }, // Recompensa 3 - colocar 0 em todas depois para a lógica correta
  ]);
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
  ]

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





// Atualize a função para incrementar o progresso de uma recompensa
const incrementRewardProgress = (index, incrementAmount) => {
  const updatedProgress = [...rewardProgress];
  updatedProgress[index].currentProgress += incrementAmount;
  // Garante que o progresso não ultrapasse o máximo
  updatedProgress[index].currentProgress = Math.min(updatedProgress[index].currentProgress, updatedProgress[index].maxProgress);
  setRewardProgress(updatedProgress);
};


// Atualize a função para desbloquear uma recompensa
const unlockReward = (rewardIndex) => {
  // Verifica se o progresso atingiu o máximo
  if (rewardProgress[rewardIndex].currentProgress === rewardProgress[rewardIndex].maxProgress) {
    Alert.alert('Congratulations!', 'You have unlocked a new food for your hamster!');
    // Aqui você pode adicionar a lógica para recompensar o usuário com o item desbloqueado
  } else {
    // Caso o progresso ainda não tenha atingido o máximo
    Alert.alert('Not yet!', 'Complete the progress to unlock the reward.');
  }
};

  const chooseFromAvatarList = (avatar) => {
    setSelectedAvatar(avatar);

  };

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity onPress={() => chooseFromAvatarList(item)}>
      <Image source={item} style={styles.avatarItem} />
    </TouchableOpacity>
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openHistoryModal = () => {
    setModalVisibleHistory(true);
    // Lógica para carregar o histórico do hamster do AsyncStorage
    fetchHamsterHistory();
  };

  const closeHistoryModal = () => {
    setModalVisibleHistory(false);
  };

  const fetchHamsterHistory = () => {
    setHamsterHistory(mockHamsterHistory);
  };

  // Função para carregar o histórico do hamster do AsyncStorage
  // const fetchHamsterHistory = async () => {
  //   try {
  //     const historyData = await AsyncStorage.getItem('hamsterHistory');
  //     if (historyData) {
  //       const parsedHistory = JSON.parse(historyData);
  //       setHamsterHistory(parsedHistory);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar o histórico do hamster:', error);
  //   }
  // };

  const saveNewHamster = () => {
    const newHamster = { id: hamsterList.length + 1, name: nameHamster, genere: genereHamster, imageUrl: selectedAvatar };
    setHamsterList([...hamsterList, newHamster]);
    setNameHamster('');
    setGenereHamster('');
    setSelectedImage(selectedAvatar);
    setSelectedHamsterData({ name: nameHamster, genere: genereHamster });
    closeModal();
    // Salvar os dados no AsyncStorage
    AsyncStorage.setItem('hamsterList', JSON.stringify([...hamsterList, newHamster]));
    Alert.alert('New hamster added!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Hamster Screen</Text>
      </View>

      <Animatable.View animation="bounceInLeft" delay={500}>
        <Text style={styles.header}>My hamsters</Text>

        {/* {selectedImage && (
            <View style={styles.selectedHamsterContainer}>
              <Image source={selectedImage} style={styles.selectedHamsterImage} />
              <Text style={styles.selectedHamsterName}>{selectedHamsterData.name}</Text>
              <Text style={styles.selectedHamsterGenere}>{selectedHamsterData.genere}</Text>
            </View>
          )} */}
        <View style={styles.hamsterContainer}>
          {user && (
            <>

              <View style={styles.imageContainer}>
                <Image style={styles.hamsterImage} source={user.avatarImage || 'Não fornecido'}></Image>
              </View>

              <View style={styles.userInfoRow}>
                <Text style={styles.nameTextTitle}>Name: </Text>
                <Text style={styles.nameText}>{user.nickname || 'Não fornecido'}</Text>
              </View>

              <View style={styles.userInfoRow}>
                <Text style={styles.genereTextTitle}>Gênero: </Text>
                <Text style={styles.userInfo}>{user.genere || 'Não fornecido'} </Text>
              </View>

            </>
          )}
        </View>

        <View style={styles.myHamsterContainer}>
          {hamsterList.map((hamster, index) => (
            <View key={hamster.id} style={styles.hamsterContainer}>
              <Image source={hamster.imageUrl} style={styles.hamsterImage} />

              <Text style={styles.nameTextTitle}>Name: </Text>
              <Text>{hamster.name}  </Text>

              <Text style={styles.nameTextTitle}>Genere: </Text>
              <Text>{hamster.genere}</Text>
            </View>
          ))}
        </View>

      </Animatable.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Register a new Hamster</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openHistoryModal}>
          <Text style={styles.buttonText}>My hamster history</Text>
        </TouchableOpacity>

      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => setRewardModalVisible(true)}>
          <Text style={styles.buttonText}>Rewards</Text>
        </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Hamster name / nickname:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNameHamster}
              value={nameHamster}
            />
            <Text>Hamster genere:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setGenereHamster}
              value={genereHamster}
            />
            <Text>Select a avatar:</Text>
            <FlatList
              data={avatarList}
              renderItem={renderAvatarItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              contentContainerStyle={styles.avatarListContainer}
            />

            {/* <TouchableOpacity style={styles.button}>
              <Text>Save new hamster</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text>Close</Text>
            </TouchableOpacity> */}
            <Button title="Save new hamster" onPress={saveNewHamster} />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      {/* Modal do histórico do hamster */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleHistory}
        onRequestClose={closeHistoryModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hamster History</Text>
            {/* {user && <Text>Name: {user.nickname}</Text>} */}
            <FlatList
              data={hamsterHistory}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  {/* Exibe os detalhes do histórico do hamster */}
                  {user && <Text>Name: {user.nickname}</Text>}
                  <Text>Date: {item.date}</Text>
                  <Text>Event: {item.event}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <Button title="Close" onPress={closeHistoryModal} />
          </View>
        </View>
      </Modal>

      {/* Modal Rewards */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={rewardModalVisible}
  onRequestClose={() => setRewardModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Rewards</Text>
      {/* Barra de progresso para a primeira recompensa */}
      <View style={styles.progressContainer}>
  <Text>Complete 1km to unlock the reward</Text>
  <CustomProgressBar progress={rewardProgress[0].currentProgress} maxProgress={rewardProgress[0].maxProgress} />
  <TouchableOpacity
    style={styles.getRewardButton}
    onPress={() => unlockReward(0)}
  >
    <Text style={styles.getRewardButtonText}>Get Reward</Text>
  </TouchableOpacity>
</View>

<View style={styles.progressContainer}>
  <Text>Complete 5km to unlock the reward</Text>
  <CustomProgressBar progress={rewardProgress[1].currentProgress} maxProgress={rewardProgress[1].maxProgress} />
  <TouchableOpacity
    style={styles.getRewardButton}
    onPress={() => unlockReward(1)}
  >
    <Text style={styles.getRewardButtonText}>Get Reward</Text>
  </TouchableOpacity>
</View>

<View style={styles.progressContainer}>
  <Text>Complete 10km to unlock the reward</Text>
  <CustomProgressBar progress={rewardProgress[2].currentProgress} maxProgress={rewardProgress[2].maxProgress} />
  <TouchableOpacity
    style={styles.getRewardButton}
    onPress={() => unlockReward(2)}
  >
    <Text style={styles.getRewardButtonText}>Get Reward</Text>
  </TouchableOpacity>
</View>
      <Button title="Close" onPress={() => setRewardModalVisible(false)} />
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
  userInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    marginRight: 10
  },
  hamsterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2, // Adicionando uma borda
    borderColor: 'black', // Cor da borda
    borderRadius: 10,
    padding: 10,
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
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  hamsterEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rankText: {
    fontWeight: 'bold',
  },
  nameTextTitle: {
    fontWeight: 'bold'
  },
  nameText: {
    flexDirection: 'row'
  },
  genereTextTitle: {
    fontWeight: 'bold'
  },
  scoreText: {

  },
  // myHamsterContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   borderWidth: 2, // Adicionando uma borda
  //   borderColor: 'black', // Cor da borda
  //   borderRadius: 10,
  //   padding: 10, // Adicionando espaço interno para os componentes
  //   alignItems: 'center', // Alinha verticalmente
  // },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#495D32',
    width: '48%',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10, // Adicionando margem inferior
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
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
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  avatarListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  avatarItem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
  },
  selectedHamsterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedHamsterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  selectedHamsterName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedHamsterGenere: {
    fontSize: 16,
  },
  progressContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%', // A largura deve ser ajustada conforme necessário
    height: 10, // A altura deve ser ajustada conforme necessário
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    overflow: 'hidden',
  },
  getRewardButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  getRewardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },


});