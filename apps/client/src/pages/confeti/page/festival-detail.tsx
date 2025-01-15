import { useParams } from 'react-router-dom';

export default function FestivalDetailPage() {
  const { festivalId } = useParams<{ festivalId: string }>();

  return (
    <div>
      <h1>Festival Detail</h1>
      <p>Festival ID: {festivalId}</p>
    </div>
  );
}
