import { NavigationContainer } from '@react-navigation/native';
import { OnBoardingStack } from '../hawaijahaaj/onBoarding/OnBoardingNav';
import { useSliceSelector } from '../redux/hooks';
import { AppNav } from './AppNav';

export default function MainNav() {
  const { isloggedIn } = useSliceSelector('app');
  return (
    <NavigationContainer>
      {isloggedIn ? <AppNav /> : <OnBoardingStack />}
    </NavigationContainer>
  );
}
