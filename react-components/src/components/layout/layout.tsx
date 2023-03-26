import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

class Layout extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  render() {
    return (
      <div className="layout">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
}

export default Layout;
