import {useSelector} from "react-redux";
import {RootState} from "@store/store";
import {Role} from "@core/constants/securityTypes";

export class AuthSelectors {
    private authState = useSelector((state: RootState) => state.auth);

    public token = () => this.authState.token;

    public isInRole = (givenRole: Role) => {
        return this.authState.accessToken.role === givenRole;
    };

    public isAuthenticated = () => {
        return this.authState.accessToken !== null;
    };

    public accessToken = () => this.authState.accessToken;
}