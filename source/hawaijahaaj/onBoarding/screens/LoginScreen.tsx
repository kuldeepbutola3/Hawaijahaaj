import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { appColors } from '../../../styles/appColors';
import { useBindAction } from '../../../redux/hooks';
import { appSlice } from '../../../appSlice';
import { Button } from '../../../components/Button';
import { AppLogo } from '../../component/AppLogo';
import { Text } from '../../../components/Text';
import { StringConstant } from '../constants/stringConstant';
import { Input } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { OnBoardingNavigationProp } from '../OnBoardingNav';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inset = useSafeAreaInsets();

  const setIsloggedIn = useBindAction(appSlice.actions.setIsLoggedIn);
  const onPress = () => {
    setIsloggedIn(true);
  };
  // const onLoginPress = () => {
  //    setIsloggedIn(true);
  // }

  // const navigation = useNavigation<OnBoardingNavigationProp>();

  const signUpPress = () => {
    // navigation.navigate('Dashboard');
    setIsloggedIn(true);
  };

  return (
    <View style={{ ...styles.container }}>
      <View style={styles.outsideView} />
      <KeyboardAvoidingView
        style={styles.keyboard}
        {...(Platform.OS === 'ios' && { behavior: 'padding' })}>
        <ScrollView style={{}}>
          <View style={[styles.topView, { paddingTop: inset.top }]}>
            {/* logo */}
            <View style={styles.logoContainer}>
              <AppLogo size={148} />
              <View style={styles.skipContainer}>
                <Button
                  title="Skip"
                  buttonStyle={{ backgroundColor: appColors.transparent }}
                  onPress={onPress}
                />
              </View>
            </View>
            <Text style={styles.txtWelcom}>{StringConstant.welcomeBack}</Text>
            <Text style={styles.txtJoin}>{StringConstant.joinAirline}</Text>
          </View>
          {/* Login container */}
          <View style={styles.loginContainer}>
            <Text style={styles.txtLogin}>{StringConstant.login}</Text>
            <Input
              label={StringConstant.email}
              placeholder={StringConstant.enterYourEmail}
              defaultValue={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Input
              label={StringConstant.password}
              placeholder={StringConstant.enterYourPassword}
              defaultValue={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Button onPress={signUpPress} title={StringConstant.signIn} />
            <ForgetPassword />
            <NoAccount />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const ForgetPassword: React.FC<{}> = () => {
  const navigation = useNavigation<OnBoardingNavigationProp>();

  const forgetPasswordPress = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <TouchableOpacity
      onPress={forgetPasswordPress}
      style={styles.forgetPassword}>
      <Text style={{ color: appColors.defaultColor }}>
        {StringConstant.forgetPasswordLink}
      </Text>
    </TouchableOpacity>
  );
};

const NoAccount: React.FC<{}> = () => {
  const navigation = useNavigation<OnBoardingNavigationProp>();

  const signUpPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.noAccountContainer}>
      <Text>{StringConstant.doHaveAnAccount}</Text>
      <TouchableOpacity onPress={signUpPress}>
        <Text style={styles.signUpTxt}>{StringConstant.signUp}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.defaultColor },
  keyboard: { flex: 1, backgroundColor: appColors.transparent },
  topView: {
    backgroundColor: appColors.defaultColor,
    paddingBottom: 24,
    marginBottom: -24,
  },
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 6,
  },
  skipContainer: {
    position: 'absolute',
    right: 6,
    top: 20,
  },
  loginContainer: {
    padding: 24,
    backgroundColor: appColors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  txtWelcom: {
    fontSize: 24,
    marginTop: 24,
    marginLeft: 12,
    color: appColors.white,
    fontWeight: 'bold',
  },
  txtJoin: {
    fontSize: 16,
    marginTop: 12,
    marginLeft: 12,
    marginBottom: 12,
    color: appColors.white,
  },
  txtLogin: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginVertical: 24,
    // marginLeft: 10,
    marginBottom: 24,
    color: appColors.defaultColor,
  },
  forgetPassword: {
    marginVertical: 24,
  },
  noAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpTxt: {
    marginVertical: 20,
    marginLeft: 4,
    color: appColors.defaultColor,
  },
  outsideView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    backgroundColor: appColors.white,
  },
});
