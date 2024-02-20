import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Pressable, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable'

export default function MyHamsterScreen() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [distance, setDistance] = useState(0);
  const giftRef = useRef();

  const animationDuration = 10000; // 10 segundos

  useEffect(() => {
    if (showAnimation) {
      giftRef.current?.play();
      const timeout = setTimeout(() => {
        setShowAnimation(false);
      }, animationDuration);
      return () => clearTimeout(timeout);
    }
  }, [showAnimation]);

  const startAnimation = () => {
    setShowAnimation(true);
    setDistance(0);
    const interval = setInterval(() => {
      setDistance(prevDistance => prevDistance + 1);
    }, 1000); // Incrementando a distância a cada segundo
    setTimeout(() => {
      clearInterval(interval); // Parando a contagem quando a animação terminar
    }, animationDuration);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animatable.Image animation="flipInY" source={require("../assets/images/LogoHappyHamster.png")} style={styles.logo} />
      </View>
      <View style={styles.animationContainer}>
        {showAnimation && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{distance} metros</Text>
          </View>
        )}
        <LottieView
          ref={giftRef}
          style={[styles.animation, showAnimation ? {} : { display: 'none' }]}
          source={require("../assets/animations/hamsterAnimation.json")}
          loop={false}
        />
        {!showAnimation && (
          <Pressable style={styles.button} onPress={startAnimation}>
            <Text style={styles.buttonText}>Iniciar</Text>
          </Pressable>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF4D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 50, // Ajuste para garantir espaço para o logo
  },
  logo: {
    width: 200,
    height: 200,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  animation: {
    width: 300,
    height: 300,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFC800',
    fontSize: 18,
  },
  counterContainer: {
    position: 'absolute',
    top: 350, // Alteramos para garantir o espaçamento abaixo do Lottie
    marginBottom: 30, // Adicionamos um espaçamento abaixo do contador
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
