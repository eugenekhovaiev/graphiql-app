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

  const addClosingBracket = (
    event: KeyboardEvent<HTMLTextAreaElement>,
    selectionStart: number,
    selectionEnd: number,
    openBracket: string,
    closeBracket: string
  ): void => {
    if (
      selectionStart === selectionEnd &&
      (code[selectionStart] === undefined ||
        /[\s}\])]/.test(code[selectionStart]))
    ) {
      event.preventDefault();
      const newCode = `${code.slice(
        0,
        selectionStart
      )}${openBracket}${closeBracket}${code.slice(selectionStart)}`;
      setCode(newCode);
      setCursor(selectionStart + 1);
    }
  };

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value: newCode } = event.target;
    const linesBeforeCursor = newCode.split('\n');
    setRows(linesBeforeCursor.length);
    setCode(newCode);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    const key = event.key;
    const { selectionStart, selectionEnd } = event.currentTarget;
    switch (key) {
      case '{':
        addClosingBracket(event, selectionStart, selectionEnd, '{', '}');
        break;
      case '(':
        addClosingBracket(event, selectionStart, selectionEnd, '(', ')');
        break;
      case '[':
        addClosingBracket(event, selectionStart, selectionEnd, '[', ']');
        break;
      case 'Enter':
        if (selectionStart === selectionEnd) {
          const codeBeforeEnter = code.slice(0, selectionStart);
          const codeAfterEnter = code.slice(selectionStart);
          const lastNonWhitespace = codeBeforeEnter.trimEnd().slice(-1);

          if (
            /[{\[(]/.test(lastNonWhitespace) &&
            codeBeforeEnter.slice(-1) !== '\n'
          ) {
            if (/^[ ]*[}\])]/.test(codeAfterEnter)) {
              event.preventDefault();
              const newCode = `${codeBeforeEnter}\n\n${codeAfterEnter}`;
              setCode(newCode);
              setCursor(selectionStart + 1);
              setRows(newCode.split('\n').length);
            } else {
            }
          }
        }
        break;
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
