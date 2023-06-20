import { useMutation } from '@tanstack/react-query';
import { Camera, CameraType } from 'expo-camera';

import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAxios } from '../../contexts/AxiosContext';
import useLocation from '../../hooks/useLocation';
import PermissionDenied from '../PermissionDenied/PermissionDenied';
import Spinner from '../Spinner/Spinner';
import TestResult from './TestResult/TestResult';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { useUploadDocumentMutation } from '../../contexts/api';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';

interface Props {
  navigation:any;
}

const SnapChip: React.FC<Props> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [cameraReady, setCameraReady] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [data, setdata] = useState<any>(null)

  /**
 * Retrieves the current location and location availability using the useLocation hook.
 * The `locationAvailable` variable represents the availability status of the location.
 * The `location` variable contains the current location information, if available.
 */
  const { locationAvailable, location, address } = useLocation();
  const [ uploadDocument , {isLoading}]=useUploadDocumentMutation()





  /**
 * Initializes camera permission state and permission request function using the Camera module.
 * The `cameraPermission` variable represents the current camera permission status.
 * The `requestCameraPermission` function can be called to request camera permissions.
 */
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

    /**
 * Initializes permission response state and permission request function using the MediaLibrary module.
 * The `permissionResponse` variable represents the current permission status for accessing media library.
 * The `requestPermission` function can be called to request permission for accessing the media library.
 */
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();


    /**
 * A ref to the Camera component.
 * It is initialized as null and can be used to access and manipulate the camera component.
 */
  const cameraRef = useRef<Camera>(null);


  /**
 * Handles the test process for an image by performing the following actions:
 * 1. Retrieves information about the image file using the provided image URI.
 * 2. If the file does not exist, logs an error message and returns.
 * 3. Manipulates the image by resizing it to a width of 800 pixels and applying compression.
 * 4. Extracts the file extension from the manipulated image's URI.
 * 5. Creates a FormData object and appends the compressed image, longitude, and latitude to it.
 * 6. Calls the 'uploadDocument' function with the FormData and unwraps the result.
 * 7. Updates the 'data' state with the result.
 * 8. Sets 'isTesting' state to true.
 * 9. If the result does not have a 'comment' property, shows an info toast with the result message.
 * 10. If an error occurs during the process, shows an error toast with the error message.
 *
 * @param {any} data - The data object containing the image URI, longitude, and latitude.
 */
  const testHandle = async (data: any) => {
    try {
      const fileInfo: any = await FileSystem.getInfoAsync(data?.imageUri);
      // console.log(fileInfo, "fileinfo");
      if (!fileInfo.exists) {
        console.log('Image file does not exist');
        return;
      }
  
      const compressedImage = await ImageManipulator.manipulateAsync(
        fileInfo.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.5 } // Set the desired compression quality (0.5 represents 50% compression)
      );
  
      const imageUriParts = compressedImage.uri.split('.');
      const fileExtension = imageUriParts[imageUriParts.length - 1];
  
      const formData = new FormData();
      formData.append('image', {
        uri: compressedImage.uri,
        name: `image.${fileExtension}`,
        type: `image/${fileExtension}`,
      });
  
      formData.append('country', address?.country);
      formData.append('city',  address?.city);
      formData.append('region', address?.region);
      formData.append('postalCode', address?.postalCode);
      formData.append('street', address?.city);



  
      const res = await uploadDocument(formData).unwrap();
      // console.log(res, 'ressss');
      // setdata(res)
      // setIsTesting(true)
      if(res){
       if(res?.message){
        Toast.show({
          type: 'info',
          text1: '',
          text2: res?.message
        });
       }
       else{
      // console.log(JSON.stringify(res), 'ressss');
      navigation.navigate('ResultDetails', { result: res?.data })
       }
      }
     
    } catch (error:any) {
      console.log(error, 'error uuuuuu');
      Toast.show({
        type: 'error',
        text1: '',
        text2: error?.data ??''
      });
    }
  }


  /**
 * Takes a picture using the camera reference and performs the following actions:
 * 1. Retrieves the picture with a specified quality setting.
 * 2. Extracts the URI from the picture.
 * 3. If the URI is available, creates a data object with the image URI, longitude, and latitude.
 * 4. Calls the `testHandle` function with the data object as an argument.
 * 5. Checks the permission status and saves the picture to the gallery if permission is granted.
 *    Otherwise, requests permission to save the picture.
 */
  const takePicture = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
   const {uri}  =picture
   if(uri){

    if (permissionResponse?.status === 'granted') {
      savePictureToGallery(uri);
    
      } else {
        requestPermission();
      }
    const data =  {
      imageUri: uri,
     
    }
    testHandle(
  data)



   }
    
   
     
    }
  };


  /**
 * Ends the current test by setting the 'isTesting' state to false
 * and calling the 'openHistory' function to navigate to the test history.
 */
  const endTest = () => {
    setIsTesting(false);
    openHistory();
  };

/**
 * Saves a picture to the device's gallery by performing the following actions:
 * 1. Creates a temporary file URI in the cache directory.
 * 2. Copies the picture from the specified URI to the temporary file URI.
 * 3. Creates an asset using the temporary file URI.
 * 4. Saves the asset to the device's media library.
 * 5. (Optional) Logs a success message if the image is saved to the gallery.
 * 6. (Optional) Logs an error message if there is an error saving the image.
 *
 * @param {string} pictureUri - The URI of the picture to be saved to the gallery.
 */

  const savePictureToGallery = async (pictureUri:string) => {
    try {
      const temporaryFileUri = FileSystem.cacheDirectory + 'temp.jpg';

      await FileSystem.copyAsync({
        from: pictureUri,
        to: temporaryFileUri,
      });

      const asset:any = await MediaLibrary.createAssetAsync(temporaryFileUri);
      await MediaLibrary.saveToLibraryAsync(asset);

      // console.log('Image saved to gallery!');
    } catch (error) {
      // console.log('Error saving image:', error);
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
              {isLoading ? <Spinner /> : null}
              </View>
              <View style={styles.shutterContainer}>
                <TouchableOpacity
                  onPress={takePicture}
                  // disabled={isTesting}
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
    justifyContent:'center',
    alignItems:'center'
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
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
  },
});

export default SnapChip;
