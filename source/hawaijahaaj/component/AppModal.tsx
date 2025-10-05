import { FC } from 'react';
import { Modal, ModalProps, StyleSheet, View } from 'react-native';

export interface AppModelProps extends ModalProps {}

export const AppModel: FC<AppModelProps> = props => {
  return (
    <Modal animationType="slide" transparent={true} {...props}>
      <View style={styles.container}>{props.children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
