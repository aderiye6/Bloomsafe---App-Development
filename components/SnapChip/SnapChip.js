import { useMutation } from "@tanstack/react-query";
import { Camera, CameraType } from "expo-camera";

import { useIsFocused } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAxios } from "../../contexts/AxiosContext";
import useLocation from "../../hooks/useLocation";
import PermissionDenied from "../PermissionDenied/PermissionDenied";
import Spinner from "../Spinner/Spinner";
import TestResult from "./TestResult/TestResult";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";



const SnapChip = ({ openHistory }) => {

  const isFocused = useIsFocused();
  const [cameraReady, setCameraReady] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { locationAvailable, location } = useLocation();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const cameraRef = useRef;

  const { privateAxios } = useAxios();
  const { mutate, isLoading, data } = useMutation({
    mutationFn: async () => {
      let localUri = data.imageUri;
      let filename = localUri.split("/").pop() || "";

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("image", { uri: localUri, name: filename, type });
      formData.append("longitude", data.longitude?.toString() || "");
      formData.append("latitude", data.latitude?.toString() || "");

      const response = await privateAxios.post("/test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });
      return response.data;
    },
    onError: () => {
      setIsTesting(false);
    },
    onSuccess: (data) => {
      if (data.result === undefined) {
        setIsTesting(false);
      }
    },
  });

  const endTest = () => {
    setIsTesting(false);
    openHistory();
  };

  // Request permissions
  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // Handle permission denial
      return;
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync({
        quality: 0.1,
      });
      requestPermissions();

      // Save image to gallery
      await MediaLibrary.saveToLibraryAsync(picture.uri);
      setIsTesting(true);

      console.log("====================================");
      console.log(picture.uri);
      console.log("====================================");
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
    <View style={{ flex: 1 }}>
      {isFocused ? (
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
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  testArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  shutter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
  },
});

export default SnapChip;
