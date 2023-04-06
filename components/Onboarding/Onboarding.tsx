import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../Button/Button';

interface Props {
  exit: () => void;
}

const Onboarding: React.FC<Props> = ({ exit }) => {
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <Button text='Get Started' onPress={exit} width={250} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Onboarding;
