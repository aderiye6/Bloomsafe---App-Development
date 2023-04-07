import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BLOOM_GREEN } from '../../constants';

const SnapChip: React.FC = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPicture(data.uri);
      Alert.alert('Picture taken!');
    }
  };

  if (!permission) {
    requestPermission();
  }

  if (!permission?.granted) {
    return (
      <View style={styles.noAccessContainer}>
        <Text style={styles.noAccessText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <Camera
      style={styles.camera}
      type={CameraType.back}
      onCameraReady={() => setCameraReady(true)}
      ref={cameraRef}
    >
      {cameraReady ? (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={takePicture} style={styles.shutter} />
        </View>
      ) : null}
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  shutter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    marginBottom: 30,
  },
  noAccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccessText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: BLOOM_GREEN,
  },
});

export default SnapChip;
