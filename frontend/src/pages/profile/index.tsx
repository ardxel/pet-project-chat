import { Component } from 'react';
import { ProfileDetails } from './details';
import { ProfileHeader } from './header';

export default class Profile extends Component {
  render() {
    return (
      <div className='scroll h-full w-full bg-aside-bg p-7'>
        <div className='mx-auto h-full max-w-[70rem] rounded-md'>
          <ProfileHeader />;
          <ProfileDetails />
        </div>
      </div>
    );
  }
}
