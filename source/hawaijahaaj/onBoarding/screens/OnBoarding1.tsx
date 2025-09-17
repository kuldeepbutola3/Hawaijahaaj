import React, { useCallback } from 'react';
import { OnBoardingContainer } from '../component/OnBoardingContainer';
import { useNavigation } from '@react-navigation/native';
import { OnBoardingNavigationProp } from '../OnBoardingNav';
import { imageOnBoard } from '../assets/image';
import { StringConstant } from '../constants/stringConstant';

export type OnBoarding1Props = {};

export const OnBoarding1 = () => {
  const navigation = useNavigation<OnBoardingNavigationProp>();
  const nextTapped = useCallback(() => {
    navigation.navigate('OnBoarding2');
  }, [navigation]);

  return (
    <OnBoardingContainer
      nextTapped={nextTapped}
      source={imageOnBoard.onboarding1}
      title={StringConstant.OnBoarding1Title}
      subtitle={StringConstant.OnBoarding1SubTitle}
      slideValue={1}
    />
  );
};
