import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function AboutScreen() {
  return (
    
    <View style={styles.container}>
      <Text>About Screen</Text>
      <View style={styles.sectionContainer}>
        <Image source={require('../assets/images/hamster1.png')} style={styles.image} />
        <View style={styles.textContainer1}>
          <Text style={styles.sectionText}>About Hamsters: </Text>
          <Text style={styles.sectionContent}> Hamsters are small rodents that are commonly kept as pets. They belong to the subfamily Cricetinae, which contains around 18 species. These furry creatures are native to Europe and Asia and are known for their compact size and adorable appearance. Overall, hamsters make delightful pets for individuals and families alike, providing companionship and entertainment with their playful antics. </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.textContainer2}>
          <Text style={[styles.sectionText2, styles.textRight]}>Hamster Curiosities: </Text>
          <Text style={styles.sectionContent}> Hamsters are fascinating creatures with many unique traits and behaviors. Here are some interesting facts about these adorable rodents: Teeth: Hamsters have continuously growing incisor teeth, which they must gnaw on to keep them from becoming overgrown.</Text>
        </View>
        <Image source={require('../assets/images/hamsterInARope.png')} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCF4D7',
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer1: {
    maxWidth: '50%',
    marginLeft: 20
  },
  textContainer2: {
    maxWidth: '60%',
    marginRight: 20,
    marginBottom: 50
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    //marginTop: 10,
    
  },
  sectionText2: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
    
  },
  sectionContent: {
    textAlign: 'justify',
  },
  textRight: {
    textAlign: 'right',
  },
});
