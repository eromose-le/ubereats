import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  Appearance
} from 'react-native';
import HeaderTabs from '../components/home/HeaderTabs';
import SearchBar from '../components/home/SearchBar';
import Categories from '../components/home/Categories';
import RestaurantItems, {
  localRestaurants
} from '../components/home/RestaurantItems';
// import { Divider } from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';

import FocusedStatusBar from '../components/FocusedStatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDarkMode } from 'react-native-dynamic';

// CLIENT ID - 'akyFkugBlWDE6U09V3Sr3w'

const YELP_API_KEY =
  'DZ8uQ0w1MjWZcINiq9dGUVH_Jv_1DCOn9FI9NF2_qMSznvq2PLeZhhkSiSfo_bRuzByyYM4wb1NgIiD3Do6kgvtqA-rm0bqjdRV5HTg0NR2bOvKCyyqjN2lF-sZVYnYx';

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants || []);
  const [city, setCity] = useState('San Francisco');
  const [activeTab, setActiveTab] = useState('Delivery');

  const getRestaurantsFromYelp = async () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    };

    try {
      const res = await fetch(yelpUrl, apiOptions);
      const json = await res.json();
      return setRestaurantData(
        json.businesses.filter((business) =>
          business.transactions.includes(activeTab.toLowerCase())
        )
      );
    } catch (e) {
      alert(`${city} city not found`);
    }
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  // console.log(window.matchMedia('(prefers-color-scheme: dark').matches);
  // @media (prefers-color-scheme: dark) {
  //   color: white;
  // }

  // PLATFORM DISPLAY MODES
  const iosMode = Appearance.getColorScheme(); // light
  const drkMode = useDarkMode(); // true || false
  const PlatformOS = Platform.OS;

  const SmartBarHeightSize = () => {
    if (PlatformOS === 'ios')
      return getStatusBarHeight() === 44
        ? getStatusBarHeight() - 40
        : getStatusBarHeight() - 15;

    if (PlatformOS === 'android') return getStatusBarHeight(true);
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#eee', flex: 1 }}>
      <FocusedStatusBar barStyle="dark-content" />
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          marginTop: SmartBarHeightSize()
        }}
      >
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      {/* <Divider width={1} /> */}
      <BottomTabs />
    </SafeAreaView>
  );
}
