import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import SnapChip from '../components/SnapChip/SnapChip';
import { RootStackParamList } from '../types';
import ProtectedScreen from './ProtectedScreen';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'SnapChip'>;

const SnapChipScreen: React.FC<Props> = ({ navigation }) => {
  const openHistory = () => {
    navigation.navigate('History');
  };
  return (
    <Screen>
      <ProtectedScreen>
        <SnapChip openHistory={openHistory} />
      </ProtectedScreen>
    </Screen>
  );
};

export default SnapChipScreen;
