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
        <img src={this.props.user.image} alt={`${this.props.user.givenName}'s photo`} />
        <span>
          {this.props.user.givenName} {this.props.user.middleName} {this.props.user.familyName}
        </span>
        <span>{new Date(this.props.user.dateOfBirth).toLocaleDateString()}</span>
        <span>{this.props.user.countryOfOrigin}</span>
        <span>{this.props.user.sex}</span>
        <span>{this.props.user.isAdmin ? 'Admin' : 'User'}</span>
      </div>
    );
  }
}

export default UserCard;
