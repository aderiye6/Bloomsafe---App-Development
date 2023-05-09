import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button/Button';
import HeaderText from '../components/Text/HeaderText';
import { RootStackParamList } from '../types';
import ProtectedScreen from './ProtectedScreen';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

const profileIcon = require('../assets/images/profile.png');

const TestHistory: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen>
      <ProtectedScreen>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <HeaderText text='Hello User 👋' />
              <Text>Welcome Back</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={profileIcon}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{ textAlign: 'center', fontSize: 22, fontWeight: '400' }}
            >
              Test History
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>No Tests</Text>
          </View>

          <Button
            text='Take New Test'
            onPress={() => navigation.navigate('SnapChip')}
          />
        </View>
      </ProtectedScreen>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
  },
});

export default TestHistory;
