import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface Props {
  'data-testid'?: string;
  label: string;
  onChange: (value: string) => void;
}

export const TextFieldComponent: React.FC<Props> = (props) => {
  const { label, onChange, 'data-testid': dataTestId } = props;
  const [textValue, setTextValue] = React.useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const textValue = event.target.value;
    setTextValue(textValue);
    onChange(textValue);
  };

  return (
    <TextField
      data-testid={dataTestId}
      id="standard-textfield"
      label={label || ''}
      variant="standard"
      value={textValue}
      onChange={handleChange}
      sx={{ m: 1, minWidth: 120 }}
    />
  );
};
