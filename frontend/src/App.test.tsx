import App from './App';
import { create } from 'react-test-renderer';

describe('first testing', () => {
  test('test main component', () => {
    const component = create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
