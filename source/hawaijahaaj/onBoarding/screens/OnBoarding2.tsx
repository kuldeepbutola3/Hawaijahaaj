import React, { useCallback } from 'react';
import { OnBoardingContainer } from '../component/OnBoardingContainer';
import { useNavigation } from '@react-navigation/native';
import { OnBoardingNavigationProp } from '../OnBoardingNav';
import { imageOnBoard } from '../assets/image';
import { StringConstant } from '../constants/stringConstant';

export const OnBoarding2 = () => {
  const navigation = useNavigation<OnBoardingNavigationProp>();
  const nextTapped = useCallback(() => {
    navigation.navigate('OnBoarding3');
  }, [navigation]);

  return (
    <OnBoardingContainer
      nextTapped={nextTapped}
      source={imageOnBoard.onboarding2}
      title={StringConstant.OnBoarding2Title}
      subtitle={StringConstant.OnBoarding2SubTitle}
      slideValue={2}
    />
  );
};
