import { View, Text } from 'react-native';
import React from 'react';
import Divider from '../components/Divider';
import { About } from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';

const RestaurantDetail = ({ route }) => {
  return (
    <View>
      <About route={route} />
      <Divider height={1.8} marginVertical={20} backgroundColor="#aaa" />
      <MenuItems />
    </View>
  );
};

export default RestaurantDetail;
