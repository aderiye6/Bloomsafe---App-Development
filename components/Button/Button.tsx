import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BLOOM_GREEN, BLOOM_WHITE } from '../../constants';

interface Props {
  text: string;
  onPress: () => void;
  width?: number;
  variant?: 'green' | 'white';
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  onPress,
  width = null,
  variant,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        width ? { width: width } : null,
        variant === 'white' ? styles.whiteButton : styles.greenButton,
      ]}
      disabled={disabled}
    >
      <Text style={variant === 'white' ? styles.greenText : styles.whiteText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: BLOOM_GREEN,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: BLOOM_GREEN,
  },
  whiteButton: {
    backgroundColor: BLOOM_WHITE,
  },
  whiteText: {
    color: BLOOM_WHITE,
  },
  greenText: {
    color: BLOOM_GREEN,
  },
});

export default Button;
