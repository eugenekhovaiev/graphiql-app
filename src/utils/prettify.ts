import TAB from '@/consts/TAB';

const prettify = (code: string): string => {
  let tabLength = 0;
  const lines = code.split('\n');
  const trimmedLines = lines.map((line) => line.trim());
  const nonEmptyLines = trimmedLines.filter((line) => line !== '');
  const nonExtraSpacesLines = nonEmptyLines.map((line) =>
    line
      .split(' ')
      .filter((item) => item !== '')
      .join(' ')
      .split('{')
      .map((item) => item.trim())
      .join('{')
  );
  const indentedLines = nonExtraSpacesLines.map((line) => {
    let newLine = TAB.repeat(tabLength);
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      switch (char) {
        case '{':
          tabLength += 1;
          newLine =
            i !== line.length - 1
              ? `${newLine}${char}\n${TAB.repeat(tabLength)}`
              : `${newLine}${char}`;
          break;
        case '}':
          tabLength = Math.max(0, tabLength - 1);
          newLine =
            i !== 0
              ? `${newLine.trimEnd()}\n${TAB.repeat(tabLength)}${char}`
              : `${TAB.repeat(tabLength)}${char}`;
          break;
        default:
          newLine = `${newLine}${char}`;
      }
    }
    return newLine;
  });

  return indentedLines.join('\n');
};

export default prettify;
