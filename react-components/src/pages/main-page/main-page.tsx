import './main-page.css';
import * as React from 'react';
import { LOCALSTORAGE_SEARCH_KEY } from '../../constants';
import { LocationContext, LocationContextValue } from '../../contexts/location-context';
import Gallery from '../../components/gallery/gallery';

type mainPageState = {
  searchValue: string;
};

class MainPage extends React.Component<Readonly<Record<string, never>>, mainPageState> {
  state = {
    searchValue: '',
  };

  onUnload = () => {
    localStorage.setItem(LOCALSTORAGE_SEARCH_KEY, this.state.searchValue);
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
    const searchValue = localStorage.getItem(LOCALSTORAGE_SEARCH_KEY);
    if (searchValue) {
      this.setState(() => ({ searchValue }));
    }
    (this.context as LocationContextValue).setRoot('Main');
  }

  componentWillUnmount() {
    this.onUnload();
    window.removeEventListener('beforeunload', this.onUnload);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(() => ({
      searchValue: e.target.value,
    }));
  };

  render() {
    return (
      <div className="page main-page">
        <h1>{(this.context as LocationContextValue).route}</h1>
        <div className="search-wrapper">
          <img src="./loupe.svg" className="loupe" alt="Search" />
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => this.handleChange(e)}
            value={this.state.searchValue}
          />
        </div>
        <Gallery
          search={this.state.searchValue
            .trim()
            .toLowerCase()
            .split(' ')
            .map((word) => word.trim())
            .join(' ')}
        />
      </div>
    );
  }
}
MainPage.contextType = LocationContext;
export default MainPage;
