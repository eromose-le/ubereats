import * as React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Appearance,
  ColorSchemeName
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import RestaurantDetail from './screens/RestaurantDetail';

Appearance.addChangeListener(({ colorScheme }) => {
  return console.log('colrShm', colorScheme);
});

export default function App() {
  return (
    <NavigationContainer>
      <RestaurantDetail />
      <View style={{ flex: 1 }}></View>
    </NavigationContainer>
  );
}
