import {_authPersistActions} from "@store/slices/users/auth/_authPersistActions";
import {_enrollmentPersistActions} from "@store/slices/enrollment/enrollment/_enrollmentPersistActions";

export const persistActions = [
    ..._authPersistActions,
    ..._enrollmentPersistActions,
];