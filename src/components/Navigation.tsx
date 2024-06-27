import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogInScreen} from '../screens/auth/LogInScreen';
import {FeedScreen} from '../screens/main/FeedScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProfileScreen} from '../screens/main/ProfileScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {colors} from '../theme/constants';
import authStore from '../stores/authStore';
import {Loading} from '../theme/infoMessages';

export type RootStackParamList = {
  LogIn: undefined;
  MainStack: undefined;
};

export type TabStackParamList = {
  Feed: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await authStore.loadAuthData();
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const MainStack = () => {
    return (
      <SafeAreaView style={styles.topNavigatorWrapper} edges={['top']}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.white,
            tabBarLabelStyle: {fontSize: 15},
            tabBarStyle: {backgroundColor: colors.mainPurple},
          }}>
          <Tab.Screen name="Feed" component={FeedScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  topNavigatorWrapper: {
    flex: 1,
    backgroundColor: colors.mainPurple,
  },
});
