import React from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Button from '../Button/Button';
import OnboardingSection, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from './OnboardingSection';

interface Props {
  exit: () => void;
}

const onboardingSections = [
  {
    header: 'Drink Safe water',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../assets/onboarding/onboarding1.png'),
  },
  {
    header: 'Confirm your water standards',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../assets/onboarding/onboarding2.png'),
  },
  {
    header: 'Test your water',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../assets/onboarding/onboarding3.png'),
  },
];

const Onboarding: React.FC<Props> = ({ exit }) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          layout='tinder'
          layoutCardOffset={9}
          ref={isCarousel}
          data={onboardingSections}
          renderItem={OnboardingSection}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
        />
        <Pagination
          dotsLength={onboardingSections.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
      <Button text='Get Started' onPress={exit} width={250} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    flex: 0.7,
  },
});

export default Onboarding;
