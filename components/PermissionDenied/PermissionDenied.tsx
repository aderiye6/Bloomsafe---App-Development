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
      <Text style={styles.guideText}>
        On iOS, you can enable camera and location access in Settings {'>'}{' '}
        BloomSafe
      </Text>
      <Text style={styles.guideText}>
        On Android, you can enable camera and location access in Settings {'>'}{' '}
        Apps {'>'} BloomSafe {'>'} Permissions
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: BLOOM_GREEN,
  },
  guideText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
});

export default PermissionDenied;
