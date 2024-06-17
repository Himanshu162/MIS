import { Icon, Tooltip } from "@material-ui/core";
import React from "react";

export const navigations = [
    // {
    //   name: "Dashboard",
    //   path: "/eoffice/dashboard/analytics",
    //   icon: <Tooltip title="Dashboard" aria-label="Dashboard"><Icon style={{fontSize : '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px'}}><img src={process.env.PUBLIC_URL+`/assets/icons/dashboard_white_24dp.svg`} alt="Dashboard" /></Icon></Tooltip>
    // },
    // {
    //   name: "Initiate",
    //   path: "/eoffice/initiate/file",
    //   icon: "class"
    // },
    // {
    //   name: "Personnel App",
    //   path: "/eoffice/personnel/file",
    //   icon: <Tooltip title="Personnel App" aria-label="Personnel App"><Icon style={{fontSize : '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px'}}><img src={process.env.PUBLIC_URL+`/assets/icons/description_white_24dp.svg`} alt="Personnel App" /></Icon></Tooltip>
    // },
    {
        name: "Dashboard",
        path: "/eoffice/mis/dashboard",
        icon: <Tooltip title="My Files Unclassified" aria-label="Outbox"><Icon style={{ fontSize: '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px' }}><img style={{ filter: 'invert(1)' }} src={process.env.PUBLIC_URL + `/assets/images/dashboard-fill.png`} alt="Outbox" /></Icon></Tooltip>
    },
    {
        name: "My Files",
        children: [
            {
                name: "Unclassified",
                path: "/eoffice/mis/my/unclassified",
                icon: <Tooltip title="My Files Unclassified" aria-label="Outbox"><Icon style={{ fontSize: '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px' }}><img style={{ filter: 'invert(1)' }} src={process.env.PUBLIC_URL + `/assets/icons/mail-open-line.png`} alt="Outbox" /></Icon></Tooltip>
            },
            {
                name: "Secret",
                path: "/eoffice/mis/my/secret",
                icon: <Tooltip title="My Files Secret" aria-label="Inbox"><Icon style={{ fontSize: '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px' }}><img style={{ filter: 'invert(1)' }} src={process.env.PUBLIC_URL + `/assets/icons/mail-lock-line.png`} alt="Inbox" /></Icon></Tooltip>

            },
        ]
        ,
        icon: <Tooltip title="Incoming Secret" aria-label="Inbox"><Icon style={{ fontSize: '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px' }}><img style={{ filter: 'invert(1)' }} src={process.env.PUBLIC_URL + `/assets/images/inbox-unarchive-line.png`} alt="Inbox" /></Icon></Tooltip>

    }
    ,
    {
        name: "Incoming",
        children: [
            {
                name: "Unclassified",
                path: "/eoffice/mis/incoming/unclassified",
                icon: <Tooltip title="Incoming Unclassified" aria-label="Inbox"><Icon style={{ fontSize: '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px' }}><img style={{ filter: 'invert(1)' }} src={process.env.PUBLIC_URL + `/assets/icons/mail-send-fill.png`} alt="Inbox" /></Icon></Tooltip>
            },

            {
                name: "Secret",
                path: "/eoffice/mis/incoming/secret",
                icon: <Tooltip title="Incoming Secret" aria-label="Inbox"><Icon style={{ fontSize: '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px' }}><img style={{ filter: 'invert(1)' }} src={process.env.PUBLIC_URL + `/assets/icons/mail-lock-fill.png`} alt="Inbox" /></Icon></Tooltip>
            },
        ]
        ,
        icon: <Tooltip title="Incoming" aria-label="Inbox"><Icon style={{ fontSize: '22px', marginTop: '-5px', marginLeft: '-5px', height: '25px' }}><img style={{ filter: 'invert(1)' }} src={process.env.PUBLIC_URL + `/assets/images/inbox-archive-line.png`} alt="Inbox" /></Icon></Tooltip>

    },
    // {
    //   name: "Forms",
    //   icon: "description",
    //   children: [
    //     {
    //       name: "Basic",
    //       path: "/forms/basic",
    //       iconText: "B"
    //     },
    //     {
    //       name: "Editor",
    //       path: "/forms/editor",
    //       iconText: "E"
    //     }
    //   ]
    // },
    // {
    //   name: "Drag and Drop",
    //   icon: "control_camera",
    //   path: "/others/drag-and-drop"
    // },
    // {
    //   name: "Multilevel",
    //   icon: "trending_up",
    //   children: [
    //     {
    //       name: "Level 1",
    //       icon: "list",
    //       children: [
    //         {
    //           name: "Item 1",
    //           path: "/charts/victory-charts",
    //           iconText: "1"
    //         },
    //         {
    //           name: "Item 2",
    //           path: "/charts/react-vis",
    //           iconText: "2"
    //         },
    //         {
    //           name: "Item 3",
    //           path: "/charts/recharts",
    //           iconText: "3"
    //         },
    //         {
    //           name: "Item 4",
    //           path: "/charts/echarts",
    //           iconText: "4"
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   name: "Utilities",
    //   icon: "format_list_bulleted",
    //   children: [
    //     {
    //       name: "Color",
    //       path: "/utilities/color",
    //       iconText: "C"
    //     },
    //     {
    //       name: "Spacing",
    //       path: "/utilities/spacing",
    //       iconText: "S"
    //     },
    //     {
    //       name: "Typography",
    //       path: "/utilities/typography",
    //       iconText: "T"
    //     },
    //     {
    //       name: "Display",
    //       path: "/utilities/display",
    //       iconText: "D"
    //     }
    //   ]
    // },
    // {
    //   name: "Sessions",
    //   icon: "trending_up",
    //   children: [
    //     {
    //       name: "Sign in",
    //       iconText: "SI",
    //       path: "/session/signin"
    //     },
    //     {
    //       name: "Sign up",
    //       iconText: "SU",
    //       path: "/session/signup"
    //     },
    //     {
    //       name: "Forgot password",
    //       iconText: "FP",
    //       path: "/session/forgot-password"
    //     },
    //     {
    //       name: "Error",
    //       iconText: "404",
    //       path: "/session/404"
    //     }
    //   ]
    // },



    // {
    //   name: "UI Kits",
    //   icon: "favorite",
    //   badge: { value: "50+", color: "secondary" },
    //   children: [
    //     {
    //       name: "Auto Complete",
    //       path: "/material/autocomplete",
    //       iconText: "A"
    //     },
    //     {
    //       name: "Buttons",
    //       path: "/material/buttons",
    //       iconText: "B"
    //     },
    //     {
    //       name: "Checkbox",
    //       path: "/material/checkbox",
    //       iconText: "C"
    //     },
    //     {
    //       name: "Dialog",
    //       path: "/material/dialog",
    //       iconText: "D"
    //     },
    //     {
    //       name: "Expansion Panel",
    //       path: "/material/expansion-panel",
    //       iconText: "E"
    //     },
    //     {
    //       name: "Form",
    //       path: "/material/form",
    //       iconText: "F"
    //     },
    //     {
    //       name: "Icons",
    //       path: "/material/icons",
    //       iconText: "I"
    //     },
    //     {
    //       name: "Menu",
    //       path: "/material/menu",
    //       iconText: "M"
    //     },
    //     {
    //       name: "Progress",
    //       path: "/material/progress",
    //       iconText: "P"
    //     },
    //     {
    //       name: "Radio",
    //       path: "/material/radio",
    //       iconText: "R"
    //     },
    //     {
    //       name: "Switch",
    //       path: "/material/switch",
    //       iconText: "S"
    //     },
    //     {
    //       name: "Slider",
    //       path: "/material/slider",
    //       iconText: "S"
    //     },
    //     {
    //       name: "Snackbar",
    //       path: "/material/snackbar",
    //       iconText: "S"
    //     },
    //     {
    //       name: "Table",
    //       path: "/material/table",
    //       iconText: "T"
    //     }
    //   ]
    // },

    // {
    //   name: "Map",
    //   icon: "add_location",
    //   path: "/map"
    // },


];
