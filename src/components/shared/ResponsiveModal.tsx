import { ReactNode } from 'react';
import { FocusTrap, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './ResponsiveModal.module.css';

interface ResponsiveModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Reusable modal shell, it goes full-screen on mobile but centred on desktop.
// Used for new post, new league, etc. Inner content supplies its own title.
export function ResponsiveModal({ opened, onClose, children }: ResponsiveModalProps) {
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      fullScreen={isMobile}
      size="lg"
      centered
      overlayProps={{ backgroundOpacity: 0.6, blur: 3 }}
      classNames={{ content: classes.content, body: classes.body }}
      withCloseButton
    >
      <FocusTrap.InitialFocus />
      {children}
    </Modal>
  );
}
