import { store } from 'app/redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { ChatListItem } from '.';

const userStub = { name: 'John Doe' };

describe('Test ChatListItem', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Provider store={store}>
          <ChatListItem user={userStub} conversationId='none' />
        </Provider>
      </MemoryRouter>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
