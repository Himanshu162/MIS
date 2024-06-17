import * as AT from '../../constants/ActionTypes';
import { BACK_API } from '../../../../middleware/backend';
import {BACK_API1} from '../../../../middleware/backendPA'
import localStorageService from "../../../../services/localStorageService";
import {BACKEND_API_SAU} from "../../../../middleware/backendSau";

let role = sessionStorage.getItem("role");
let username = sessionStorage.getItem("username");
/*const userData = JSON.parse(userDataParse);*/

export const setCreateForm = (values) => ({
    [BACK_API]: {
        types: [ AT.INITIATE_FORM_CREATE_REQUEST, AT.INITIATE_FORM_CREATE_SUCCESS, AT.INITIATE_FORM_CREATE_FAILURE ],
        endpoint: `/api/createFile`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token')

            }
        }
    }

});
export const getPersonalInfo = (values) => ({
    [BACK_API]: {
        types: [ AT.GET_PERSONAL_SUCCESS, AT.GET_PERSONAL_REQUEST, AT.GET_PERSONAL_FAILURE ],
        endpoint: `/api/getPersonalInfo`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token')

            }
        }
    }

});
export const updatePersonalInfo = (values) => ({
    [BACK_API]: {
        types: [ AT.UPDATE_PERSONAL_SUCCESS, AT.UPDATE_PERSONAL_REQUEST, AT.UPDATE_PERSONAL_FAILURE ],
        endpoint: `/api/updatePersonalInfo`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token')

            }
        }
    }

});
export const uploadEnclosure = (id,file,role,username) => ({
    [BACK_API]: {
        types: [ AT.ENCLOSURE_FILE_FAILURE, AT.ENCLOSURE_FILE_REQUEST, AT.ENCLOSURE_FILE_SUCCESS],
        endpoint: `/api/upload/enclosure/file/`+id,

        settings: {
            method: 'post',
            body: file,
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username
            }
        }
    }
});

export const uploadNoting = (id,file,role,username) => ({
    [BACK_API]: {
        types: [ AT.NOTING_FILE_FAILURE, AT.NOTING_FILE_REQUEST, AT.NOTING_FILE_SUCCESS],
        endpoint: `/api/upload/noting/file/`+id,

        settings: {
            method: 'post',
            body: file,
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username
            }
        }
    }
});


export const sendFile = (id,data,role) => ({
    [BACK_API]: {
        types: [ AT.SEND_FILE_FAILURE, AT.SEND_FILE_REQUEST, AT.SEND_FILE_SUCCESS],
        endpoint: `/api/sendFile/`+id+ `/`+false,

        settings: {
            method: 'post',
            body: data,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'roleName': role
            }
        }
    }
});

export const createPersonalFileForm = (values) => ({
    [BACK_API]: {
        types: [ AT.CREATE_PF_REQUEST, AT.CREATE_PF_SUCCESS, AT.CREATE_PF_FAILURE ],
        endpoint: `/api/createFile`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token')

            }
        }
    }

});

export const getAnnotation = (id) => ({
    [BACK_API]: {
        types: [ AT.GET_ANNOT_SUCCESS, AT.GET_ANNOT_REQUEST, AT.GET_ANNOT_FAILURE ],
        endpoint: `/api/getAnnotation/`+id,
        settings: {
            method: 'get',

            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),

            }
        }
    }

});

export const createAnnotation = (values,id) => ({
    [BACK_API]: {
        types: [ AT.ANNOT_SUCCESS, AT.ANNOT_REQUEST, AT.ANNOT_FAILURE ],
        endpoint: `/api/uploadAnnotation/`+id,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),

            }
        }
    }

});

export const createPersonalApplicationForm = (values,role,grp) => ({
    [BACK_API]: {
        types: [ AT.PA_REQUEST, AT.PA_SUCCESS, AT.PA_FAILURE ],
        endpoint: `/api/createApplication`,
        settings: {
            method: 'post',
            body: values,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'grp': grp
            }
        }
    }

});

export const sendFiles = (id,data,role,username) => ({
    [BACK_API]: {
        types: [ AT.SEND_FILES_FAILURE, AT.SEND_FILES_REQUEST, AT.SEND_FILES_SUCCESS],
        endpoint: `/api/sendFiles/`+id+ `/`+false,

        settings: {
            method: 'post',
            body: data,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username
            }
        }
    }
});

export const saveFiles = (id,data,role) => ({
    [BACK_API]: {
        types: [ AT.SAVE_FILES_REQUEST, AT.SAVE_FILES_SUCCESS, AT.SAVE_FILES_FAILURE],
        endpoint: `/api/saveDocument/`+id,

        settings: {
            method: 'post',
            body: data,
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'roleName': role
            }
        }
    }
});

export const uploadAnnexure = (personalAppId,file,role,username) => ({
    [BACK_API]: {
        types: [ AT.ANNEXURE_FILE_REQUEST, AT.ANNEXURE_FILE_SUCCESS, AT.ANNEXURE_FILE_FAILURE],
        endpoint: `/api/upload/annexure/file/`+personalAppId,

        settings: {
            method: 'post',
            body: file,
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username
            }
        }
    }
});
export const getbyfilename = (value) =>
    ({
        [BACKEND_API_SAU]: {
            types: [ AT.HRM_SAU_REQUEST, AT.HRM_SAU_SUCCESS, AT.HRM_SAU_FAILURE],
            endpoint: `/api/getbyfilename`,

            settings: {
                method: 'post',
                body: value,
                headers: {

                }
            }
        }
    } );
export const quickSign = (value,role) =>
    ({
    [BACK_API]: {
    types: [ AT.QICK_SIGN_REQUEST, AT.QICK_SIGN_SUCCESS, AT.QICK_SIGN_FAILURE],
        endpoint: `/api/sign`,

        settings: {
        method: 'post',
            body: value,
            headers: {
            'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
            'roleName': role,
        }
    }
}
} );


export const getGroupList = (value) => ({
    [BACK_API1]: {
        types: [ AT.GROUP_LIST_REQUEST, AT.GROUP_LIST_SUCCESS, AT.GROUP_LIST_FAILURE],
        endpoint: `/causaumapping/getsaudisplay`,

        settings: {
            method: 'post',
            body: value,
            headers: {
            }
        }
    }
});

export const getHrmFileList = (value) => ({
    [BACK_API]: {
        types: [ AT.HRM_LIST_REQUEST, AT.HRM_LIST_SUCCESS, AT.HRM_LIST_FAILURE],
        endpoint: `/api/getHrm`,

        settings: {
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('jwt_token'),
                'fileId': value
            }
        }
    }
});

