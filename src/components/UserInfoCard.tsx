import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import {colors, fontWeight} from '../theme/constants';

interface UserInfoCardProps {
  imageUrl: string;
  email: string;
  username: string;
}

export const UserInfoCard = ({
  imageUrl,
  email,
  username,
}: UserInfoCardProps) => {
  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.textContainer}>
            <Text style={styles.titleData}>Name:</Text>
            <Text style={styles.UserData}>{username}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleData}>Email:</Text>
            <Text style={styles.UserData}>{email}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 10,
  },
  UserData: {
    color: colors.lightGray,
    fontSize: 15,
    fontWeight: fontWeight.normal,
  },
  titleData: {
    color: colors.grey,
    fontSize: 15,
    paddingRight: 7,
    fontWeight: fontWeight.bolt,
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
});
