import React from 'react';
import {FieldError} from 'react-hook-form';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ErrorMessage} from '../theme/infoMessages';

interface CustomInputProps {
  value: string;
  onChange: (text: string) => void;
  error: FieldError | undefined;
  label: string;
  secureTextEntry?: boolean;
  onBlur:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
}

export const CustomInput = ({
  value,
  onChange,
  onBlur,
  error,
  label,
  secureTextEntry = false,
}: CustomInputProps) => {
  return (
    <View style={styles.conatiner}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        mode="outlined"
        secureTextEntry={secureTextEntry}
      />
      {error && <ErrorMessage message={error.message} />}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginBottom: 20,
  },
});
