import React from 'react';
import { View } from 'react-native';
import { BLOOM_GREEN } from '../../../constants';

interface Props {
  color: 'red' | 'yellow' | 'green';
  active?: boolean;
}

const Light: React.FC<Props> = ({ color, active }) => {
  return (
    <View
      style={{
        backgroundColor:
          color === 'red'
            ? '#E70101'
            : color === 'yellow'
            ? '#FEDB00'
            : BLOOM_GREEN,
        opacity: active ? 1 : 0.2,
        width: 80,
        height: 80,
        borderRadius: 40,
      }}
    ></View>
  );
};

export default Light;
