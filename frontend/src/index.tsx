import App from 'app';
import { createRoot } from 'react-dom/client';

function bootstrap() {
  return createRoot(document.getElementById('root') as HTMLDivElement).render(<App />);
}

bootstrap();
