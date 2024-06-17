import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const MisSecretRoute = MatxLoadable({
    loader: () => import('./Mis')
});

const MisSecretRoutes1 = [
    {
        path: "/eoffice/mis/my/secret",
        component: MisSecretRoute,
        auth: authRoles.admin
    }
];

export default MisSecretRoutes1;
