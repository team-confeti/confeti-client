import { Avatar, Button, Description, SearchBar } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { useFunnel } from '@shared/utils/use-funnel';

import * as styles from './onboarding.css';

const mockArtists = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `오아시스 ${i + 1}`,
  src: 'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
}));

const Onboarding = () => {
  const TOTAL_STEPS = 2;
  const { Funnel, Step, setStep } = useFunnel(TOTAL_STEPS, routePath.ROOT);

  return (
    <Funnel>
      <Step name="1">
        <section className={styles.onboardingContentSection}>
          <Description
            descriptionText={['선호하는 아티스트를', '모두 선택해주세요']}
            fontSize={20}
          />
          <div className={styles.searchBarSection}>
            <SearchBar
              showBackButton={false}
              placeholder="아티스트를 검색해주세요"
            />
          </div>
          <div className={styles.avatarGridSection}>
            {mockArtists.map((artist) => (
              <div key={artist.id} className={styles.avatar}>
                <Avatar
                  size="xl"
                  src={artist.src}
                  alt={`${artist.name} 이미지`}
                />
                <p className={styles.artistName}>{artist.name}</p>
              </div>
            ))}
          </div>
          <Button text={'다음'} variant={'add'} onClick={() => setStep(1)} />
        </section>
      </Step>
      <Step name="2">
        <p>2단계</p>
      </Step>
    </Funnel>
  );
};

export default Onboarding;
