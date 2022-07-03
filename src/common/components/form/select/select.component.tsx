import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import './select.component.styles.scss';

interface Props {
  label: string;
  onChange: (value: string) => void;
  options: string[];
}

export const SelectComponent: React.FC<Props> = (props) => {
  const { label, onChange, options } = props;
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClearClick = (): void => {
    setSelectedValue('');
    onChange('');
  };

  const handleChange = (event: SelectChangeEvent<string>): void => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
      className="SelectComponent"
    >
      <InputLabel id="select-standard-label">{label}</InputLabel>
      <Select
        className="select-input"
        labelId="select-standard-label"
        id="select-standard"
        value={selectedValue}
        onChange={handleChange}
        label={label}
        endAdornment={
          <IconButton
            sx={{ display: selectedValue ? '' : 'none' }}
            onClick={handleClearClick}
            className="clear-button"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <MenuItem data-testid="select-option" value="">
          <em>None</em>
        </MenuItem>
        {options.length > 0 &&
          options.map((option, index) => (
            <MenuItem
              data-testid="select-option"
              value={option}
              key={`${index}${option}`.trim()}
            >
              {option}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
