import React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import { IconButton } from '@mui/material';

import './grid-switch.component.scss';

export enum GRID_TYPES {
  grid = 'grid-view',
  list = 'list-view',
}

export type GridType = GRID_TYPES.grid | GRID_TYPES.list;

interface Props {
  onChange: (gridType: GRID_TYPES) => void;
}

export const GridSwitchComponent: React.FC<Props> = (props) => {
  const { onChange } = props;

  const handleGridType = (type: GRID_TYPES): void => {
    onChange(type);
  };
  return (
    <div className="GridSwitchComponent">
      <IconButton
        onClick={() => {
          handleGridType(GRID_TYPES.list);
        }}
        aria-label="Change view to List"
      >
        <ReorderIcon className="switch-icon" />
      </IconButton>
      <IconButton
        onClick={() => {
          handleGridType(GRID_TYPES.grid);
        }}
        aria-label="Change view to Grid"
      >
        <GridViewIcon className="switch-icon" />
      </IconButton>
    </div>
  );
};
