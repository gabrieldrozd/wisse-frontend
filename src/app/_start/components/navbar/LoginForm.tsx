import {Popover, UnstyledButton, Title, Text} from "@mantine/core";
import classes from "./styles/LoginForm.module.scss";
import {useForm} from "@mantine/form";
import {useAuthState} from "@store/slices/users/auth/useAuthState";
import {NavLink} from "react-router-dom";
import {Input} from "@nextui-org/react";
import {Button} from "@components/Button";
import {useAuthApi} from "@api/hooks/useAuthApi";

interface LoginFormModel {
    email: string;
    password: string;
}

export interface LoginFormProps {
    isDropdown: boolean;
    setActive: (path: string) => void;
}

const emailValidator = (value: string) => (!value.trim() ? "Email is required" : null);
const passwordValidator = (value: string) => !value.trim() ? "Password is required" : null;

export const LoginForm = ({isDropdown, setActive}: LoginFormProps) => {
    const {commands: {login}} = useAuthApi();
    const form = useForm<LoginFormModel>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: emailValidator,
            password: passwordValidator,
        }
    });

    const onLoginSubmit = (values: LoginFormModel) => login.mutate({email: values.email, password: values.password});

    const loginForm = (
        <form
            onSubmit={form.onSubmit((values) => onLoginSubmit(values))}
            className={isDropdown ? classes.dropdownLoginForm : ""}
        >
            <Title className={classes.loginFormTitle}>
                Provide your credentials below
            </Title>
            <Input
                className={classes.input}
                size="md"
                type="email"
                label="Email"
                placeholder="Enter your email"
                color="primary"
                bordered
                fullWidth
                required
                {...form.getInputProps("email")}
            />
            <Input.Password
                className={classes.input}
                css={{marginTop: "1rem"}}
                size="md"
                type="password"
                label="Password"
                placeholder="Enter your password"
                color="primary"
                bordered
                fullWidth
                required
                {...form.getInputProps("password")}
            />

            <Text mt="md" size="sm" color="gray">
                If you are not a student yet, you can enroll by clicking
                <Text
                    ml={3}
                    fw={500}
                    color={"indigo"}
                    to="/enroll"
                    component={NavLink}
                    onClick={() => setActive("/enroll")}
                >
                    here
                </Text>.
            </Text>

            <Button
                className={classes.submitBtn}
                type="submit"
                size="lg"
            >
                Submit
            </Button>
        </form>
    );

    return (
        isDropdown ?
            (
                loginForm
            ) : (
                <Popover width={200} position="bottom" withArrow shadow="xl" arrowSize={14}>
                    <Popover.Target>
                        <UnstyledButton className={classes.loginBtn}>
                            Login
                        </UnstyledButton>
                    </Popover.Target>
                    <Popover.Dropdown
                        miw={500}
                        className={classes.loginForm}
                    >
                        {loginForm}
                    </Popover.Dropdown>
                </Popover>
            )
    );
};