import SvgBtnHeartFilled24 from '../../icons/src/BtnHeartFilled24';
import * as styles from './artist-card.css';

interface Artist {
  id: number;
  name: string;
  image: string;
}

interface ArtistCardProps {
  data?: Artist[];
  size: 'sm' | 'md' | 'lg';
}

const ArtistCard = ({ data = [], size }: ArtistCardProps) => {
  return (
    <div>
      {data.map((artist) => (
        <div key={artist.id} className={styles.artistCardVariants({ size })}>
          <img
            className={styles.artistImg({ size })}
            src={artist.image}
            alt={artist.name}
          />
          {size === 'md' && (
            <SvgBtnHeartFilled24
              className={styles.heartImg}
              width={24}
              height={24}
            />
          )}
          <p className={styles.artistName({ size })}>{artist.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ArtistCard;
