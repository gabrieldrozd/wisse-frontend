import {useState} from "react";
import {Button} from "@nextui-org/react";

export const StepLevelAssessment = () => {
    const [testMode, setTestMode] = useState(false);

    return (
        <>
            {!testMode ? (
                <>
                    test
                    {testMode ? "true" : "false"}
                </>
            ) : (
                <>
                    not test
                    {testMode ? "true" : "false"}
                </>
            )}

            <Button onClick={() => setTestMode(!testMode)} />
        </>
    );
};