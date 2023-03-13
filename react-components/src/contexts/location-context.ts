import React from 'react';
import { AppRoute } from '../constants';

export type LocationContextValue = {
  route: keyof typeof AppRoute;
  setRoot: (route: keyof typeof AppRoute) => void;
};

export const LocationContext = React.createContext<LocationContextValue>({
  route: 'Main',
  setRoot: () => {},
});
