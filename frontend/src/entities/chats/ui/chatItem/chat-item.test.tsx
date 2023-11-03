import { store } from 'app/redux';
import { ThemeProvider } from 'entities/theme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { ChatListItem } from '.';

const userStub = { name: 'John Doe' };

describe('Test ChatListItem', () => {
  describe('Test ChatListItem by snapshots', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <ChatListItem user={userStub} conversationId='none' />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    const tree = component.toJSON();
    test('create or compare snapshot', () => {
      expect(tree).toMatchSnapshot();
    });
  });
});
