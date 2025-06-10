import * as styles from './form-input.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = ({ label, error, ...props }: Props) => {
  return (
    <div className={styles.container}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>
      <input {...props} className={styles.input} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FormInput;
