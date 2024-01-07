import styles from './code.module.scss';
import { KeyboardEvent, ChangeEvent, useState, useEffect, useRef } from 'react';
import { Inconsolata } from 'next/font/google';
import TAB from '@/consts/TAB';

interface Props {
  value?: string;
  setValue?: (value: string) => void;
  readonly?: boolean;
}

const inconsolata = Inconsolata({ subsets: ['latin'] });

function Code({ value, setValue, readonly }: Props): JSX.Element {
  const [code, setCode] = useState<string>(value || '');
  const [rows, setRows] = useState(value?.split('\n').length || 1);
  const [cursor, setCursor] = useState(0);
  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const numbers = Array.from({ length: rows }, (_, index) => index + 1);

  useEffect(() => {
    codeRef.current && codeRef.current.setSelectionRange(cursor, cursor);
    if (value !== undefined) {
      setRows(value.split('\n').length);
      setCode(value);
    }
  }, [cursor, code, value]);

  const setView = (
    newCode: string,
    newCursor: number,
    newRows?: number
  ): void => {
    setValue && setValue(newCode);
    setCode(newCode);
    setCursor(newCursor);
    newRows && setRows(newRows);
  };

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
      setView(newCode, selectionStart + 1);
    }
  };

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value: newCode, selectionStart } = event.target;
    setView(newCode, selectionStart, newCode.split('\n').length);
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
            /^[ ]*[}\])]/.test(codeAfterEnter)
          ) {
            event.preventDefault();
            const newCode = `${codeBeforeEnter}\n\n${codeAfterEnter}`;
            setView(newCode, selectionStart + 1, newCode.split('\n').length);
          }
        }
        break;
      case 'Tab':
        event.preventDefault();
        const newCode = `${code.slice(0, selectionStart)}${TAB}${code.slice(
          selectionStart
        )}`;
        setView(newCode, selectionStart + TAB.length);
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
        value={value !== undefined ? value : code}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        rows={rows}
        ref={codeRef}
        readOnly={readonly}
      />
    </div>
  );
}

export default Code;
