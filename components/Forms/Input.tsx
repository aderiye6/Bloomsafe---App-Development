import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { BLOOM_GREEN } from '../../constants';

interface Props {
  type: 'text' | 'password' | 'email' | 'number';
  label: string;
  value: string;
  onChange: (text: string) => void;
}

export default function Input({ type, label, value, onChange }: Props) {
  let inputProps: TextInputProps = {};

  switch (type) {
    case 'text':
      inputProps = {
        keyboardType: 'default',
      };
      break;
    case 'password':
      inputProps = {
        autoCapitalize: 'none',
        autoCorrect: false,
        secureTextEntry: true,
      };
      break;
    case 'email':
      inputProps = {
        autoCapitalize: 'none',
        autoCorrect: false,
        keyboardType: 'email-address',
      };
      break;
    case 'number':
      inputProps = {
        autoCapitalize: 'none',
        autoCorrect: false,
        keyboardType: 'number-pad',
      };
      break;
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLOOM_GREEN,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  input: {
    borderColor: '#35363A',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 16,
  },
});
