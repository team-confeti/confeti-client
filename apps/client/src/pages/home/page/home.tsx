import { Footer, FestivalCard } from '@confeti/design-system';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <FestivalCard title="2024 위버스 콘 페스티벌" />
      <FestivalCard
        title="2024 위버스 콘 페스티벌"
        selectable={true}
        onSelectChange={(title, isSelected) =>
          console.log(`${title} 선택 상태: ${isSelected}`)
        }
      />
      <Footer />
    </>
  );
};

export default Home;
