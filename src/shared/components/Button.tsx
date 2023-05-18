import {FC} from "react";
import {Link} from "react-router-dom";
import {Button as NextButton, ButtonProps} from "@nextui-org/react";

interface Props extends ButtonProps {
    to?: string;
}

export const Button: FC<Props> = ({to, children, ...props}) => {
    if (to) {
        return (
            // @ts-expect-error
            <NextButton as={Link} to={to} {...props}>{children}</NextButton>
        );
    }

    return (
        <NextButton {...props}>{children}</NextButton>
    );
};