import { ClassType } from '../../constants/enums';

export function getFlightClassTypeValue(classType: ClassType): string {
  if (classType === 'Business') {
    return '1';
  } else if (classType === 'Economy') {
    return '2';
  } else if (classType === 'Premium') {
    return '2';
  }
  return '0';
}
