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
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
  openHistory: () => void;
}
const SnapChip: React.FC<Props> = ({ openHistory }) => {
  const isFocused = useIsFocused();
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [image, setImage] = useState();
  const [isTesting, setIsTesting] = useState(false);
  const { locationAvailable, location } = useLocation();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<Camera>(null);
  const { token } = useAuth();

  const { privateAxios } = useAxios();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (data: {
      imageUri: string;
      longitude: number | undefined;
      latitude: number | undefined;
    }) => {
      let localUri = data.imageUri;
      // let localUri = photo?.uri;
      let filename = localUri.split("/").pop() || "";

      //  Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("image", { uri: localUri });

      formData.append("longitude", data.longitude?.toString() || "");
      formData.append("latitude", data.latitude?.toString() || "");
      console.log("====================================");
      console.log(formData);
      console.log("====================================");
      // let longitude = data.longitude;
      // let latitude = data.latitude;

      //   const response = await axios.post(
      //     "https://bloomapp.herokuapp.com/test",
      //     { latitude: latitude, longitude: longitude },
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         Authorization: `Bearer ${token}`,
      //       },
      //       maxBodyLength: Infinity,
      //     }
      //   );
      //   console.log("====================================");
      //   console.log(response.status);
      //   console.log("====================================");
      //   return response.data;
      // },
      // onError: () => {
      //   setIsTesting(false);
      // },
      // onSuccess: (data) => {
      //   if (data.result === undefined) {
      //     setIsTesting(false);
      //   }
      // },

      // const response = await axios.post(
      //   "https://bloomapp.herokuapp.com/test",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     maxBodyLength: Infinity,
      //   }
      // );

      const response = await fetch("https://bloomapp.herokuapp.com/test", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the response data
          console.log(responseData, "kk");
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
  });

  const saveImageToGallery = async (imageUri: string) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      const album = await MediaLibrary.getAlbumAsync("Camera");

      if (album) {
        // await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync("Camera", asset, false);
      }

      console.log("Image saved to gallery!");
    } catch (error) {
      console.error("Error saving image to gallery:", error);
    }
  };

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
      saveImageToGallery(picture.uri);

      setIsTesting(true);

      setLongitude(location?.coords.longitude);
      setLatitude(location?.coords.latitude);
      setPhoto(picture.uri);

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

  if (!permissionResponse) {
    requestPermission();
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
