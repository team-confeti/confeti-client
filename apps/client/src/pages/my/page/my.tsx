import { Header } from '@confeti/design-system';
import UserInfo from '../components/user-info';
import { USER_DATA } from '@shared/mocks/user-data';

const My = () => {
  const { userName, profileUrl } = USER_DATA.data;

  return (
    <>
      <Header variant="detail" title="마이페이지" />
      <UserInfo userName={userName} profileUrl={profileUrl} />
    </>
  );
};

export default My;
