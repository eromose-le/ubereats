import { View, Text } from 'react-native';
import React from 'react';
import Divider from '../components/Divider';
import { About } from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';

const RestaurantDetail = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <About route={route} />
      <Divider height={1.8} marginVertical={20} backgroundColor="#aaa" />
      <MenuItems />
      <ViewCart />
    </View>
  );
};

export default RestaurantDetail;
