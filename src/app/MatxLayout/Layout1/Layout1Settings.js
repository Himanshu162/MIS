import history  from "../../../history";

let themeColor1 = 'blue';
let Layout1Settings =  {
    leftSidebar: {
        show: true,
        mode: 'full', // full, close, compact, mobile,
        theme: themeColor1, // View all valid theme colors inside MatxTheme/themeColors.js
        bgOpacity: .96, // 0 ~ 1
        bgImgURL: `${process.env.PUBLIC_URL + "/assets/images/sidebar/sidebar-bg-light.jpg"}`
    },
    topbar: {
        show: true,
        fixed: true,
        theme: themeColor1 // View all valid theme colors inside MatxTheme/themeColors.js
    },
    activeButton: {
        theme: themeColor1
    },
    footer: {
        theme: themeColor1
    }
};
let unlisten = history.listen((location, action) => {

    if (location.pathname === '/eoffice/mis/secret') {
        themeColor1 = 'red';
        Layout1Settings = {
            leftSidebar: {
                show: true,
                mode: 'compact', // full, close, compact, mobile,
                theme: 'red', // View all valid theme colors inside MatxTheme/themeColors.js
                bgOpacity: .96, // 0 ~ 1
                bgImgURL: `${process.env.PUBLIC_URL + "/assets/images/sidebar/sidebar-bg-light.jpg"}`
            },
            topbar: {
                show: true,
                fixed: true,
                theme: 'red' // View all valid theme colors inside MatxTheme/themeColors.js
            },
            activeButton: {
                theme: 'red'
            },
            footer: {
                theme: 'red'
            }
        }
        console.log("Secret");
    }
    if (location.pathname === '/eoffice/mis/unclassified') {
        themeColor1 = 'blue';
        Layout1Settings = {
            leftSidebar: {
                show: true,
                mode: 'compact', // full, close, compact, mobile,
                theme: themeColor1, // View all valid theme colors inside MatxTheme/themeColors.js
                bgOpacity: .96, // 0 ~ 1
                bgImgURL: `${process.env.PUBLIC_URL + "/assets/images/sidebar/sidebar-bg-light.jpg"}`
            },
            topbar: {
                show: true,
                fixed: true,
                theme: themeColor1 // View all valid theme colors inside MatxTheme/themeColors.js
            },
            activeButton: {
                theme: 'blue'
            },
            footer: {
                theme: 'blue'
            }
        }
    }
});
export default Layout1Settings;
