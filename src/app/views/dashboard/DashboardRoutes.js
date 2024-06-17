import { MatxLoadable } from "./../../../matx";
import {authRoles} from "../../auth/authRoles";

const Mis = MatxLoadable({
    loader: () => import('./Mis')
});

const MisDashboardRoutes = [
    {
        path: "/eoffice/mis/dashboard",
        component: Mis,
        auth: authRoles.admin
    }
];

export default MisDashboardRoutes;
