import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BLOOM_GREEN, BLOOM_WHITE } from '../../constants';

interface Props {
  text: string;
  onPress: () => void;
  width?: number;
}

const Button: React.FC<Props> = ({ text, onPress, width = null }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, width ? { width: width } : null]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: BLOOM_GREEN,
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: BLOOM_WHITE,
  },
});

export default Button;
