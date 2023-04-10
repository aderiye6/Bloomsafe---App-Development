import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
      }}
    >
      <ActivityIndicator size='large' color='black' />
    </View>
  );
};

export default Spinner;
