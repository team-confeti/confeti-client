import { Button, Footer, toast } from '@confeti/design-system';

const Home = () => {
  const handleButtonClick = () => {
    toast.default('두 글자 이상 입력해주세요');
  };

  return (
    <>
      <h1>Home</h1>
      <Button onClick={handleButtonClick}>Click Me</Button>
      <Footer />
    </>
  );
};

export default Home;
