import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BLOOM_GREEN } from '../../constants';

interface Props {
  camera?: boolean;
  location?: boolean;
}

const PermissionDenied: React.FC<Props> = ({ camera, location }) => {
  return (
    <View style={styles.container}>
      {camera ? <Text style={styles.text}>No access to camera</Text> : null}
      {location ? <Text style={styles.text}>No access to location</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: BLOOM_GREEN,
  },
});

export default PermissionDenied;
