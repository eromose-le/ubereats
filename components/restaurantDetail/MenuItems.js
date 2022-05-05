import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import Divider from '../Divider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600'
  }
});

export default MenuItems = ({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft
}) => {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue
      }
    });
  };

  // GET SELECTED ITEMS ARR FROM CART STORE
  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  // CHECK IF FOOD IS IN CART THEN MARK IT TRUE
  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{
                  borderColor: 'lightgray',
                  borderRadius: 0
                }}
                fillColor="green"
                isChecked={isFoodInCart(food, cartItems)}
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              />
            )}

            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          <Divider height={0.5} backgroundColor="#eee" />
        </View>
      ))}
    </ScrollView>
  );
};

const FoodInfo = ({ marginLeft, ...props }) => (
  <View style={{ width: 200, justifyContent: 'space-evenly' }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft
      }}
    />
  </View>
);
