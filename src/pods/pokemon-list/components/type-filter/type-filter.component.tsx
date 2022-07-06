import React from 'react';
import { Skeleton } from '@mui/material';
import { ApolloError } from '@apollo/client';
import { SelectComponent } from 'common/components';

import './type-filter.component.styles.scss';

interface Props {
  onFilterByType: (type: string) => void;
  types: string[];
  loading: boolean;
  error: ApolloError;
}

export const TypeFilterComponent: React.FC<Props> = (props) => {
  const { onFilterByType, types, loading, error } = props;

  if (loading)
    return (
      <Skeleton
        data-testid="skeleton"
        className="type-filter-skeleton"
        variant="rectangular"
        width={120}
        height={32}
      />
    );

  if (error) {
    console.warn(`Error! ${error.message}`);
    return (
      <div data-testid="error-message" className="type-filter-error">
        Type filter is not available
      </div>
    );
  }

  return (
    <SelectComponent
      data-testid="select-component"
      onChange={onFilterByType}
      options={types}
      label="Type"
    />
  );
};
