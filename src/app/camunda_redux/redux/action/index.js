import * as ProcessDefinitionActions from './camunda-rest/process-definition';
import * as TaskActions from './camunda-rest/task';
import * as InitiateActions from './backend-rest/initiate-data';
import * as FormDataAction from './backend-rest/form-data';

export const loadTasks = () => (dispatch, getState) => {
    return dispatch(TaskActions.fetchTasks())
};


export const chart1 = (groupName, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.chart1(groupName, sauId))
};

export const chart2 = (groupName, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.chart2(groupName, sauId))
};

export const getPersonalInfo = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.getPersonalInfo(values));
};

export const updatePersonalInfo = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.updatePersonalInfo(values));
};

export const loadTaskFormKey = (taskId) => (dispatch, getState) => {
    return dispatch(TaskActions.fetchTaskFormKey(taskId))
};

export const completeTask = (taskId, values) => (dispatch, getState) => {
    return dispatch(TaskActions.postCompleTask(taskId, values))
};

export const loadProcessDefinitions = (processDefinitionId) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchProcessDefinitions(processDefinitionId))
};

export const loadProcessDefinitionsWithXML = (processDefinitionId) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchProcessDefinitions(processDefinitionId)).then((data) => {
        data.response.result.forEach((id) => {
            dispatch(ProcessDefinitionActions.fetchProcessDefinitionXML(id))
        });

    })
};

export const loadProcessDefinitionXML = (processDefinitionId) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchProcessDefinitionXML(processDefinitionId))
};

export const loadFormKey = (processDefinitionKey) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.fetchFormKey(processDefinitionKey))
};

export const startProcessInstance = (processDefinitionKey, values) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.postProcessInstance(processDefinitionKey, values))
};

export const loadTaskVariables = (taskId, variableNames) => (dispatch, getState) => {
    return dispatch(TaskActions.fetchTaskVariables(taskId, variableNames))
};

export const loadClassificationData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getClassificationData())
};

export const loadTypesData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getTypeData())
};
export const loadFileTypesData = (role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getFileTypeData(role))
};

export const loadGroupsData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getGroupsData())
};

export const loadRolesData = () => (dispatch, getState) => {
    return dispatch(InitiateActions.getRolesData())
};

export const loadDraftData = (role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getDraftData(role))
};

export const loadOutboxData = (role, username) => (dispatch, getState) => {
    return dispatch(InitiateActions.getOutboxData(role, username))
};

export const loadInboxData = (role, username) => (dispatch, getState) => {
    return dispatch(InitiateActions.getInboxData(role, username))
};

export const loadEnclosureData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getEnclosureData(id))
};

export const loadNotingData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getNotingData(id))
};

export const downloadFile = (url) => (dispatch, getState) => {
    return dispatch(InitiateActions.getFileUrl(url))
};

export const createFormData = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.setCreateForm(values))
};

export const uploadEnclosure = (id, file, role, username) => (dispatch, getState) => {
    return dispatch(FormDataAction.uploadEnclosure(id, file, role, username))
};

export const uploadNoting = (id, file, role, username) => (dispatch, getState) => {
    return dispatch(FormDataAction.uploadNoting(id, file, role, username))
};

export const sendFile = (id, data, role) => (dispatch, getState) => {
    return dispatch(FormDataAction.sendFile(id, data, role))
};

export const loadInstanceVariables = (id) => (dispatch, getState) => {
    return dispatch(ProcessDefinitionActions.postProcessInstanceVariables(id))
};

export const loadSfdt = (url, username, id, role, dept) => (dispatch, getState) => {
    return dispatch(InitiateActions.getSfdt(url, username, id, role, dept))
};
export const personalFileFormData = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.createPersonalFileForm(values))
};
export const personalApplicationFormData = (values, role, grp) => (dispatch, getState) => {
    return dispatch(FormDataAction.createPersonalApplicationForm(values, role, grp))
};
export const loadPFData = (username, role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPF(username, role))
};

export const loadPFileData = (username, role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPFileData(username, role))
};
export const loadPATableData = (username, role) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPATableData(username, role))
};

export const quickSign = (value, role) => (dispatch, getState) => {
    return dispatch(FormDataAction.quickSign(value, role));
};

export const sendFiles = (id, data, role, username) => (dispatch, getState) => {
    return dispatch(FormDataAction.sendFiles(id, data, role, username))
};

export const saveDocument = (id, formData, role) => (dispatch, getState) => {
    return dispatch(FormDataAction.saveFiles(id, formData, role))
};

export const saveAnnotation = (values, id) => (dispatch, getState) => {
    return dispatch(FormDataAction.createAnnotation(values, id))
};

export const getAnnotation = (id) => (dispatch, getState) => {
    return dispatch(FormDataAction.getAnnotation(id))
};

export const uploadAnnexure = (personalAppId, file, role, username) => (dispatch, getState) => {
    return dispatch(FormDataAction.uploadAnnexure(personalAppId, file, role, username))
};

export const getGroupList = (value) => (dispatch, getState) => {
    return dispatch(FormDataAction.getGroupList(value))
};

export const getHrmListData = (value) => (dispatch, getState) => {
    return dispatch(FormDataAction.getHrmFileList(value))
};

export const loadAnnexureTableData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getAnnexureTableData(id))
};

export const loadUserRoleData = (department, userName) => (dispatch, getState) => {
    return dispatch(InitiateActions.getUserRolesData(department, userName))
};

export const getMISTableListSecret2 = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableDataSecret2(value, sauId))
};

export const getSauDataSecretWAC = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getSauDataSecretWAC(value, sauId))
};

export const getMISTableListSecretDashboard2 = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableDataSecretDashboard2(value, sauId))
};

export const getMISTableListSecret = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableDataSecret(value, sauId))
};

export const getMISTableListIncomingSecretWAC = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableListIncomingSecretWAC(value, sauId))
};

export const getMISTableListSecretDashboard = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableDataSecretDashboard(value, sauId))
};

export const getMISTableList = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableData(value, sauId))
};

export const getSauDataIncomingWAC = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getSauDataIncomingWAC(value, sauId))
};

export const getMISTableDashboard = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableDashboard(value, sauId))
};

export const getMISTableList2 = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableData2(value, sauId))
};

export const getSauDataWAC = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getSauDataWAC(value, sauId))
};

export const getMISTableDashboard2 = (value, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISTableDashboard2(value, sauId))
};
export const getMISDetailTableListSecret2 = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableDataSecret2(sau, column, num))
};

export const getMISDetailTableListSecretWAC = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableListSecretWAC(sau, column, num))
};

export const getMISDetailTableListSecret = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableDataSecret(sau, column, num))
};

export const getMISDetailTableListIncomingSecretWAC = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableListIncomingSecretWAC(sau, column, num))
};


export const getMISDetailTableList = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableData(sau, column, num))
};

export const getMISDetailTableListIncomingWAC = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableListIncomingWAC(sau, column, num))
};
export const getMISDetailTableList2 = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableData2(sau, column, num))
};

export const getMISDetailTableListWAC = (sau, column, num) => (dispatch, getState) => {
    return dispatch(InitiateActions.getMISDetailTableListWAC(sau, column, num))
};

export const deleteAnnexureData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.deleteAnnexureData(id))
};

export const createPANotingData = (id, role, groupName) => (dispatch, getState) => {
    return dispatch(InitiateActions.createPANotingData(id, role, groupName))
};

export const getPANotingData = (id) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPANotingData(id))
};

export const getPAEnclosureData = (ids, id, role, groupName) => (dispatch, getState) => {
    return dispatch(InitiateActions.getPAEnclosureData(ids, id, role, groupName))
};
export const getbyfilename = (values) => (dispatch, getState) => {
    return dispatch(FormDataAction.getbyfilename(values))
};

export const getCardDataMis1 = (groupName, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getCardDataMis1(groupName, sauId))
};

export const getCardDataMis2 = (groupName, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getCardDataMis2(groupName, sauId))
};

export const getCardDataSecret1 = (groupName, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getCardDataSecret1(groupName, sauId))
};

export const getCardDataSecret2 = (groupName, sauId) => (dispatch, getState) => {
    return dispatch(InitiateActions.getCardDataSecret2(groupName, sauId))
};