import React, { useCallback } from 'react';
import { OnBoardingContainer } from '../component/OnBoardingContainer';
import { useNavigation } from '@react-navigation/native';
import { OnBoardingNavigationProp } from '../OnBoardingNav';
import { imageOnBoard } from '../assets/image';
import { StringConstant } from '../constants/stringConstant';

export const OnBoarding3 = () => {
  const navigation = useNavigation<OnBoardingNavigationProp>();
  const nextTapped = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <OnBoardingContainer
      nextTapped={nextTapped}
      source={imageOnBoard.onboarding3}
      title={StringConstant.OnBoarding3Title}
      subtitle={StringConstant.OnBoarding3SubTitle}
      slideValue={3}
    />
  );
};
