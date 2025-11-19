import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { appColors } from '../../../styles/appColors';
import { useBindAction } from '../../../redux/hooks';
import { appSlice } from '../../../appSlice';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { StringConstant } from '../constants/stringConstant';
import { Button as _Button, Input } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { imageOnBoard } from '../assets/image';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const inset = useSafeAreaInsets();

  const setIsloggedIn = useBindAction(appSlice.actions.setIsLoggedIn);
  const onPress = () => {
    setIsloggedIn(true);
  };

  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        {...(Platform.OS === 'ios' && { behavior: 'padding' })}>
        <ScrollView style={{}}>
          <View style={styles.topView}>
            <_Button
              onPress={onPressBack}
              title={'Back'}
              containerStyle={{
                position: 'absolute',
                top: 16,
                left: 10,
              }}
              type="clear"
              titleStyle={{ color: appColors.black }}
            />
            <Text style={styles.registerTxt}>{StringConstant.register}</Text>
          </View>
          <View style={[styles.middleView]}>
            <View style={styles.innerMiddelTopCurve} />
            <View style={styles.innerMiddleTop}>
              <Image source={imageOnBoard.register} />
              <Text style={{ color: 'rgb(63,51,84)' }}>
                {StringConstant.fillYourInfo}
              </Text>
            </View>
            {/* input text */}
            <View style={styles.innerMiddleBottom}>
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
              <Input
                label={StringConstant.phoneNumber}
                placeholder={StringConstant.phoneNumberPlaceHolder}
                defaultValue={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>

          {/* Bottom Register button */}
          <View style={styles.registerContainer}>
            <Button title={StringConstant.register} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.white },
  keyboard: { flex: 1, backgroundColor: appColors.transparent },
  topView: {
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  registerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  middleView: {
    backgroundColor: 'rgb(248, 250, 253)',
    paddingBottom: 24 * 3,
  },
  innerMiddelTopCurve: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    backgroundColor: appColors.white,
    height: 24,
  },
  innerMiddleTop: {
    margin: 24,
    padding: 24,
    backgroundColor: appColors.white,
    borderRadius: 24,
    alignItems: 'center',
  },
  innerMiddleBottom: {
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: appColors.white,
    borderRadius: 24,
  },
  registerContainer: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    backgroundColor: appColors.white,
  },
});
