import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {CustomInput} from '../../components/CustomInput';
import {colors} from '../../theme/constants';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../components/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {CustomButton} from '../../components/CustomButton';
import {observer} from 'mobx-react-lite';
import authStore from '../../stores/authStore';

export const LogInScreen = observer(() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const onSubmit = ({email, password}: any) => {
    authStore.login(email, password);

    if (errors) {
      authStore.isValidationCorrect = true;
      authStore.isAuthenticated = true;
      navigation.navigate('MainStack');
    }

    console.log('logIn:', authStore);
  };

  useEffect(() => {
    if (authStore.isAuthenticated) {
      navigation.navigate('MainStack');
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Email is not valid',
                },
              }}
              render={({
                field: {value, onChange, onBlur},
                fieldState: {error},
              }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  label="Email"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password length min 8 char',
                },
              }}
              render={({
                field: {value, onChange, onBlur},
                fieldState: {error},
              }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  error={error}
                  onBlur={onBlur}
                  label="Password"
                  secureTextEntry={true}
                />
              )}
            />

            <CustomButton text={'Log In'} onSubmit={handleSubmit(onSubmit)} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
});
