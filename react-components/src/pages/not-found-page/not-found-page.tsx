import './not-found-page.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { AppRoute } from '../../constants';

class NotFoundPage extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  render() {
    return (
      <div className="page page-not-found">
        <h2>404</h2>
        <p>Page not found</p>
        <Link className="link" to={AppRoute.Main}>
          Back to home page
        </Link>
      </div>
    );
  }
}

export default NotFoundPage;
