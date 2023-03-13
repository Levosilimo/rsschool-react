import './main-page.css';
import React from 'react';
import reactLogo from '../../assets/react.svg';
import { LOCALSTORAGE_SEARCH_KEY } from '../../constants';

type mainPageState = {
  searchValue: string;
};

class MainPage extends React.Component<Readonly<Record<string, never>>, mainPageState> {
  state = {
    searchValue: '',
  };

  componentDidMount() {
    const searchValue = localStorage.getItem(LOCALSTORAGE_SEARCH_KEY);
    if (searchValue) {
      this.setState(() => ({ searchValue }));
    }
  }

  componentWillUnmount() {
    if (this.state.searchValue.length) {
      localStorage.setItem(LOCALSTORAGE_SEARCH_KEY, this.state.searchValue);
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(() => ({
      searchValue: e.target.value ?? '',
    }));
  };

  render() {
    return (
      <div className="page main-page">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => this.handleChange(e)}
          value={this.state.searchValue}
        />
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="../../public/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    );
  }
}

export default MainPage;
