import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

interface Props {
  'data-testid'?: string;
  open: boolean;
  type: AlertType;
  content: string;
  onClose: () => void;
}

export const NotificationComponent: React.FC<Props> = (props) => {
  const { open, type, content, onClose, 'data-testid': dataTestId } = props;

  return (
    <Snackbar
      data-testid={dataTestId}
      className="NotificationComponent"
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        className={`${type}-alert`}
        severity={type}
        sx={{ width: '100%' }}
        onClose={onClose}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};
