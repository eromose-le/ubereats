import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from './OrderItem';
import firebase from '../../firebase';
import LottieView from 'lottie-react-native';

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  // CONVERT TO NUMBER THEN REPLACE '$' THEN SUM TOTAL PRICES IN CART
  const total = items
    .map((item) => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  // CONVERT PRICING BACK TO USD
  const totalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  });

  console.log(totalUSD);

  // ADD ORDERS TO FIREBASE
  const addOrderToFireBase = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection('orders')
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('OrderCompleted');
        }, 0);
      })
      .then(() => {
        dispatch({
          type: 'CLEAR_CART',
          payload: {
            items: items,
            restaurantName: restaurantName
          }
        });
      });
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)'
    },

    modalCheckoutContainer: {
      backgroundColor: 'white',
      padding: 16,
      height: 500,
      borderWidth: 1
    },

    restaurantName: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 18,
      marginBottom: 10
    },

    subtotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15
    },

    subtotalText: {
      textAlign: 'left',
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 10
    }
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUSD}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative'
                }}
                onPress={() => {
                  addOrderToFireBase();
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>Checkout</Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 20,
                    color: 'white',
                    fontSize: 15,
                    top: 17
                  }}
                >
                  {total ? totalUSD : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestCloase={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 30,
              zIndex: 999
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: 'black',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 15,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative'
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text style={{ color: 'white', fontSize: 20, flex: 1 }}></Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    marginRight: 30,
                    flex: 1
                  }}
                >
                  View Cart
                </Text>
                <Text style={{ color: 'white', fontSize: 20 }}>{totalUSD}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}

      {/* LOADING ANIME */}
      {loading && (
        <View
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            opacity: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require('../../assets/animations/scanner.json')}
            autoPlay
            speed={3}
          />
        </View>
      )}
    </>
  );
}
