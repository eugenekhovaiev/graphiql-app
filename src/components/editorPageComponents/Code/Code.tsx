import styles from './code.module.scss';
import { ChangeEvent, useState } from 'react';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });

function Code(): JSX.Element {
  const [code, setCode] = useState('');
  const [rows, setRows] = useState(1);
  const numbers = Array.from({ length: rows }, (_, index) => index + 1);

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value: newCode, selectionStart } = event.target;
    const linesBeforeCursor = newCode.slice(0, selectionStart).split('\n');
    setRows(linesBeforeCursor.length);
    setCode(newCode);
  };

  return (
    <div
      style={{ fontFamily: inconsolata.style.fontFamily }}
      className={styles.code}
    >
      <div className={styles.code__rowNumbers}>
        {numbers.map((number) => (
          <span className={styles.code__rowNumber} key={number}>
            {number}
          </span>
        ))}
      </div>
      <textarea
        className={styles.code__textarea}
        value={code}
        onChange={handleCodeChange}
        rows={rows}
      />
    </div>
  );
}

export default Code;
