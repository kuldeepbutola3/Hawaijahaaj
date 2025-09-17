import React, { useCallback } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OnBoardingNavigationProp } from '../OnBoardingNav';
import { appColors } from '../../../styles/appColors';
import { Button } from '../../../components/Button';
import { AppLogo } from '../../component/AppLogo';

export const OnBoardingContainer: React.FC<{
  source: ImageSourcePropType;
  title: String;
  subtitle: String;
  slideValue: number;
  nextTapped: () => void;
}> = ({ source, title, subtitle, slideValue, nextTapped }) => {
  const navigation = useNavigation<OnBoardingNavigationProp>();

  const skipTapped = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.logoContainer}>
              <AppLogo size={70} />
              <Button
                title="Skip"
                buttonStyle={{ backgroundColor: appColors.transparent }}
                onPress={skipTapped}
              />
            </View>
            <View style={styles.containerImage}>
              <Image source={source} />
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.middleContaineTitle}>{title}</Text>
            <Text style={styles.middleContaineSubTitle}>{subtitle}</Text>
            <Bar slide={slideValue} />
          </View>
          <Button
            // eslint-disable-next-line react-native/no-inline-styles
            buttonStyle={{
              marginHorizontal: 52,
            }}
            onPress={nextTapped}
            title="Next"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Bar: React.FC<{ slide: number }> = ({ slide }) => {
  const alignItems =
    slide === 1 ? 'flex-start' : slide === 2 ? 'center' : 'flex-end';
  return (
    <View
      style={{
        ...styles.barContainer,
        alignItems,
      }}>
      <View style={styles.barInnerContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: appColors.defaultColor },
  container: {
    paddingTop: 16,
    paddingBottom: 10,
    marginHorizontal: 24,
  },
  topContainer: {},
  logoContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  containerImage: {
    paddingTop: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 50, height: 63.4 },
  middleContainer: {
    marginTop: -90,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginBottom: -20,
    alignItems: 'center',
    padding: 26,
  },
  middleContaineTitle: {
    color: appColors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  middleContaineSubTitle: {
    color: appColors.white,
    fontSize: 16,
    textAlign: 'center',
    margin: 26,
  },
  buttonNext: { marginHorizontal: 34 },
  barContainer: {
    width: 210,
    height: 4,
    backgroundColor: appColors.white,
    borderRadius: 2,
    marginBottom: 20,
  },
  barInnerContainer: {
    width: 210 / 3,
    height: 4,
    backgroundColor: appColors.red,
    borderRadius: 2,
  },
});
