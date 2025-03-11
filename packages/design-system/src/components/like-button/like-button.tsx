import { toast } from '@confeti/design-system';
import { BtnHeart } from '@confeti/design-system/icons';
import { useState } from 'react';

import { cn } from '../../utils';
import { likeButtonVariants } from './like-button.css';

interface props {
  isFavorite: boolean;
  onLikeToggle: (action: 'LIKE' | 'UNLIKE') => void;
  className?: string;
  isLoggedIn?: boolean;
}

const LikeButton = ({
  isFavorite,
  onLikeToggle,
  className,
  isLoggedIn = true,
}: props) => {
  const [liked, setLiked] = useState(isFavorite);

  const handleClick = () => {
    if (!isLoggedIn) {
      toast.default('로그인 후 이용 가능해요');
      return;
    }

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
