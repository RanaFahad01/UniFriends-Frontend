import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { createElement } from 'react';
import { notifications } from '@mantine/notifications';

export function notifySuccess(message: string, title?: string) {
  notifications.show({
    title: title ?? 'Success',
    message,
    color: 'green',
    icon: createElement(IconCheck, { size: 16 }),
    autoClose: 3500,
  });
}

export function notifyError(message: string, title?: string) {
  notifications.show({
    title: title ?? 'Error',
    message,
    color: 'red',
    icon: createElement(IconAlertCircle, { size: 16 }),
    autoClose: 5000,
  });
}
