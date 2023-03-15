import './loader.css';
import React from 'react';

class Loader extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  render() {
    return <div className="loader"></div>;
  }
}
export { Loader };
