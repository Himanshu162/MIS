import React from "react";
import { Redirect } from "react-router-dom";
// import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
// import inboxRoutes from "./views/inbox/InboxRoutes";
import materialRoutes from "./views/material-kit/MaterialRoutes";
// import initiateRoutes from "./views/initiate/InitiateRoutes";
// import formsRoutes from "./views/forms/FormsRoutes";
// import StartProcessPage from "./views/initiate/shared/startProcess/StartProcessPage";
// import initiateFileRoutes from "./views/FileSend/InitiateFileRoutes";
// import fileApproveRoutes from "./views/FileApproval/FileApprovalRoutes";
import MisRoutes from "./views/mis/MisRoutes";

import MisSecretRoutes from "./views/misSecert/MisSecretRoutes";
import MisRoutes1 from "./views/mis2/MisRoutes1";
import MisSecretRoutes1 from "./views/misSecert2/MisSecretRoutes1";
import MisDashboardRoutes from "./views/dashboard/DashboardRoutes";

const redirectRoute = [
    {
        path: "/eoffice",
        exact: true,
        // component: () => <Redirect to="/eoffice/dashboard/analytics" />
        component: () => <Redirect to="/eoffice/mis/dashboard" />
    }
];

// const startProcess = [
//     {
//         path: "/eoffice/startprocess/key/:process",

//         exact: true,
//         component: { StartProcessPage },
//     }
// ]

const routes = [
    // ...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    // ...formsRoutes,
    // ...initiateRoutes,
    // ...initiateFileRoutes,
    // ...fileApproveRoutes,
    ...MisRoutes,
    ...MisSecretRoutes,
    ...MisSecretRoutes1,
    // ...inboxRoutes,
    ...sessionRoutes,
    ...MisRoutes1,
    ...redirectRoute,
    // ...startProcess,
    ...MisDashboardRoutes
];

export default routes;
