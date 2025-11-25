import { useParams, useSearchParams } from 'react-router-dom';

const TimetableDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Timetable Detail</h1>
      <p>ID from URL: {id}</p>
      <p>Search Params: {searchParams.toString()}</p>
    </div>
  );
};

export default TimetableDetail;
