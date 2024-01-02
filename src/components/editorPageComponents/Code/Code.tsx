import styles from './code.module.scss';
import { KeyboardEvent, ChangeEvent, useState, useEffect, useRef } from 'react';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });

function Code(): JSX.Element {
  const [code, setCode] = useState('');
  const [rows, setRows] = useState(1);
  const [cursor, setCursor] = useState(0);
  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const numbers = Array.from({ length: rows }, (_, index) => index + 1);

  useEffect(() => {
    codeRef.current && codeRef.current.setSelectionRange(cursor, cursor);
  }, [cursor]);

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value: newCode, selectionStart } = event.target;
    const linesBeforeCursor = newCode.slice(0, selectionStart).split('\n');
    setRows(linesBeforeCursor.length);
    setCode(newCode);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    const key = event.key;
    const { selectionStart, selectionEnd } = event.currentTarget;
    if (key === '{') {
      if (
        selectionStart === selectionEnd &&
        (code[selectionStart] === undefined ||
          /[\s\n]/.test(code[selectionStart]))
      ) {
        event.preventDefault();
        const newCode = `${code.slice(0, selectionStart)}{}${code.slice(
          selectionStart
        )}`;
        setCode(newCode);
        setCursor(selectionStart + 1);
      }
    }
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
        onKeyDown={handleKeyDown}
        rows={rows}
        ref={codeRef}
      />
    </div>
  );
}

export default Code;
