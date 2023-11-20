import { useContext } from 'react';
import { CallsContext } from './calls.provider';

export const useCallsContext = () => useContext(CallsContext);
