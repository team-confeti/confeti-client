import { useState } from 'react';

import { toast } from '@confeti/design-system';
import { cn } from '@confeti/utils';

import { Icon } from '../../icons';

import { likeButtonVariants } from './like-button.css';

interface Props {
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
}: Props) => {
  const [liked, setLiked] = useState(isFavorite);
  const [animate, setAnimate] = useState(false);

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
    <Icon
      name={liked ? 'heart-filled' : 'heart-outline'}
      color={liked ? 'confeti_red' : 'gray500'}
      className={cn(likeButtonVariants({ animate }), className)}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};

export default LikeButton;
