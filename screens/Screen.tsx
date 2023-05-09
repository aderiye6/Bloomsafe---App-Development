import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  back?: () => void;
}

const arrowLeftIcon = require('../assets/images/arrowLeft.png');

const Screen: React.FC<Props> = ({ children, back }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
    >
      {back ? (
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 4,
            marginLeft: 20,
          }}
          onPress={back}
        >
          <Image
            source={arrowLeftIcon}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      ) : null}
      {children}
    </View>
  );
};

export default Screen;
