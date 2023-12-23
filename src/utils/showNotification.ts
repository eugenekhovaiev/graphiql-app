import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function showNotification(
  message: string | null,
  setMessage: (message: string | null) => void,
  setLink?: (hasLink: boolean) => void,
  router?: AppRouterInstance,
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
