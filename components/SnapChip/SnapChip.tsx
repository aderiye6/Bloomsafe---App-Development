import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import NoCameraAccess from '../NoCameraAccess/NoCameraAccess';
import TestResult from './TestResult/TestResult';

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
    return <NoCameraAccess />;
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
          <View style={styles.testArea}>
            <TestResult result={1} />
          </View>
          <View style={styles.shutterContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.shutter} />
          </View>
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
    justifyContent: 'space-between',
  },
  testArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shutterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  shutter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
  },
});

export default SnapChip;
