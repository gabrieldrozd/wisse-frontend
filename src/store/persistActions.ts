import {_questionPersistActions} from "@store/slices/education/question/_questionPersistActions";
import {_testPersistActions} from "@store/slices/education/test/_testPersistActions";
import {_testResultPersistActions} from "@store/slices/education/test-result/_testResultPersistActions";
import {_testTemplatePersistActions} from "@store/slices/education/test-template/_testTemplatePersistActions";
import {_enrollmentPersistActions} from "@store/slices/enrollment/enrollment/_enrollmentPersistActions";
import {_authPersistActions} from "@store/slices/users/auth/_authPersistActions";
import {_studentPersistActions} from "@store/slices/users/student/_studentPersistActions";
import {_teacherPersistActions} from "@store/slices/users/teacher/_teacherPersistActions";

export const initializeAction = {type: "initialize"};

export const persistActions = [
    initializeAction,
    ..._questionPersistActions,
    ..._testPersistActions,
    ..._testResultPersistActions,
    ..._testTemplatePersistActions,
    ..._enrollmentPersistActions,
    ..._authPersistActions,
    ..._studentPersistActions,
    ..._teacherPersistActions
];

