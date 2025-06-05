import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Description } from '@confeti/design-system';
import { SwitchCase } from '@shared/components/switch-case';
import Loading from '@shared/pages/loading/loading';

import * as styles from './onboarding-complete.css';

interface OnBoardingCompleteProps {
  children: ReactNode;
}

type Phase = 'loading' | 'description' | 'cta';

const LoadingContent = () => (
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

const DescriptionContent = () => (
  <motion.div
    key="description"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <section
      className={styles.completeContentSection({ phase: 'description' })}
    >
      <Description.Text
        descriptionText={'공연의 설레는 시작과 끝을\n콘페티와 함께!'}
        fontSize={18}
      />
    </section>
  </motion.div>
);

const CtaContent = ({ children }: { children: ReactNode }) => (
  <motion.div
    key="cta"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <section className={styles.completeContentSection({ phase: 'cta' })}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Description.Text
          descriptionText={
            '멋진 취향이네요!\n선택하신 아티스트의 공연 소식을\n빠르게 알려드릴게요.'
          }
          fontSize={20}
        />
      </motion.div>

      <motion.div
        className={styles.confetiLogo}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img
          src="/images/confeti_3d_logo21.svg"
          className={styles.logoImage}
          alt="confeti logo"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </section>
  </motion.div>
);

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
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('description'), 3000),
      setTimeout(() => setPhase('cta'), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <SwitchCase
        value={phase}
        caseBy={{
          loading: () => <LoadingContent />,
          description: () => <DescriptionContent />,
          cta: () => <CtaContent>{children}</CtaContent>,
        }}
      />
    </AnimatePresence>
  );
};

export default OnBoardingComplete;
