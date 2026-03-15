import styles from "./LabeledInput.module.css"

type Props = {
    label: string;
    type?: "text" | "number";
    value: string | number;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export default function LabeledInput ({
    label, type = "text", value, placeholder, disabled, onChange
}: Props) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>

    );
}