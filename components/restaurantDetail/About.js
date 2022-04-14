import { View, Text, Image } from 'react-native';
import React from 'react';

const yelpRestaurantInfo = {
  name: 'Mama put Afam Kitchen',
  image:
    'https://media.istockphoto.com/photos/colorful-background-of-pastel-powder-explosionrainbow-color-dust-on-picture-id1180542165?k=20&m=1180542165&s=612x612&w=0&h=43hlhk8qdGYP4V-u3AAxD3kPDRIzHjMNWpr-VdBQ2Js=',
  price: '$$',
  reviews: '1500',
  rating: 4.5,
  categories: [
    {
      title: 'Thai'
    },
    {
      title: 'Comfort Food'
    },
    {
      title: 'Bee Honey'
    }
  ]
};

const { name, image, price, reviews, rating, categories } = yelpRestaurantInfo;

const formattedCategories = categories.map((cat) => cat.title).join(' . ');

const description = `${formattedCategories} ${
  price ? ' .' + price : ''
} . ⭐ . ${rating} ⭐ (${reviews}+)`;

export const About = (props) => {
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
};

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: '100%', height: 180 }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: '600',
      marginTop: 10,
      marginHorizontal: 15
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: '400',
      fontSize: 15.5
    }}
  >
    {props.description}
  </Text>
);
