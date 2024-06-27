import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {colors} from '../theme/constants';

interface ImageItemProps {
  source: string;
  author: string;
}
export const ImageItem = ({source, author}: ImageItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: source}} style={styles.image} />
      <Text style={styles.author}>{author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  image: {
    aspectRatio: 6 / 7,
    marginBottom: 5,
    borderRadius: 10,
  },
  author: {
    fontSize: 20,
    color: colors.grey,
  },
});
