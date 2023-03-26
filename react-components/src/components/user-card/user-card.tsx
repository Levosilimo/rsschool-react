import './user-card.css';
import * as React from 'react';
import { UserData } from '../../types';

type CardProps = {
  user: UserData;
};

class UserCard extends React.Component<CardProps, Readonly<Record<string, never>>> {
  render() {
    return (
      <div
        key={this.props.user.givenName + this.props.user?.middleName + this.props.user.familyName}
        className="user-card"
      >
        <img src={this.props.user.image} alt={`${this.props.user.givenName}'s avatar`} />
        <p>{this.props.user.isAdmin ? 'Admin' : 'User'}</p>
        <p>
          Name:
          <span>{` ${this.props.user.givenName} ${
            this.props.user.middleName ? this.props.user.middleName + ' ' : ''
          }${this.props.user.familyName}`}</span>
        </p>
        <p>
          Date of birth: <span>{new Date(this.props.user.dateOfBirth).toLocaleDateString()}</span>
        </p>
        <p>
          Country of origin: <span>{this.props.user.countryOfOrigin}</span>
        </p>
        <p>
          Sex: <span>{this.props.user.sex}</span>
        </p>
      </div>
    );
  }
}

export default UserCard;
