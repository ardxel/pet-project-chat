import { Component } from 'react';
import { ProfileDetails } from './details';
import { ProfileHeader } from './header';

export default class Profile extends Component {
  render() {
    return (
      <div className='p-7 w-full h-full bg-aside-bg scroll'>
        <div className='max-w-[70rem] mx-auto h-full rounded-md'>
          <ProfileHeader />;
          <ProfileDetails />
        </div>
      </div>
    );
  }
}
