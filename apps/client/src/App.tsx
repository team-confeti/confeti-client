import { Button, ThemeProvider } from '@confeti/design-system';
import { rootStyle } from '@confeti/design-system/styles';

function App() {
  return (
    <ThemeProvider>
      <div className={rootStyle}>
        <main>
          <Button>Click me</Button>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
