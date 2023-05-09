import React from 'react';
import { View } from 'react-native';
import Spinner from './Spinner';

export default function PageSpinner() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </View>
  );
}
