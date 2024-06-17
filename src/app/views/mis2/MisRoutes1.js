import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const Mis = MatxLoadable({
    loader: () => import('./Mis')
});

const MisRoutes1 = [
    {
        path: "/eoffice/mis/my/unclassified",
        component: Mis,
        auth: authRoles.admin
    }
];

export default MisRoutes1;
