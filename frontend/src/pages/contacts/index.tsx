import { Component } from 'react';
import { ContactsLeftBar } from 'widgets/contacts-leftbar';
import { ContactsWindow } from 'widgets/contacts-window';

class ContactsPage extends Component {
  render() {
    return (
      <div className='flex h-full w-full overflow-hidden relative'>
        <ContactsLeftBar />
        <ContactsWindow />
      </div>
    );
  }
}

export default ContactsPage;
