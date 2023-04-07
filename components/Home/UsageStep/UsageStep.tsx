import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  text: string;
}

const UsageStep: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text>{`\u2022`}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default UsageStep;
