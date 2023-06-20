import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AlertText from '../components/Text/AlertText';
import useAddressFromLocation from '../hooks/useAddressFromLocation';
import useResultTextDisplay from '../hooks/useResultTextDisplay';
import { RootStackParamList } from '../types';
import Screen from './Screen';

type Props = NativeStackScreenProps<RootStackParamList, 'ResultDetails'>;
const baseURL = process.env.BASE_URL ?? 'https://bloom-safe-af07b9d4838b.herokuapp.com/storage/images';

const ResultDetails: React.FC<Props> = ({ route, navigation }) => {
  const { result }:any = route.params;
  // const { resultTextDisplay } = useResultTextDisplay(result.comment);
  // const { address } = useAddressFromLocation(result.latitude, result.longitude);
  const addrs =JSON.parse(result?.address)
// console.log(JSON.parse(result?.address), "result")
  return (
    <Screen back={() => navigation.navigate('HomeScreen')}>
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
          <Text style={styles.detailText}>{result?.updated_at}</Text>
        </View>
        <View style={styles.details}>
          <Text>Country:</Text>
          <Text style={styles.detailText}>{addrs?.country}</Text>
        </View>
        <View style={styles.details}>
          <Text>Region:</Text>
          <Text style={styles.detailText}>{addrs?.region}</Text>

        </View>
        <View style={styles.details}>
          <Text>City:</Text>
          <Text style={styles.detailText}>{addrs?.city}</Text>

        </View>
        <View style={styles.details}>
          <Text>Street:</Text>
          <Text style={styles.detailText}>{addrs?.street}</Text>

        </View>
        <View style={styles.details}>
          <Text>Postal Code:</Text>
          <Text style={styles.detailText}>{addrs?.postalCode}</Text>

        </View>
        <View style={styles.details}>
          <Text>Result:</Text>
          <Text style={styles.detailText}>{result?.result}</Text>
        </View>
        <View style={styles.details}>
          <Text>Score:</Text>
          <Text style={styles.detailText}>{result?.score}</Text>
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
    height: '30%',
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
