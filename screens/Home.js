import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import HeaderTabs from '../components/home/HeaderTabs';
import SearchBar from '../components/home/SearchBar';
import Categories from '../components/home/Categories';
import RestaurantItems, {
  localRestaurants
} from '../components/home/RestaurantItems';

// CLIENT ID - 'akyFkugBlWDE6U09V3Sr3w'

const YELP_API_KEY =
  'DZ8uQ0w1MjWZcINiq9dGUVH_Jv_1DCOn9FI9NF2_qMSznvq2PLeZhhkSiSfo_bRuzByyYM4wb1NgIiD3Do6kgvtqA-rm0bqjdRV5HTg0NR2bOvKCyyqjN2lF-sZVYnYx';

export default function Home() {
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

  return (
    <SafeAreaView style={{ backgroundColor: '#eee', flex: 1 }}>
      <View style={{ backgroundColor: 'white', padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
    </SafeAreaView>
  );
}
