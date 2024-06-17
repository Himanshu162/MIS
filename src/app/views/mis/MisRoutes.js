import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const Mis = MatxLoadable({
    loader: () => import('./Mis')
});

const MisRoutes = [
    {
        path: "/eoffice/mis/incoming/unclassified",
        component: Mis,
        auth: authRoles.admin
    }
];

export default MisRoutes;
