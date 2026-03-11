import * as styles from './dashboard-card.css';

type CardVariant = 'pending' | 'festival' | 'concert';

interface Props {
  title: string;
  count: number;
  icon: React.ReactNode;
  variant: CardVariant;
  onClick: () => void;
}

const DashboardCard = ({ title, count, icon, variant, onClick }: Props) => {
  return (
    <div onClick={onClick} className={styles.card}>
      <div className={styles.iconWrapper[variant]}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.count}>{count}</p>
    </div>
  );
};

export default DashboardCard;
