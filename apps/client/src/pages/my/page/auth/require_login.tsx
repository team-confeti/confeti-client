import { Header } from '@confeti/design-system';
import RequireLoginSection from '../../components/auth/require_login_section';

const RequireLogin = () => {
  return (
    <div>
      <Header variant="detail" title="마이페이지" />
      <RequireLoginSection />
    </div>
  );
};

export default RequireLogin;
