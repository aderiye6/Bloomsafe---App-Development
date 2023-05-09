import React from 'react';
import { Text } from 'react-native';
import { BLOOM_GREEN } from '../../constants';

interface Props {
  text: string;
}

export default function AlertText({ text }: Props) {
  return (
    <Text
      style={{
        color: BLOOM_GREEN,
        fontSize: 30,
      }}
    >
      {text}
    </Text>
  );
}
