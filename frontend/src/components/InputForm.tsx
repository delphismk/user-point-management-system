import styles from "./InputForm.module.css";

type Props = {
  value: string;
  placeholder: string;
  buttonText: string;
  loadingText: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function InputForm({
  value, placeholder, buttonText, loadingText, isLoading, onChange, onSubmit
}: Props) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
      />
      <button 
        className={styles.button}
        onClick={onSubmit} 
        disabled={isLoading}
      >
        {isLoading ? loadingText : buttonText}
      </button>
    </div>
  );
}