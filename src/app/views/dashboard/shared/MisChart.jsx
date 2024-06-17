import React, { useEffect, useState } from "react";
import {
    Grid as DevTable,
    Table,
    TableHeaderRow,
    TableTreeColumn,
    Toolbar,
    TableFilterRow,
    TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';
import { Card, Grid, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import { CustomTreeData, TreeDataState, FilteringState, SortingState, IntegratedFiltering, IntegratedSorting } from "@devexpress/dx-react-grid";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from "react-redux";
import {
    getMISTableDashboard,
    getMISTableDashboard2,
    getMISTableListSecretDashboard,
    getMISTableListSecretDashboard2,
    getCardDataMis2,
    getCardDataSecret2,
    getCardDataMis1,
} from "../../../camunda_redux/redux/action";
import { Loading } from '../therme-source/material-ui/loading';
import { Plugin, Template } from "@devexpress/dx-react-core";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import DoughnutChart from './Doughnut';
import { makeStyles } from '@material-ui/core/styles';
import { setLoadData } from "../../../redux/actions/LoadingActions";
import Breadcrumb from "../../../../matx/components/Breadcrumb";
import '../therme-source/material-ui/loading.css';

const styles = theme => ({
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: fade(theme.palette.primary.main, 0.10),
        },
        customRow: {
            '&:hover': {
                backgroundColor: fade(theme.palette.primary.main, 0.50),
            }
        },
    },
});


const chartStyle = makeStyles({
    chartBox: {
        display: 'flex'
    },
    chartBoxwidth: {
        '& div': {
            width: '100%'
        }
    }
});

const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
    />
);
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
const HeaderCellComponent = props => (
    <TableHeaderRow.Cell
        {...props}
        style={{
            fontSize: '14px',
            fontWeight: 900,
        }}
        className={"headingTable"}
    />
);

const MisChart = (props) => {
    const { setSelectionMode, setHeaderText, setLoad, loader } = props;
    const classes = chartStyle();
    const { loadsVal } = props;
    const dispatch = useDispatch();
    const columns = [
        { name: 'sauDisplayName', title: 'BRANCH/DIRECTORATE' },
        { name: 'totalSau', title: 'TOTAL FILES' },
        // { name: 'totalFilesPendingThreeSeven', title: 'PENDING FILES \n(> 3 & <= 7) Days' },
        // { name: 'totalFilesPendingSeven', title: 'PENDING FILES \n > 7 Days' },
        // { name: 'totalCorrespondenceInbox', title: 'TOTAL CORRESPONDENCE FILES' },
        // { name: 'totalCorrespondencePendingThreeSeven', title: 'CORRESPONDENCE FILES \n (> 3 & <= 7) DAYS' },
        // { name: 'totalCorrespondencePendingSeven', title: 'CORRESPONDENCE FILES \n > 7 DAYS' },

        { name: 'totalFilesPendingFiveTenSau', title: '5 - 10' },
        { name: 'totalFileProcessedTenDaysSau', title: '> 10' },
        { name: 'totalFilesPendingFiveTenCau', title: '5 - 10' },
        { name: 'totalFileProcessedTenDaysCau', title: '> 10' },
    ];

    const getChildRows = (row, rootRows) => {
        const childRows = rootRows.filter(r => r.parentId === (row ? row.fileId : null));
        return childRows.length ? childRows : null;
    };

    const [rowData, setRowData] = useState([]);
    const [sauData, setSauData] = useState([]);
    let [ID, setID] = useState([1]);
    const [loading, setLoading] = useState(false);
    const [barGrid, setBargrid] = useState({ barChartSize: 12, showMisTable: false, barSize: '250px' });
    const [dataArr, setDataArr] = useState([]);
    const [corresArr, setCorresArr] = useState([]);

    const [dataArr1, setDataArr1] = useState([]);
    const [corresArr1, setCorresArr1] = useState([]);

    const [dataArr2, setDataArr2] = useState([]);
    const [corresArr2, setCorresArr2] = useState([]);

    const [dataArr3, setDataArr3] = useState([]);
    const [corresArr3, setCorresArr3] = useState([]);
    const [blnShowClose, setBlnShowClose] = useState(false);
    const [chartDetailShow, setchartDetailShow] = useState(true);
    const [blnHideCorresDiv, setBlnHideCorresDiv] = useState(false);

    const sauId = 0

    useEffect(() => {

        if (loader.isLoading === false) {
            setLoading(loader.isLoading);
        }

    }, [loader.isLoading]);

    let groupName = sessionStorage.getItem("department");

    // My Files Unclassified
    useEffect(() => {
        let newArr = []
        let total = 0
        let newCorresArr = []
        let corresTotal = 0

        if (loadsVal === false) { setLoading(false); }
        setLoading(true);
        // props.getMISTableDashboard2 getCardDataMis2
        props.getMISTableDashboard2(groupName, sauId).then((resp) => {
            console.log("responseDashboard2 :", resp);
            let tmpArr = [];
            try {
                if (resp !== undefined) {
                    setDataArr((resp.data.map(x => ({ 'value': x.totalSau, 'name': x.sauDisplayName, 'label': `Total Inbox Files : ${x.totalSau}`, 'rowID': x.sauId }))))
                    setLoading(false);

                } else {
                    setLoading(false);
                    const errorMessage = resp.data.status + " : " + resp.data.error + " AT " + resp.data.path
                    callMessageOut(errorMessage);
                }
            }
            catch (e) {
                setLoading(false);
                callMessageOut(e.message);
            }
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, [groupName]);
    // Incoming Files Unclassified
    useEffect(() => {
        let newArr = []
        let total = 0
        let newCorresArr = []
        let corresTotal = 0

        if (loadsVal === false) { setLoading(false); }
        setLoading(true);
        // props.getMISTableDashboard getCardDataMis1
        props.getMISTableDashboard(groupName, sauId).then((resp) => {
            let tmpArr = [];
            console.log("resp : ", resp)
            try {
                if (resp !== undefined) {

                    setDataArr1((resp.data.map(x => ({ 'value': x.totalSau, 'name': x.sauDisplayName, 'label': `Total Inbox Files : ${x.totalSau}`, 'rowID': x.sauId }))))

                    setLoading(false);

                } else {
                    setLoading(false);
                    const errorMessage = resp.data.status + " : " + resp.data.error + " AT " + resp.data.path
                    callMessageOut(errorMessage);
                }
            }
            catch (e) {
                setLoading(false);
                callMessageOut(e.message);
            }
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, [groupName]);
    // Incoming Secret
    useEffect(() => {
        let newArr = []
        let total = 0
        let newCorresArr = []
        let corresTotal = 0
        setLoading(true);
        // props.getMISTableListSecretDashboard getCardDataSecret2
        props.getMISTableListSecretDashboard(groupName, sauId).then((resp) => {
            console.log("resp : ", resp)
            let tmpArr = [];
            try {
                if (resp !== undefined) {
                    setDataArr2((resp.data.map(x => ({ 'value': x.totalSau, 'name': x.sauDisplayName, 'label': `Total Inbox Files : ${x.totalSau}`, 'rowID': x.sauId }))))
                    setLoading(false);

                } else {
                    setLoading(false);
                    const errorMessage = resp.data.status + " : " + resp.data.error + " AT " + resp.data.path
                    callMessageOut(errorMessage);
                }
            }
            catch (e) {
                setLoading(false);
                callMessageOut(e.message);
            }
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, [groupName]);
    // My Files Secret
    useEffect(() => {
        let newArr = []
        let total = 0
        setLoading(true);
        props.getMISTableListSecretDashboard2(groupName, sauId).then((resp) => {
            console.log("resp : ", resp)
            let tmpArr = [];
            try {
                if (resp !== undefined) {
                    // tmpArr = resp;

                    // const FileId = tmpArr.filter(x => x.parentId === null).map(item => item.fileId)
                    // console.log(FileId)
                    // for (let x = 0; x < tmpArr.length; x++) {
                    //     if (FileId[0] === tmpArr[x].parentId && tmpArr[x].totalFileInbox >= 0) {
                    //         newArr.push(tmpArr[x])
                    //     }
                    // }
                    // newArr.map(i => total = i.totalFileInbox + total)
                    setDataArr3((resp.data.map(x => ({ 'value': x.totalSau, 'name': x.sauDisplayName, 'label': `Total Inbox Files : ${x.totalSau}`, 'rowID': x.sauId }))))
                    setLoading(false);

                } else {
                    setLoading(false);
                    const errorMessage = resp.data.status + " : " + resp.data.error + " AT " + resp.data.path
                    callMessageOut(errorMessage);
                }
            }
            catch (e) {
                setLoading(false);
                callMessageOut(e.message);
            }
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, [groupName]);




    return (
        <>


            <Grid container>
                <Grid item xs={6}>
                    <DoughnutChart
                        height={barGrid.barSize}
                        color={[
                            '#1395ba',
                            '#0d3c55',
                            '#c02e1d',
                            '#f16c20',
                            '#ebc844',
                            '#a2b86c'
                        ]}
                        data={dataArr}
                        // onClickBar={handleClickBar}
                        blnShowLengend={chartDetailShow}
                        barTitle='Unclassified File Report'
                    />
                </Grid>
                <Grid item xs={6}>
                    <DoughnutChart
                        height={barGrid.barSize}
                        color={[
                            '#1395ba',
                            '#0d3c55',
                            '#c02e1d',
                            '#f16c20',
                            '#ebc844',
                            '#a2b86c'
                        ]}
                        data={dataArr3}
                        // onClickBar={handleClickBar}
                        blnShowLengend={chartDetailShow}
                        barTitle='Secret File Report'
                    />
                </Grid>
            </Grid>
            {loading && <Loading />}
        </>
    );
};


function mapStateToProps(state) {

    return {
        props: state.props,
        loader: state.loader
    };
}

export default connect(mapStateToProps, { setLoadData, getCardDataMis2, getCardDataSecret2, getCardDataMis1, getMISTableDashboard, getMISTableDashboard2, getMISTableListSecretDashboard, getMISTableListSecretDashboard2 })(MisChart);
