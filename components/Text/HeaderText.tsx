import React from 'react';
import { Text } from 'react-native';
import { BLOOM_GREEN } from '../../constants';

export default function HeaderText({ text }: { text: string }) {
  return (
    <Text
      style={{
        fontSize: 35,
        fontWeight: 'bold',
        color: BLOOM_GREEN,
      }}
    >
      {text}
    </Text>
  );
}
