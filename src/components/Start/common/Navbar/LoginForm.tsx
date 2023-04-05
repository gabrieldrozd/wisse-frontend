import {Popover, UnstyledButton, TextInput, PasswordInput, Title, Text} from "@mantine/core";
import classes from "./styles/LoginForm.module.scss";
import {useForm} from "@mantine/form";
import {useAuthSlice} from "@store/slices/users/auth/authSlice";
import {NavLink} from "react-router-dom";
import {IconChevronLeft} from "@tabler/icons-react";

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
    const {actions: {login}} = useAuthSlice();
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

    const onLoginSubmit = (values: LoginFormModel) => {
        login(values.email, values.password).then();
    };

    const loginForm = (
        <form
            onSubmit={form.onSubmit((values) => onLoginSubmit(values))}
            className={isDropdown ? classes.dropdownLoginForm : ""}
        >
            <Title className={classes.loginFormTitle}>
                Provide your credentials below
            </Title>
            <TextInput
                size="md"
                label="Email"
                placeholder="Enter your email"
                required
                {...form.getInputProps("email")}
            />
            <PasswordInput
                mt="md"
                size="md"
                label="Password"
                placeholder="Enter your password"
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

            <UnstyledButton className={classes.submitBtn} type="submit" mt="md">
                Submit
            </UnstyledButton>
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