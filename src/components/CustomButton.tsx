import React from 'react';
import {Button} from 'react-native-paper';

interface CuctomButtonProps {
  text: string;
  onSubmit: () => void;
}

export const CustomButton = ({text, onSubmit}: CuctomButtonProps) => {
  return (
    <Button mode="contained" onPress={onSubmit}>
      {text}
    </Button>
  );
};
