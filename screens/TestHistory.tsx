import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';
import HeaderText from '../components/Text/HeaderText';
import { useAxios } from '../contexts/AxiosContext';
import { RootStackParamList, TestResult } from '../types';
import ProtectedScreen from './ProtectedScreen';
import Screen from './Screen';

const baseURL = process.env.BASE_URL ?? 'https://bloom-safe-af07b9d4838b.herokuapp.com/storage/images';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

const profileIcon = require('../assets/images/profile.png');

const TestHistory: React.FC<Props> = ({ navigation }) => {
  const { privateAxios } = useAxios();

  const { isLoading, data } = useQuery(['tests'], async () => {
    const { data } = await privateAxios.get('/tests');
    return data as TestResult[];
  });

  return (
    <Screen>
      <ProtectedScreen>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal:20,
              paddingTop:5
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
            {isLoading && <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
              <Spinner />
            </View>
              }

            {data && data?.length < 1 ? (
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                No Tests
              </Text>
            ) : null}

            {data && data?.length > 0 ? (
              <FlatList
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      width: '48%',
                    }}
                    onPress={() =>
                      navigation.navigate('ResultDetails', { result: item })
                    }
                  >
                    <Image
                      source={{ uri: `${baseURL}/${item.image}` }}
                      style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        borderRadius: 10,
                      }}
                      alt='Test result image'
                    />
                  </TouchableOpacity>
                )}
              />
            ) : null}
          </View>

     
        </View>
      </ProtectedScreen>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
   
  },
});

export default TestHistory;
