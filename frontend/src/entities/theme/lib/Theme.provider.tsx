import { FC, ReactNode, useEffect } from 'react';
import { useAppSelector } from 'shared/model';
import { selectCurrentTheme } from '../model';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector(selectCurrentTheme);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return <>{children}</>;
};
