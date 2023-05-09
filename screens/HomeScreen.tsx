import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../components/Home/Home';
import { RootStackParamList } from '../types';
import ProtectedScreen from './ProtectedScreen';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const openCamera = () => {
    navigation.push('SnapChip');
  };

  return (
    <Screen>
      <ProtectedScreen>
        <Home openCamera={openCamera} />
      </ProtectedScreen>
    </Screen>
  );
};

export default HomeScreen;
