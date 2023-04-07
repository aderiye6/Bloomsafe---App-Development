import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BLOOM_GREEN } from '../../constants';
import Button from '../Button/Button';
import UsageStep from './UsageStep/UsageStep';

const useageSteps = [
  {
    step: 1,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, asperiores!',
  },
  {
    step: 2,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, asperiores!',
  },
  {
    step: 3,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, asperiores!',
  },
  {
    step: 4,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, asperiores!',
  },
  {
    step: 5,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, asperiores!',
  },
];

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        steps to follow when Deeping the chip in water
      </Text>
      <View style={styles.steps}>
        {useageSteps.map((item) => (
          <UsageStep text={item.text} key={item.step} />
        ))}
      </View>

      <Button text='Next' onPress={() => console.log('pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: BLOOM_GREEN,
    textTransform: 'capitalize',
  },
  steps: {
    gap: 10,
  },
});

export default Home;
