import { FC } from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { appColors } from '../../styles/appColors';
import Svg, { Line } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type Func = TouchableOpacityProps['onPress'];

type FlightSearchType = 'From' | 'To';

export interface FlightSearchCardProps {
  onPress: (type: FlightSearchType) => void;
  color?: ColorValue;
  bgColor?: ColorValue;
}

export const FlightSearchCard: FC<FlightSearchCardProps> = ({
  onPress,
  color = appColors.defaultColor,
  bgColor = appColors.defaultColorStrong,
}) => {
  const onPressSwitch = () => {};

  const onPressFrom = () => {
    onPress('From');
  };

  const onPressTo = () => {
    onPress('To');
  };

  return (
    <View style={styles.container}>
      {/* first Box */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressTo}
        style={[styles.block1, { backgroundColor: color }]}>
        <MaterialIcons
          name="flight-takeoff"
          size={24}
          color={appColors.white}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>From</Text>
          <Text style={styles.subTitle}>Origin</Text>
        </View>
      </TouchableOpacity>

      {/* Middle box */}
      <View style={[styles.middleBlock, { backgroundColor: color }]}>
        <View style={[styles.circle1, { backgroundColor: bgColor }]} />
        <View style={styles.innerMiddleBlock}>
          <View style={styles.dottedLine}>
            <Svg height="2" width="100%">
              <Line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke={BORDER_COLOR}
                strokeWidth={BorderWidth}
                strokeDasharray="6,3" // length of dash, gap
              />
            </Svg>
          </View>
          {/* center switch */}
          <Switch onPress={onPressSwitch} />
        </View>
        <View style={[styles.circle2, { backgroundColor: bgColor }]} />
      </View>

      {/* last box */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressFrom}
        style={[styles.block2, { backgroundColor: color }]}>
        <MaterialIcons name="flight-land" size={24} color={appColors.white} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>To</Text>
          <Text style={styles.subTitle}>Destination</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Switch: FC<{ onPress: Func }> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.refreshContainer}>
      <SimpleLineIcons
        name="refresh"
        size={INNER_CONTAINER_HEIGHT / 2}
        color={appColors.white}
      />
    </TouchableOpacity>
  );
};

const BorderWidth = 1;
const BORDER_COLOR = appColors.white;
const RADIUS = 16;
const INNER_CONTAINER_HEIGHT = 30;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.transparent,
  },
  block1: {
    // flex: 1,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderWidth: BorderWidth,
    borderColor: BORDER_COLOR,
    borderBottomWidth: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    flexDirection: 'row',
  },

  block2: {
    // flex: 1,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
    borderWidth: BorderWidth,
    borderColor: BORDER_COLOR,
    borderTopWidth: 0,
    paddingHorizontal: 24,
    paddingTop: 2,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  middleBlock: {
    flexDirection: 'row',
  },
  innerMiddleBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  dottedLine: {
    height: 1,
  },
  circle1: {
    width: INNER_CONTAINER_HEIGHT / 2,
    height: INNER_CONTAINER_HEIGHT,
    borderWidth: BorderWidth,
    borderColor: BORDER_COLOR,
    borderTopRightRadius: INNER_CONTAINER_HEIGHT / 2,
    borderBottomRightRadius: INNER_CONTAINER_HEIGHT / 2,
    borderLeftWidth: 0,
  },
  circle2: {
    width: INNER_CONTAINER_HEIGHT / 2,
    height: INNER_CONTAINER_HEIGHT,
    borderWidth: BorderWidth,
    borderColor: BORDER_COLOR,
    borderTopLeftRadius: INNER_CONTAINER_HEIGHT / 2,
    borderBottomLeftRadius: INNER_CONTAINER_HEIGHT / 2,
    borderRightWidth: 0,
  },
  title: {
    fontSize: 12,
    color: '#C5D0D4',
  },
  subTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.white,
  },
  textContainer: {
    marginLeft: 16,
  },
  refreshContainer: {
    position: 'absolute',
    right: INNER_CONTAINER_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: appColors.white,
    borderWidth: BorderWidth,
    width: INNER_CONTAINER_HEIGHT,
    height: INNER_CONTAINER_HEIGHT,
    borderRadius: INNER_CONTAINER_HEIGHT / 2,
    backgroundColor: appColors.defaultColor,
  },
});
