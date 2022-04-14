import { View, Text } from 'react-native';
import React from 'react';

const Divider = ({ ...props }) => {
  return (
    <View
      style={{
        width: '100%',
        height: 2,
        marginVertical: 10,
        backgroundColor: 'grey',
        ...props
      }}
    >
      <Text>Divider</Text>
    </View>
  );
};

export default Divider;
