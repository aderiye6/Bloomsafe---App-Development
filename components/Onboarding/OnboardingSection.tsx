import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BLOOM_GREEN, BLOOM_WHITE } from '../../constants';

interface Props {
  item: {
    header: string;
    details: string;
    image: ImageSourcePropType;
  };
  index: number;
}

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const OnboardingSection: React.FC<Props> = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.header}>{item.header}</Text>
      <Text style={styles.details}>{item.details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BLOOM_WHITE,
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    color: BLOOM_GREEN,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  details: {
    textAlign: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
});

export default OnboardingSection;
