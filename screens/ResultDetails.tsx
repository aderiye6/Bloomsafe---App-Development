import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AlertText from '../components/Text/AlertText';
import useAddressFromLocation from '../hooks/useAddressFromLocation';
import useResultTextDisplay from '../hooks/useResultTextDisplay';
import { RootStackParamList } from '../types';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'ResultDetails'>;
const baseURL = Constants.expoConfig?.extra?.baseURL;

const ResultDetails: React.FC<Props> = ({ route, navigation }) => {
  const { result } = route.params;
  const { resultTextDisplay } = useResultTextDisplay(result.comment);
  const { address } = useAddressFromLocation(result.latitude, result.longitude);

  return (
    <Screen back={() => navigation.goBack()}>
      <View style={styles.container}>
        <Image
          source={{ uri: `${baseURL}/${result.image}` }}
          style={styles.image}
        />
        <View style={{ alignItems: 'center' }}>
          <AlertText text='Test Result' />
        </View>

        <View style={styles.details}>
          <Text>Date:</Text>
          <Text style={styles.detailText}>{result.date}</Text>
        </View>
        <View style={styles.details}>
          <Text>Location:</Text>
          <Text style={styles.detailText}>{address}</Text>
        </View>
        <View style={styles.details}>
          <Text>Result:</Text>
          <Text style={styles.detailText}>{resultTextDisplay}</Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  image: {
    height: '50%',
    borderRadius: 20,
  },
  details: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10,
  },
  detailText: {
    flex: 1,
    textAlign: 'right',
  },
});

export default ResultDetails;
