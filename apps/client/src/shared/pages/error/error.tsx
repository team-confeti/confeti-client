import { useNavigate } from 'react-router-dom';

import { Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './error.css';

const ERROR_MESSAGES = {
  title: '앗! 에러가 발생했어요.',
  description: [
    '존재하지 않는 주소를 입력하셨거나',
    '요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없어요.',
  ],
  buttonText: '홈 화면으로 돌아가기',
};

const Error = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <div className={styles.container}>
        <Icon name="404" width="11.4rem" height="4.3rem" color="gray400" />

        <h1 className={styles.title}>{ERROR_MESSAGES.title}</h1>
        <div className={styles.description}>
          {ERROR_MESSAGES.description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className={styles.button}>
        <Button
          text={ERROR_MESSAGES.buttonText}
          variant="add"
          onClick={handleNavigate}
        />
      </div>
    </>
  );
};

export default Error;
