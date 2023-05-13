import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useResultTextDisplay from '../../../hooks/useResultTextDisplay';
import Button from '../../Button/Button';
import Light from '../Light/Light';

interface Props {
  result: string;
  endTest: () => void;
}

const TestResult: React.FC<Props> = ({ result, endTest }) => {
  const { resultTextDisplay } = useResultTextDisplay(result);

  return (
    <View style={styles.container}>
      <View style={styles.lightContainer}>
        <Light
          color='green'
          active={result.toLowerCase() === 'slightly safe'}
        />
        <Light
          color='yellow'
          active={result.toLowerCase() === 'slightly bad'}
        />
        <Light color='red' active={result.toLowerCase() === 'really bad'} />
      </View>
      <Text style={styles.resultText}>{resultTextDisplay || result}</Text>
      <Button text='Done' onPress={endTest} />
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
