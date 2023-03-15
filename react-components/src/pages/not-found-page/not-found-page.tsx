import './not-found-page.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { AppRoute } from '../../constants';
import { LocationContext, LocationContextValue } from '../../contexts/location-context';

class NotFoundPage extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  componentDidMount() {
    (this.context as LocationContextValue).setRoot('Not Found');
  }

  render() {
    return (
      <div className="page page-not-found">
        <h1>{(this.context as LocationContextValue).route}</h1>
        <h2>404</h2>
        <p>Page not found</p>
        <Link className="link" to={AppRoute.Main}>
          Back to home page
        </Link>
      </div>
    );
  }
}
NotFoundPage.contextType = LocationContext;
export default NotFoundPage;
