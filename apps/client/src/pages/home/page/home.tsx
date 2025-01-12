import { Button, Footer, Header } from '@confeti/design-system';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Button>Click Me</Button>
      <Footer />
      <Header variant="default" />
      <Header
        variant="detail"
        title="마이페이지"
        onBackClick={() => alert('방구티티')}
      />
    </>
  );
};

export default Home;
