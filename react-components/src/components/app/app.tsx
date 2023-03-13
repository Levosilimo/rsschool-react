import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import Layout from '../layout/layout';
import { AppRoute } from '../../constants';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

class App extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  render() {
    return (
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
