import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import SnapChip from '../components/SnapChip/SnapChip';
import { RootStackParamList } from '../types';
import ProtectedScreen from './ProtectedScreen';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'SnapChip'>;

const SnapChipScreen: React.FC<Props> = ({ navigation }) => {
 
  return (
    <Screen>
      <ProtectedScreen>
        <SnapChip  navigation={ navigation} />
      </ProtectedScreen>
    </Screen>
  );
};

export default SnapChipScreen;
