import { generatePath } from 'react-router-dom';

interface SwitchRoutes {
  root: string;
  details: string;
}

interface Routes extends Omit<SwitchRoutes, 'details'> {
  details: (name: string) => string;
}

export const switchRoutes: SwitchRoutes = {
  root: '/',
  details: '/detail/:name',
};

export const routes: Routes = {
  ...switchRoutes,
  details: (name) => generatePath(switchRoutes.details, { name }),
};
