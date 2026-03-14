import styles from "./ErrorMessage.module.css";

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  // エラーが無い時は何も表示しない
  if (!message) return null;

  return (
    <p className={styles.error}>
      {message}
    </p>
  );
}