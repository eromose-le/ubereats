import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import firebase from '../firebase';
import MenuItems from '../components/restaurantDetail/MenuItems';

export default function OrderCompleted({ navigation }) {
  const dispatch = useDispatch();
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: 'Bologna',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image:
          'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg'
      }
    ]
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* green checkmark */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View
          style={{
            margin: 15,
            alignItems: 'center',
            height: '100%'
          }}
        >
          <LottieView
            style={{ height: 100, alignSelf: 'center', marginBottom: 30 }}
            source={require('../assets/animations/check-mark.json')}
            autoPlay
            speed={0.5}
            loop={false}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Your order at {restaurantName} has been placed for {totalUSD}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <MenuItems
              foods={lastOrder.items}
              hideCheckbox={true}
              marginLeft={10}
            />
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                borderWidth: 1,
                width: 120,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 8,
                paddingVertical: 8
              }}
            >
              Continue shopping
            </Text>
            <LottieView
              style={{ height: 200, alignSelf: 'center' }}
              source={require('../assets/animations/cooking.json')}
              autoPlay
              speed={0.5}
            />
          </ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
