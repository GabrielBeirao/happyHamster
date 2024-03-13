import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { VictoryChart, VictoryBar, VictoryTooltip } from 'victory-native';
import * as Animatable from 'react-native-animatable';

const DATA = [
  { x: 'Dia 1', y: 200, color: '#B7DEFF', unidade: 'm' },
  { x: 'Dia 2', y: 300, color: '#8BCAFF', unidade: 'm' },
  { x: 'Dia 3', y: 600, color: '#1896FF', unidade: 'm' },
  { x: 'Dia 4', y: 500, color: '#38A5FF', unidade: 'm' },
  { x: 'Dia 5', y: 100, color: '#DCEFFF', unidade: 'm' },
  { x: 'Dia 6', y: 900, color: '#006FCB', unidade: 'm' },
  { x: 'Dia 7', y: 400, color: '#5DB5FF', unidade: 'm' }
];

const legendData = [
  { day: 'Dia 1', explanation: 'Explicação sobre o Dia 1' },
  { day: 'Dia 2', explanation: 'Explicação sobre o Dia 2' },
  { day: 'Dia 3', explanation: 'Explicação sobre o Dia 3' },
  { day: 'Dia 4', explanation: 'Explicação sobre o Dia 4' },
  { day: 'Dia 5', explanation: 'Explicação sobre o Dia 5' },
  { day: 'Dia 6', explanation: 'Explicação sobre o Dia 6' },
  { day: 'Dia 7', explanation: 'Explicação sobre o Dia 7' }
];

export default function HomeScreen() {
  const [selected, setSelected] = useState('');
  const explanationRef = useRef(null);
  const previousSelected = useRef(null);

  useEffect(() => {
    if (selected !== previousSelected.current && previousSelected.current !== null) {
      explanationRef.current?.bounceOutUp();
      setTimeout(() => {
        explanationRef.current?.bounceInDown();
      }, 500);
    } else {
      explanationRef.current?.bounceInDown();
    }
    previousSelected.current = selected;
  }, [selected]);

  const handleDayClick = (day) => {
    setSelected(day === selected ? '' : day); // Toggle selection
  }

  const renderLegend = () => {
    // Divide o conjunto de dados em duas partes para duas linhas
    const firstRow = legendData.slice(0, Math.ceil(legendData.length / 2));
    const secondRow = legendData.slice(Math.ceil(legendData.length / 2));

    return (
      <View style={styles.legendContainer}>
        <View style={styles.legendRow}>
          {firstRow.map((dayData, index) => (
            <TouchableWithoutFeedback key={dayData.day} onPress={() => handleDayClick(dayData.day)}>
              <View style={[styles.legendItem, { opacity: (dayData.day === selected ? 1 : 0.5), }]}>
                <Text>{dayData.day}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <View style={styles.legendRow}>
          {secondRow.map((dayData, index) => (
            <TouchableWithoutFeedback key={dayData.day} onPress={() => handleDayClick(dayData.day)}>
              <View style={[styles.legendItem, { opacity: (dayData.day === selected ? 1 : 0.5), }]}>
                <Text>{dayData.day}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }

  const renderExplanation = () => {
    const selectedDay = legendData.find(dayData => dayData.day === selected);
    const explanationMessage = getExplanation(selected);

    return (
      <Animatable.View
        ref={explanationRef}
        style={[styles.explanationContainer, { display: selected ? 'flex' : 'none' }]}
      >
        <View style={styles.explanationContent}>
          <Text style={styles.explanationText}>{selectedDay?.explanation}</Text>
          <Text style={styles.explanationText}>{explanationMessage}</Text>
        </View>
      </Animatable.View>
    );
  }

  const getExplanation = (selectedDay) => {
    const index = legendData.findIndex(dayData => dayData.day === selectedDay);
    if (index !== -1) {
      const currentDay = DATA[index];
      const previousDay = index > 0 ? DATA[index - 1] : null;
      const nextDay = index < DATA.length - 1 ? DATA[index + 1] : null;
      let comparisonMessage = '';
      if (previousDay) {
        const differenceWithPrevious = currentDay.y - previousDay.y;
        const differenceMessage = differenceWithPrevious > 0 ? 'a mais' : 'a menos';
        comparisonMessage += `${Math.abs(differenceWithPrevious)} metros ${differenceMessage} que no ${previousDay.x}`;
      }
      if (previousDay && nextDay) comparisonMessage += ' e ';
      if (nextDay) {
        const differenceWithNext = currentDay.y - nextDay.y;
        const differenceMessage = differenceWithNext > 0 ? 'a mais' : 'a menos';
        comparisonMessage += `${Math.abs(differenceWithNext)} metros ${differenceMessage} que no ${nextDay.x}`;
      }
      return `No ${selectedDay}, seu hamster caminhou ${currentDay.y} metros! ${comparisonMessage}`;
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à tela inicial!</Text>
      {renderExplanation()}

      <Animatable.View style={styles.chart}>
        <VictoryChart domainPadding={40}>
          <VictoryBar
            data={DATA}
            style={{
              data: {
                fill: ({ datum }) => datum.color,
                fillOpacity: ({ datum }) => (datum.x === selected ? 1 : 0.3),
              },
            }}
            labels={({ datum }) => `${datum.x}: ${datum.y}${datum.unidade}`}
            labelComponent={<VictoryTooltip renderInPortal={false} style={{ color: 'black' }} />}
          />
        </VictoryChart>
      </Animatable.View>

      <View style={styles.legend}>
        {renderLegend()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCF4D7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40
  },
  chart: {
    flex: 1,
    //marginTop: 30
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 100, // Adjust spacing as needed
    width: '100%'
  },
  legendContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E8E8E8',
    margin: 5, // Espaçamento entre os botões
  },
  explanationContainer: {
    backgroundColor: '#DAF7A6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 30,
    width: '80%',
    alignItems: 'center'
  },
  explanationContent: {
    opacity: 1, // Garante que o conteúdo seja visível durante a animação
  },
  explanationText: {
    fontSize: 16,
    textAlign: 'center'
  }
});
