import { useMutation } from '@tanstack/react-query';
import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { testWater } from '../../helpers';
import NoCameraAccess from '../NoCameraAccess/NoCameraAccess';
import Spinner from '../Spinner/Spinner';
import TestResult from './TestResult/TestResult';

const SnapChip: React.FC = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async () => {
      const waterPromise = testWater();
      const result = await waterPromise;
      return result;
    },
  });

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPicture(data.uri);
      setIsTesting(true);
      mutate();
    }
  };

  const endTest = () => {
    setIsTesting(false);
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
            {isTesting ? (
              <>
                {isLoading ? <Spinner /> : null}
                {data ? <TestResult result={data} endTest={endTest} /> : null}
              </>
            ) : null}
          </View>
          <View style={styles.shutterContainer}>
            <TouchableOpacity
              onPress={takePicture}
              disabled={isTesting}
              style={styles.shutter}
            />
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
