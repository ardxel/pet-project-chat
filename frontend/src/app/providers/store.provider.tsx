import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

const StoreProvider = (props: { children: ReactNode }) => <Provider store={store}>{props.children}</Provider>;

export default StoreProvider;
