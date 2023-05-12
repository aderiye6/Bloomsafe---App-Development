import { useMutation } from '@tanstack/react-query';
import { Camera, CameraType } from 'expo-camera';

import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAxios } from '../../contexts/AxiosContext';
import useLocation from '../../hooks/useLocation';
import PermissionDenied from '../PermissionDenied/PermissionDenied';
import Spinner from '../Spinner/Spinner';
import TestResult from './TestResult/TestResult';

interface Props {
  openHistory: () => void;
}

const SnapChip: React.FC<Props> = ({ openHistory }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { locationAvailable, location } = useLocation();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const { privateAxios } = useAxios();
  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (data: {
      imageUri: string;
      longitude: number | undefined;
      latitude: number | undefined;
    }) => {
      let localUri = data.imageUri;
      let filename = localUri.split('/').pop() || '';

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type });
      formData.append('longitude', data.longitude?.toString() || '');
      formData.append('latitude', data.latitude?.toString() || '');

      const response = await privateAxios.post('/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        maxBodyLength: Infinity,
      });
      console.log('response: ', JSON.parse(JSON.stringify(response.data)));
      return response.data;

      // try {
      //   const response = await axios.post(
      //     '/test',
      //     {
      //       image: data.imageUri,
      //       longitude: data.longitude,
      //       latitude: data.latitude,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer cE02d2R2T1ZEa1F1ajgxd3h6K210MENPTSt0VjNPL1J5NUc4cHN0cGs3OD0=`,
      //       },
      //     }
      //   );

      //   console.log(JSON.parse(JSON.stringify(response)));
      //   console.log(JSON.parse(JSON.stringify(response.data)));

      //   return response.data;
      // } catch (error) {
      //   console.log(JSON.parse(JSON.stringify(error)));
      // }
    },
    onError: (error) => {
      console.log(error);
      setIsTesting(false);
    },
    onSuccess: (data) => {
      if (data.result === undefined) {
        setIsTesting(false);
      }
    },
  });

  console.log(data);

  const endTest = () => {
    setIsTesting(false);
    openHistory();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync({
        quality: 0.1,
      });
      setIsTesting(true);
      mutate({
        imageUri: picture.uri,
        longitude: location?.coords.longitude,
        latitude: location?.coords.latitude,
      });
    }
  };

  if (!cameraPermission) {
    requestCameraPermission();
  }

  if (!cameraPermission?.granted || !locationAvailable) {
    return (
      <PermissionDenied
        camera={!cameraPermission?.granted}
        location={!locationAvailable}
      />
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
          <View style={styles.testArea}>
            {isTesting ? (
              <>
                {isLoading ? <Spinner /> : null}
                {data?.comment !== undefined ? (
                  <TestResult result={data.comment} endTest={endTest} />
                ) : null}
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
