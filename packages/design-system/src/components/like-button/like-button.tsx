import { useState } from 'react';
import { BtnHeart } from '@confeti/design-system/icons';
import { cn } from '../../utils';
import { likeButtonVariants } from './like-button.css';

interface props {
  isFavorite: boolean;
  onLikeToggle: (action: 'LIKE' | 'UNLIKE') => void;
  className?: string;
}

const LikeButton = ({ isFavorite, onLikeToggle, className }: props) => {
  const [liked, setLiked] = useState(isFavorite);

  const handleClick = () => {
    const newAction = liked ? 'UNLIKE' : 'LIKE';
    setLiked(!liked);
    onLikeToggle(newAction);
  };

  return (
    <BtnHeart
      isFavorite={liked}
      className={cn(likeButtonVariants({ liked }), className)}
      onClick={handleClick}
    />
  );
};

export default LikeButton;
