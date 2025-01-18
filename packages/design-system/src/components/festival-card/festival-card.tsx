import * as styles from './festival-card.css';
import { IcSelect } from '../../icons/src';
import { useNavigate } from 'react-router-dom';

interface FestivalCardProps {
  festivalId?: number;
  title: string;
  imageSrc?: string;
  isSelected?: boolean;
  selectable?: boolean;
  onSelectChange?: (title: string, isSelected: boolean) => void;
  id: number;
  type: 'concert' | 'festival';
  onClick?: () => void;

}

const FestivalCard = ({
  title,
  imageSrc = 'https://dummyimage.com/100x142',
  isSelected = false,
  selectable = false,

  onSelectChange,
  id,
  type,
}: FestivalCardProps) => {
  const [internalSelected, setInternalSelected] = useState(isSelected);
  const navigate = useNavigate();
  const detailRoutePath = `/${type}-detail/${id}`;

  const handleClick = () => {
    if (!selectable) {
      return navigate(detailRoutePath);
    }

    const toggledSelected = !internalSelected;
    setInternalSelected(toggledSelected);

    if (onSelectChange) {
      onSelectChange(title, toggledSelected);
    }
  };
  onClick,
}: FestivalCardProps) => {

  return (
    <div className={styles.card}>
      <div
        className={styles.poster({ selectable })}
        aria-pressed={internalSelected}
        onClick={() => handleClick()}
        // onClick={selectable ? onClick : undefined}
        // aria-pressed={isSelected}

      >
        <img src={imageSrc} alt={title} className={styles.image} />
        {isSelected && (
          <div className={styles.overlay}>
            <IcSelect className={styles.icon} />
          </div>
        )}
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default FestivalCard;
