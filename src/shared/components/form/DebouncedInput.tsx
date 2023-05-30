import React, {useState, useEffect, ChangeEvent, useRef} from "react";
import {Textarea, TextInput} from "@mantine/core";
import {useController, Control} from "react-hook-form";
import {debounce} from "lodash";
import {ITestTemplatePostFormModel} from "@models/education/testTemplate";

interface Props {
    textarea?: false | true;
    formControl: Control<ITestTemplatePostFormModel>;
    name: string;
    defaultValue?: string;

    [key: string]: any;
}

export const DebouncedInput = ({textarea = false, formControl, name, defaultValue, ...props}: Props) => {
    const {field} = useController({control: formControl, name: name as any, defaultValue});
    const [localValue, setLocalValue] = useState(field.value);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textinputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLocalValue(field.value);
    }, [field.value]);

    const debouncedOnChange = useRef(debounce((value: string) => {
        field.onChange(value);
    }, 500)).current;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalValue(event.target.value);
        debouncedOnChange(event.target.value);
    };

    const handleBlur = () => {
        debouncedOnChange.cancel();
        field.onChange(localValue);
    };

    const inputProps = {
        ...props,
        value: localValue,
        onChange: handleChange,
        onBlur: handleBlur,
    };

    return (
        textarea
            ? <Textarea {...inputProps} ref={textareaRef} />
            : <TextInput {...inputProps} ref={textinputRef} />
    );
};

