import store from 'app/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

const StoreProvider = (props: { children: ReactNode }) => <Provider store={store}>{props.children}</Provider>;

export default StoreProvider;
