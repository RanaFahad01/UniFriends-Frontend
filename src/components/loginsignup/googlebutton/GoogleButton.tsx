import { Button, ButtonProps } from "@mantine/core";
import { GoogleIcon } from "./GoogleIcon";

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
    return <Button size="md" leftSection={<GoogleIcon />} variant="default" {...props} />;
}