import './header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { LocationContext, LocationContextValue } from '../../contexts/location-context';

class Header extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  render() {
    return (
      <header className="header">
        <h2 className="header-title">React Components</h2>
        <span>{`${(this.context as LocationContextValue).route} page`}</span>
        <ul className="header-menu">
          {Object.entries(AppRoute).map((route) => {
            const isRouteInUse = (this.context as LocationContextValue).route === route[0];
            if (route[0] === 'Not Found' && !isRouteInUse) return;
            return (
              <li key={route[1]} className={`${isRouteInUse ? 'on' : ''}`}>
                <Link to={route[1]}>{route[0]}</Link>
              </li>
            );
          })}
        </ul>
      </header>
    );
  }
}
Header.contextType = LocationContext;
export { Header };
