import { Button, ThemeProvider } from '@confeti/design-system';

function App() {
  return (
    <ThemeProvider>
      <main>
        <h1>Confeti</h1>
        <Button>Click me</Button>
      </main>
    </ThemeProvider>
  );
}

export default App;
