import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SvgConfeti3DLogo21 from 'node_modules/@confeti/design-system/src/icons/src/Confeti3DLogo21';

import { Description } from '@confeti/design-system';
import Loading from '@shared/pages/loading/loading';

import * as styles from './onboarding-complete.css';

interface OnBoardingCompleteProps {
  children: ReactNode;
}

/**
 * @component DescriptionMotionSection
 * @motionProps
 * - `key`: React의 재조정을 위해 사용되는 고유한 키입니다.
 * - `initial`: 컴포넌트가 등장하기 전 상태입니다.
 * - `animate`: 컴포넌트가 보여질 때의 최종 상태입니다.
 * - `exit`: 컴포넌트가 퇴장할 때의 상태입니다.
 * - `transition`: 애니메이션의 지속시간 및 지연 시간을 설정합니다.
 */
const OnBoardingComplete = ({ children }: OnBoardingCompleteProps) => {
  const [phase, setPhase] = useState<'loading' | 'description' | 'cta'>(
    'loading',
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('description'), 3000),
      setTimeout(() => setPhase('cta'), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const renderPhase = () => {
    switch (phase) {
      case 'loading':
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Loading />
          </motion.div>
        );

      case 'description':
        return (
          <motion.div
            key="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section
              className={styles.completeContentSection({
                phase: 'description',
              })}
            >
              <Description
                descriptionText={'공연의 설레는 시작과 끝을\n콘페티와 함께!'}
                fontSize={18}
              />
            </section>
          </motion.div>
        );

      case 'cta':
        return (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <section
              className={styles.completeContentSection({ phase: 'cta' })}
            >
              <div>
                <Description
                  descriptionText={
                    '멋진 취향이네요!\n선택하신 아티스트의 공연 소식을\n빠르게 알려드릴게요.'
                  }
                  fontSize={20}
                />
              </div>
              <div className={styles.confetiLogo}>
                <SvgConfeti3DLogo21 width={'22rem'} height={'22rem'} />
              </div>
              <div>{children}</div>
            </section>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return <AnimatePresence mode="wait">{renderPhase()}</AnimatePresence>;
};

export default OnBoardingComplete;
