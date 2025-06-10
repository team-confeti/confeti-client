import * as styles from './related-artist-list.css';

interface Props {
  artist: {
    profileUrl: string;
    name: string;
  };
}

const RelatedArtistList = ({ artist }: Props) => {
  return (
    <div className={styles.relatedArtistContainer}>
      <img
        className={styles.relatedArtistImg}
        src={artist.profileUrl}
        alt={artist.name}
      />
      <p className={styles.relatedArtistName}>{artist.name}</p>
      <span className={styles.artistText}>아티스트</span>
    </div>
  );
};

export default RelatedArtistList;
