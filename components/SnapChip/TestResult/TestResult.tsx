import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../Button/Button';
import Light from '../Light/Light';

interface Props {
  result: number;
}

const TestResult: React.FC<Props> = ({ result }) => {
  const resultText =
    result < 4
      ? 'Water is really Bad to drink or play in'
      : result >= 4 && result < 6
      ? 'Water is slightly safe to drink or play in'
      : 'Water is safe to drink or play in';

  return (
    <View style={styles.container}>
      <View style={styles.lightContainer}>
        <Light color='green' active={result >= 6} />
        <Light color='yellow' active={result >= 4 && result < 6} />
        <Light color='red' active={result < 4} />
      </View>
      <Text style={styles.resultText}>{resultText}</Text>
      <Button text='Done' onPress={() => undefined} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    gap: 20,
  },
  lightContainer: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default TestResult;
