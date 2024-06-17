import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const MisSecretRoute = MatxLoadable({
    loader: () => import('./Mis')
});

const MisSecretRoutes = [
    {
        path: "/eoffice/mis/incoming/secret",
        component: MisSecretRoute,
        auth: authRoles.admin
    }
];

export default MisSecretRoutes;
