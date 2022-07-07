import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

import './text-field.component.scss';

interface Props {
  'data-testid'?: string;
  label: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TextFieldComponent: React.FC<Props> = (props) => {
  const { label, onChange, 'data-testid': dataTestId, className } = props;
  const [textValue, setTextValue] = React.useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const textValue = event.target.value;
    setTextValue(textValue);
    onChange(textValue);
  };

  return (
    <TextField
      className={`TextFieldComponent ${className || ''}`.trim()}
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
