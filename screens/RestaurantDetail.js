import { View, Text } from 'react-native';
import React from 'react';
import Divider from '../components/Divider';
import { About } from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';

const RestaurantDetail = () => {
  return (
    <View>
      <About />
      <Divider height={1.8} marginVertical={20} backgroundColor="#eee" />
      <MenuItems />
    </View>
  );
};

export default RestaurantDetail;
