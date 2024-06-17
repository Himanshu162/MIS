export const SET_PASSDATA = "teamly/settings/SET_PASSDATA";
export const REFRESH_DASHBOARD = "REFRESH_DASHBOARD";


const initialState = {
    bln: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        // case SET_PASSDATA:
        //     const { messageToPassUrl } = action;
        //     return {
        //         ...state,
        //         messageToPassUrl
        //     };
        case REFRESH_DASHBOARD:
            // const { bln } = action;
            return {
                ...state,
                bln: !state.bln,
            };
        default:
            return state;
    }
};

// export const setPassData = (
//     messageToPassUrl
// ) => ({
//     type: SET_PASSDATA,
//     messageToPassUrl
// });


export const refreshDashbord = (
    // bln
) => ({
    type: REFRESH_DASHBOARD,
    // bln
});

