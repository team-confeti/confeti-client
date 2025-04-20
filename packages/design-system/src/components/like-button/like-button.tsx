import { useEffect, useState } from 'react';

import { toast } from '@confeti/design-system';
import { BtnHeart } from '@confeti/design-system/icons';

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
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    if (!isLoggedIn) {
      toast('로그인 후 이용 가능해요');
      return;
    }

    const newAction = liked ? 'UNLIKE' : 'LIKE';

    if (!liked) {
      setAnimate(true);
    }

    setLiked(!liked);
    onLikeToggle(newAction);
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <BtnHeart
      isFavorite={liked}
      className={cn(likeButtonVariants({ liked, animate }), className)}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};

export default LikeButton;
