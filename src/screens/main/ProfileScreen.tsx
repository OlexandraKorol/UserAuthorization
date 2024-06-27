import {StyleSheet, View} from 'react-native';
import React from 'react';
import {UserInfoCard} from '../../components/UserInfoCard';
import {Error} from '../../theme/infoMessages';
import {colors} from '../../theme/constants';
import {CustomButton} from '../../components/CustomButton';
import {observer} from 'mobx-react-lite';
import authStore from '../../stores/authStore';
import {useNavigation} from '@react-navigation/native';
import {TabStackParamList} from '../../components/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUserProfileImageFetch} from '../../hooks/useUserProfileImageFetch';

export const ProfileScreen = observer(() => {
  const {response, isError} = useUserProfileImageFetch('2');
  const navigation = useNavigation<StackNavigationProp<TabStackParamList>>();

  const handleLogout = () => {
    authStore.logout();
    navigation.navigate('LogIn');
    console.log('logOut:', authStore);
  };

  if (!response || isError) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <UserInfoCard
        imageUrl={response.data.avatar}
        email={authStore.email}
        username={response.data?.first_name}
      />

      <CustomButton text={'Log Out'} onSubmit={handleLogout} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
});
