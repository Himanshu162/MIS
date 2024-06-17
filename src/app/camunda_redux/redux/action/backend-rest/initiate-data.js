import * as AT from '../../constants/ActionTypes'
import { BACK_API } from '../../../../middleware/backend';
import { BACK_API1 } from '../../../../middleware/backendPA';
import { BACKEND_API_MISS } from "../../../../middleware/backendMIS";
import { BACKEND_API_MISS2 } from "../../../../middleware/backendMIS2";
import { MIS_MICRO_SERVICES } from "../../../../middleware/MisMicroService";
import { BACKEND_API_MISS_SECRET } from "../../../../middleware/backendSecretMIS";
import { BACKEND_API_MISS_SECRET2 } from "../../../../middleware/backendSecretMIS2";
import localStorageService from "../../../../services/localStorageService";




export const chart1 = (groupName, sauId) => ({
    [BACKEND_API_MISS2]: {
        types: [AT.CHART1_REQUEST, AT.CHART1_SUCCESS, AT.CHART1_FAILURE],
        endpoint: `/api/getCauData`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'groupName': groupName,
                'sauId': sauId,
            }
        }
    }
});

export const chart2 = (groupName, sauId) => ({
    [BACKEND_API_MISS]: {
        types: [AT.CHART2_REQUEST, AT.CHART2_SUCCESS, AT.CHART2_FAILURE],
        endpoint: `/api/getCauData`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'groupName': groupName,
                'sauId': sauId,
            }
        }
    }
});

export const getClassificationData = () => ({
    [BACK_API]: {
        types: [AT.CLASSIFICATION_REQUEST, AT.CLASSIFICATION_SUCCESS, AT.CLASSIFICATION_FAILURE],
        endpoint: `/api/getFileClassification`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }
});

export const getTypeData = () => ({
    [BACK_API]: {
        types: [AT.TYPE_REQUEST, AT.TYPE_SUCCESS, AT.TYPE_FAILURE],
        endpoint: `/api/getFileType`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }
});

export const getRolesData = () => ({
    [BACK_API]: {
        types: [AT.ROLES_REQUEST, AT.ROLES_SUCCESS, AT.ROLES_FAILURE],
        endpoint: `/api/getRoles`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }
});

export const getUserRolesData = (department, userName) => ({
    [MIS_MICRO_SERVICES]: {
        // [BACKEND_API_MISS2]: {
        types: [AT.USER_ROLES_REQUEST, AT.USER_ROLES_SUCCESS, AT.USER_ROLES_FAILURE],
        endpoint: `/apis/getUserRoles`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'groupName': department,
                'username': userName,
            }
        }
    }

});

export const getGroupsData = () => ({
    [BACK_API]: {
        types: [AT.GROUPS_REQUEST, AT.GROUPS_SUCCESS, AT.GROUPS_FAILURE],
        endpoint: `/api/getGroups`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getDraftData = (role) => ({
    [BACK_API]: {
        types: [AT.DRAFT_DATA_FAILURE, AT.DRAFT_DATA_SUCCESS, AT.DRAFT_DATA_REQUEST],
        endpoint: `/api/getDraftData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role
            }
        }
    }

});

export const getOutboxData = (role, username) => ({
    [BACK_API]: {
        types: [AT.OUTBOX_DATA_FAILURE, AT.OUTBOX_DATA_REQUEST, AT.OUTBOX_DATA_SUCCESS],
        endpoint: `/api/getOutboxData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username
            }
        }
    }

});

export const getInboxData = (role, username) => ({
    [BACK_API]: {
        types: [AT.INBOX_DATA_FAILURE, AT.INBOX_DATA_REQUEST, AT.INBOX_DATA_SUCCESS],
        endpoint: `/api/getInboxData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'userName': username
            }
        }
    }

});

export const getEnclosureData = (id) => ({
    [BACK_API]: {
        types: [AT.ENCLOSURE_DATA_FAILURE, AT.ENCLOSURE_DATA_REQUEST, AT.ENCLOSURE_DATA_SUCCESS],
        endpoint: `/api/enclosure/data/` + id,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});


export const getNotingData = (id) => ({
    [BACK_API]: {
        types: [AT.NOTING_DATA_FAILURE, AT.NOTING_DATA_REQUEST, AT.NOTING_DATA_SUCCESS],
        endpoint: `/api/noting/data/` + id,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getFileUrl = (url) => ({
    [BACK_API]: {
        types: [AT.FILE_FAILURE, AT.FILE_REQUEST, AT.FILE_SUCCESS],
        endpoint: `/api/fileUrl`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'url': url
            }
        }
    }

});

export const getSfdt = (url, username, id, role, grp) => ({
    [BACK_API]: {
        types: [AT.SFDT_FAILURE, AT.SFDT_REQUEST, AT.SFDT_SUCCESS],
        endpoint: `/api/sfdt`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'url': url,
                'userName': username,
                'fileId': id,
                'roleName': role,
                'groupName': grp
            }
        }
    }

});

export const getFileTypeData = () => ({
    [BACK_API]: {
        types: [AT.PATYPE_REQUEST, AT.PATYPE_SUCCESS, AT.PATYPE_FAILURE],
        endpoint: `/api/getPersonalFileType`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

export const getPF = (username, role) => ({
    [BACK_API]: {
        types: [AT.PF_REQUEST, AT.PF_SUCCESS, AT.PF_FAILURE],
        endpoint: `/api/getPersonalFile`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role
            }
        }
    }

});

export const getPFileData = (username, role) => ({
    [BACK_API]: {
        types: [AT.PFILE_REQUEST, AT.PFILE_SUCCESS, AT.PFILE_FAILURE],
        endpoint: `/api/getPFile`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role
            }
        }
    }

});

export const getPATableData = (username, role) => ({
    [BACK_API]: {
        types: [AT.PA_TABLE_REQUEST, AT.PA_TABLE_SUCCESS, AT.PA_TABLE_FAILURE],
        endpoint: `/api/getPersonalApplicationData`,
        settings: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'userName': username,
                'roleName': role
            }
        }
    }

});

export const getAnnexureTableData = (id) => ({
    [BACK_API]: {
        types: [AT.ANNEXURE_LIST_REQUEST, AT.ANNEXURE_LIST_SUCCESS, AT.ANNEXURE_LIST_FAILURE],
        endpoint: `/api/getAnnexureData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }

});

// export const getMISTableData = (value) => ({
//     [BACKEND_API_MISS]: {
//         types: [ AT.MIS_LIST_REQUEST, AT.MIS_LIST_SUCCESS, AT.MIS_LIST_FAILURE ],
//         endpoint: `/api/gethierarchyParent1List`,
//         settings: {
//             method: 'POST',
//             body: value,
//             headers: { }
//         }
//     }
//
// });
export const getMISTableData2 = (value, sauId) => ({
    [BACKEND_API_MISS2]: {
        types: [AT.MIS_LIST_REQUEST1, AT.MIS_LIST_SUCCESS1, AT.MIS_LIST_FAILURE1],
        endpoint: `/api/getSauData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getSauDataWAC = (value, sauId) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.WAC_REQUEST, AT.WAC_SUCCESS, AT.WAC_FAILURE],
        endpoint: `/api/getSauDataWAC`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getMISTableDataSecret = (value, sauId) => ({
    [BACKEND_API_MISS_SECRET]: {
        types: [AT.MIS_LIST_REQUEST2, AT.MIS_LIST_SUCCESS2, AT.MIS_LIST_FAILURE2],
        endpoint: `/api/getSauData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getMISTableListIncomingSecretWAC = (value, sauId) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.MIS_LIST_INCOMING_SECRET_WAC_REQUEST, AT.MIS_LIST_INCOMING_SECRET_WAC_SUCCESS, AT.MIS_LIST_INCOMING_SECRET_WAC_FAILURE],
        endpoint: `/api/getSauDataSecretIncomingWAC`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});
export const getMISTableDataSecretDashboard = (value, sauId) => ({
    [BACKEND_API_MISS_SECRET]: {
        types: [AT.MIS_LIST_REQUEST2, AT.MIS_LIST_SUCCESS2, AT.MIS_LIST_FAILURE2],
        endpoint: `/api/getMainData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});
export const getMISTableDataSecret2 = (value, sauId) => ({
    [BACKEND_API_MISS_SECRET2]: {
        types: [AT.MIS_LIST_REQUEST3, AT.MIS_LIST_SUCCESS3, AT.MIS_LIST_FAILURE3],
        endpoint: `/api/getSauData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getSauDataSecretWAC = (value, sauId) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.MIS_LIST_SECRET_REQUEST, AT.MIS_LIST_SECRET__SUCCESS, AT.MIS_LIST_SECRET__FAILURE],
        endpoint: `/api/getSauDataSecretWAC`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getMISTableDataSecretDashboard2 = (value, sauId) => ({
    [BACKEND_API_MISS_SECRET2]: {
        types: [AT.MIS_LIST_REQUEST3, AT.MIS_LIST_SUCCESS3, AT.MIS_LIST_FAILURE3],
        endpoint: `/api/getMainData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getMISTableData = (value, sauId) => ({
    [BACKEND_API_MISS]: {
        types: [AT.MIS_LIST_REQUEST, AT.MIS_LIST_SUCCESS, AT.MIS_LIST_FAILURE],
        endpoint: `/api/getSauData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getSauDataIncomingWAC = (value, sauId) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.INCOMING_WAC_REQUEST, AT.INCOMING_WAC_SUCCESS, AT.INCOMING_WAC_FAILURE],
        endpoint: `/api/getSauDataIncomingWAC`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});


export const getMISTableDashboard = (value, sauId) => ({
    [BACKEND_API_MISS]: {
        types: [AT.MIS_LIST_REQUEST, AT.MIS_LIST_SUCCESS, AT.MIS_LIST_FAILURE],
        endpoint: `/api/getMainData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getMISTableDashboard2 = (value, sauId) => ({
    [BACKEND_API_MISS2]: {
        types: [AT.MIS_LIST_REQUEST, AT.MIS_LIST_SUCCESS, AT.MIS_LIST_FAILURE],
        endpoint: `/api/getMainData`,
        settings: {
            method: 'GET',
            headers: {
                groupName: value,
                sauId: sauId
            }
        }
    }
});

export const getCardDataMis2 = (groupName, sauId) => ({
    [BACKEND_API_MISS]: {
        types: [AT.FETCH_CARD_MIS2_REQUEST, AT.FETCH_CARD_MIS2_SUCCESS, AT.FETCH_CARD_MIS2_FAILURE],
        endpoint: `/api/getDeptData`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'groupName': groupName,
                'sauid': sauId,
            }
        }
    }
});

export const getMISDetailTableData = (sau, column, num) => ({
    [BACKEND_API_MISS]: {
        types: [AT.MIS_DETAIL_LIST_REQUEST, AT.MIS_DETAIL_LIST_SUCCESS, AT.MIS_DETAIL_LIST_FAILURE],
        endpoint: `/api/gettotalfiles?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }

});

export const getMISDetailTableListIncomingWAC = (sau, column, num) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.MIS_DETAIL_LIST_INCOMING_WAC_REQUEST, AT.MIS_DETAIL_LIST_INCOMING_WAC_SUCCESS, AT.MIS_DETAIL_LIST_INCOMING_WAC_FAILURE],
        endpoint: `/api/gettotalfilesIncomingWAC?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }

});


export const getCardDataMis1 = (groupName, sauId) => ({
    [BACKEND_API_MISS2]: {
        types: [AT.FETCH_CARD_MIS1_REQUEST, AT.FETCH_CARD_MIS1_SUCCESS, AT.FETCH_CARD_MIS1_FAILURE],
        endpoint: `/api/getDeptData`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'groupName': groupName,
                'sauid': sauId,
            }
        }
    }
});



export const getCardDataSecret1 = (groupName, sauId) => ({
    [BACKEND_API_MISS_SECRET]: {
        types: [AT.FETCH_CARD_SECRET1_REQUEST, AT.FETCH_CARD_SECRET1_SUCCESS, AT.FETCH_CARD_SECRET1_FAILURE],
        endpoint: `/api/getDeptData`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'groupName': groupName,
                'sauid': sauId,
            }
        }
    }
});

export const getMISDetailTableDataSecret = (sau, column, num) => ({
    [BACKEND_API_MISS_SECRET]: {
        types: [AT.MIS_DETAIL_LIST_REQUEST2, AT.MIS_DETAIL_LIST_SUCCESS2, AT.MIS_DETAIL_LIST_FAILURE2],
        endpoint: `/api/gettotalfiles?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }
});

export const getMISDetailTableListIncomingSecretWAC = (sau, column, num) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.MIS_DETAIL_LIST_INCOMING_SECRET_REQUEST, AT.MIS_DETAIL_LIST_INCOMING_SECRET_SUCCESS, AT.MIS_DETAIL_LIST_INCOMING_SECRET_FAILURE],
        endpoint: `/api/gettotalfilesSecretIncomingWAC?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }
});

export const getCardDataSecret2 = (groupName, sauId) => ({
    [BACKEND_API_MISS_SECRET2]: {
        types: [AT.FETCH_CARD_SECRET2_REQUEST, AT.FETCH_CARD_SECRET2_SUCCESS, AT.FETCH_CARD_SECRET2_FAILURE],
        endpoint: `/api/getDeptData`,
        settings: {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'groupName': groupName,
                'sauid': sauId,
            }
        }
    }
});

export const getMISDetailTableDataSecret2 = (sau, column, num) => ({
    [BACKEND_API_MISS_SECRET2]: {
        types: [AT.MIS_DETAIL_LIST_REQUEST3, AT.MIS_DETAIL_LIST_SUCCESS3, AT.MIS_DETAIL_LIST_FAILURE3],
        endpoint: `/api/gettotalfiles?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }
});

export const getMISDetailTableListSecretWAC = (sau, column, num) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.MIS_DETAIL_LIST_SECRET_WAC_REQUEST, AT.MIS_DETAIL_LIST_SECRET_WAC_SUCCESS, AT.MIS_DETAIL_LIST_SECRET_WAC_FAILURE],
        endpoint: `/api/gettotalfilesWAC?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }
});

export const getMISDetailTableData2 = (sau, column, num) => ({
    [BACKEND_API_MISS2]: {
        types: [AT.MIS_DETAIL_LIST_REQUEST1, AT.MIS_DETAIL_LIST_SUCCESS1, AT.MIS_DETAIL_LIST_FAILURE1],
        endpoint: `/api/gettotalfiles?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }

});

export const getMISDetailTableListWAC = (sau, column, num) => ({
    [MIS_MICRO_SERVICES]: {
        types: [AT.MIS_DETAIL_LIST_WAC_REQUEST, AT.MIS_DETAIL_LIST_WAC_SUCCESS, AT.MIS_DETAIL_LIST_WAC_FAILURE],
        endpoint: `/api/gettotalfilesSecretWAC?sau=${sau}&column=${column}&num=${num}`,
        settings: {
            method: 'POST',
            body: '',
            headers: {}
        }
    }

});

export const deleteAnnexureData = (id) => ({
    [BACK_API]: {
        types: [AT.DELETE_ANNEXURE_REQUEST, AT.DELETE_ANNEXURE_SUCCESS, AT.DELETE_ANNEXURE_FAILURE],
        endpoint: `/api/deleteAnnexureData/` + id,
        settings: {
            method: 'POST',
        }
    }
});

export const createPANotingData = (id, role, groupName) => ({
    [BACK_API]: {
        types: [AT.CREATE_PANOTING_REQUEST, AT.CREATE_PANOTING_SUCCESS, AT.CREATE_PANOTING_FAILURE],
        endpoint: `/api/createPANotingData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'grp': groupName
            }
        }
    }
});

export const getPANotingData = (id) => ({
    [BACK_API]: {
        types: [AT.FETCH_PANOTING_REQUEST, AT.FETCH_PANOTING_SUCCESS, AT.FETCH_PANOTING_FAILURE],
        endpoint: `/api/getPANotingData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            }
        }
    }
});

export const getPAEnclosureData = (ids, id, role, groupName) => ({
    [BACK_API]: {
        types: [AT.FETCH_PAENCLOSURE_REQUEST, AT.FETCH_PAENCLOSURE_SUCCESS, AT.FETCH_PAENCLOSURE_FAILURE],
        endpoint: `/api/getPAEnclosureData/` + id,
        settings: {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token'),
                'roleName': role,
                'inboxId': ids,
                'grp': groupName
            }
        }
    }
});