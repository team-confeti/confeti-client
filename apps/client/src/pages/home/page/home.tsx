import { Button, Footer, Header } from '@confeti/design-system';

const Home = () => {
  return (
    <>
      <Header
        variant="detail"
        title="마이페이지"
        onBackClick={() => alert('뒤로가기 버튼 클릭')}
      />
      <h1>Home</h1>
      <Button>Click Me</Button>
      <Footer />
    </>
  );
};

export default Home;
