import './about-us-page.css';
import React from 'react';
import { LocationContext, LocationContextValue } from '../../contexts/location-context';

class AboutUsPage extends React.Component<
  Readonly<Record<string, never>>,
  Readonly<Record<string, never>>
> {
  componentDidMount() {
    (this.context as LocationContextValue).setRoot('About Us');
  }

  render() {
    return (
      <div className="page about-us-page">
        <main>
          <h2>About Us</h2>
          <p>
            Our journey began many years ago, when our founder started selling items on an online
            marketplace. It was a small operation at first, but as time went on, our founder&apos;s
            passion for finding unique and interesting products grew stronger. They spent countless
            hours scouring the internet and attending trade shows, always on the lookout for the
            next great find. Eventually, our founder&apos;s online business grew so much that they
            decided to open their own store. They wanted to create a place where people could find
            everything they needed, from everyday essentials to hard-to-find treasures. And so, our
            online store was born.
          </p>
        </main>
      </div>
    );
  }
}
AboutUsPage.contextType = LocationContext;
export default AboutUsPage;
