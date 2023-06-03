import {Grammarly, GrammarlyEditorPlugin} from "@grammarly/editor-sdk-react";
import {Textarea, TextInput} from "@mantine/core";
import type {ITestTemplatePostFormModel} from "@models/education/testTemplate";
import {debounce} from "lodash";
import type {ChangeEvent} from "react";
import React, {useState, useEffect, useRef} from "react";
import type {Control} from "react-hook-form";
import {useController} from "react-hook-form";

interface Props {
    textarea?: false | true;
    formControl: Control<ITestTemplatePostFormModel>;
    name: string;
    defaultValue?: string;

    [key: string]: any;
}

export const SpellCheckDebouncedInput = ({textarea = false, formControl, name, defaultValue, ...props}: Props) => {
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
        <Grammarly clientId="client_Vf2UN3kkmcqEebvfRA2qKX">
            {textarea
                ? (
                    <GrammarlyEditorPlugin style={{width: "100%"}}>
                        <Textarea {...inputProps} ref={textareaRef} />
                    </GrammarlyEditorPlugin>
                )
                : (
                    <GrammarlyEditorPlugin style={{width: "100%"}}>
                        <TextInput {...inputProps} ref={textinputRef} />
                    </GrammarlyEditorPlugin>
                )}
        </Grammarly>
    );
};

