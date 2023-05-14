import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderText from '../components/Text/HeaderText';

interface Props {
  children: React.ReactNode;
  back?: () => void;
  title?: string;
}

const arrowLeftIcon = require('../assets/images/arrowLeft.png');

const Screen: React.FC<Props> = ({ children, back, title }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
    >
      {back || title ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            marginTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          {back ? (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 4,
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
          {title ? (
            <View style={{ paddingLeft: 60 }}>
              <HeaderText text={title} />
            </View>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
};

export default Screen;
