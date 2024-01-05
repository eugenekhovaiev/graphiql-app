import { NextRouter } from 'next/router';

function showNotification(
  message: string | null,
  setMessage: (message: string | null) => void,
  setLink?: (hasLink: boolean) => void,
  router?: NextRouter,
  link?: string
): void {
  setMessage(message);
  setLink && setLink(true);
  setTimeout(() => {
    setMessage(null);
    setLink && setLink(false);
    router?.push(link!);
  }, 2000);
}

export default showNotification;
