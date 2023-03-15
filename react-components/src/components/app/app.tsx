import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import Layout from '../layout/layout';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { LocationContext, LocationContextValue } from '../../contexts/location-context';
import { AppRoute } from '../../constants';
import AboutUsPage from '../../pages/about-us-page/about-us-page';

class App extends React.Component<Readonly<Record<string, never>>, LocationContextValue> {
  constructor(props: Readonly<Record<string, never>>) {
    super(props);
    this.state = {
      route: 'Main',
      setRoot: this.toggleTheme,
    };
  }

  toggleTheme = (route: keyof typeof AppRoute): void => {
    this.setState(() => ({
      route: route,
    }));
  };

  render() {
    return (
      <LocationContext.Provider value={this.state}>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute['About Us']} element={<AboutUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </LocationContext.Provider>
    );
  }
}

export default App;
