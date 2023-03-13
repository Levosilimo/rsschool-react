import './header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

export class Header extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  render() {
    return (
      <header className="header">
        <h2 className="header-title">React Components</h2>
        <ul className="header-menu">
          <li>
            <Link to={AppRoute.Main}>Main</Link>
          </li>
          <li>
            <Link to={AppRoute.AboutUs}>About Us</Link>
          </li>
        </ul>
      </header>
    );
  }
}
