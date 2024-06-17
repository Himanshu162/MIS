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

const MisTableChartOld = (props) => {
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
            debugger
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


    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }

    const [tableColumnExtensions] = useState([
        // { columnName: 'sauDisplayName', align: 'left' },
        // { columnName: 'totalSau', align: 'center' },
        // { columnName: 'totalCorrespondenceInbox', align: 'center', wordWrapEnabled: true },
        // { columnName: 'totalFilesPendingThreeSeven', align: 'center', wordWrapEnabled: true },
        // { columnName: 'totalCorrespondencePendingThreeSeven', align: 'center', wordWrapEnabled: true },
        // { columnName: 'totalFilesPendingSeven', align: 'center', wordWrapEnabled: true },
        // { columnName: 'totalCorrespondencePendingSeven', align: 'center', wordWrapEnabled: true },

        { columnName: 'sauDisplayName', align: 'left' },
        { columnName: 'totalSau', align: 'left' },
        { columnName: 'totalFileProcessedTenDaysCau', align: 'left' },
        { columnName: 'totalFileProcessedTenDaysSau', align: 'left' },
        { columnName: 'totalFilesPendingFiveTenCau', align: 'left' },
        { columnName: 'totalFilesPendingFiveTenSau', align: 'left' },
    ]);

    const HighlightedCell = ({ column, value, row, style, ...restProps }) => (
        <Table.Cell{...restProps} style={{ cursor: 'pointer', ...style, }} onClick={(e) => handleClick(e, value, column, row)}>
            <span style={{ color: 'blue', textDecoration: 'underline' }}>{value}</span>
        </Table.Cell>
    );

    const Cell = (props) => {
        // const { column, row } = props;
        // if (row.totalSau > 0 && column.name === "totalSau") {
        //     return <HighlightedCell {...props} />;
        // }
        // if (row.totalFilesPendingThreeSeven > 0 && column.name === "totalFilesPendingThreeSeven") {
        //     return <HighlightedCell {...props} />;
        // }
        // if (row.totalFilesPendingSeven > 0 && column.name === "totalFilesPendingSeven") {
        //     return <HighlightedCell {...props} />;
        // }
        // if (row.totalCorrespondenceInbox > 0 && column.name === "totalCorrespondenceInbox") {
        //     return <HighlightedCell {...props} />;
        // }
        // if (row.totalCorrespondencePendingSeven > 0 && column.name === "totalCorrespondencePendingSeven") {
        //     return <HighlightedCell {...props} />;
        // }
        // if (row.totalCorrespondencePendingThreeSeven > 0 && column.name === "totalCorrespondencePendingThreeSeven") {
        //     return <HighlightedCell {...props} />;
        // }
        // return <Table.Cell {...props} />;

        const { column, row } = props;
        if (row.totalSau > 0 && column.name === "totalSau") {
            return <HighlightedCell {...props} />;
        }
        if (row.totalFileProcessedTenDaysCau > 0 && column.name === "totalFileProcessedTenDaysCau") {
            return <HighlightedCell {...props} />;
        }
        if (row.totalFileProcessedTenDaysSau > 0 && column.name === "totalFileProcessedTenDaysSau") {
            return <HighlightedCell {...props} />;
        }
        if (row.totalFilesPendingFiveTenCau > 0 && column.name === "totalFilesPendingFiveTenCau") {
            return <HighlightedCell {...props} />;
        }
        if (row.totalFilesPendingFiveTenSau > 0 && column.name === "totalFilesPendingFiveTenSau") {
            return <HighlightedCell {...props} />;
        }
        return <Table.Cell {...props} />;
    };

    const handleClick = (e, value, column, row) => {
        // let data;
        // setSelectionMode(false);
        // // setLoading(true);
        // switch (column.name) {
        //     case "totalSau":
        //         data = `TOTAL FILES IN ${row.sauBranch} - ${value} `;
        //         break;
        //     case "totalFilesPendingThreeSeven":
        //         data = `PENDING FILES (> 3 & <= 7) DAYS IN ${row.sauBranch} - ${value}`;
        //         break;
        //     case "totalFilesPendingSeven":
        //         data = `PENDING FILES > 7 DAYS IN ${row.sauBranch} - ${value}`;
        //         break;
        //     case "totalCorrespondenceInbox":
        //         data = `TOTAL CORRESPONDENCE IN ${row.sauBranch} - ${value} `;
        //         break;
        //     case "totalCorrespondencePendingThreeSeven":
        //         data = `PENDING CORRESPONDENCE (> 3 & <= 7) DAYS IN ${row.sauBranch} - ${value}`;
        //         break;
        //     case "totalCorrespondencePendingSeven":
        //         data = `PENDING CORRESPONDENCE > 7 DAYS IN ${row.sauBranch} - ${value}`;
        //         break;
        //     default:
        //         data = `${row.sauBranch}`;

        // }

        // setHeaderText({ "Data": data, "ColumnName": column.name, "Value": value, "SAU": row.sauBranch });
        // setTimeout(
        //     () => { setSelectionMode(true); },
        //     5000
        // );

        let data;
        setSelectionMode(false);
        // setLoading(true);
        switch (column.name) {
            case "totalSau":
                data = `TOTAL FILES IN ${row.sauDisplayName} - ${value} `;
                break;
            case "totalFileProcessedTenDaysCau":
                data = `PENDING FILES UNDER (> 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFileProcessedTenDaysSau":
                data = `PENDING FILES AT (> 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFilesPendingFiveTenCau":
                data = `PENDING FILES UNDER (5 - 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFilesPendingFiveTenSau":
                data = `PENDING FILES AT (5 - 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            default:
                data = `${row.sauDisplayName}`;

        }

        setHeaderText({ "Data": data, "ColumnName": column.name, "Value": value, "SAU": row.sauBranch });
        setTimeout(
            () => { setSelectionMode(true); },
            5000
        );
    };

    const [defaultColumnWidths] = useState([
        // { columnName: 'sauDisplayName', width: 600 },
        // { columnName: 'totalSau', width: 200 },
        // { columnName: 'totalCorrespondenceInbox', width: 200 },
        // { columnName: 'totalFilesPendingThreeSeven', width: 200 },
        // { columnName: 'totalCorrespondencePendingThreeSeven', width: 200 },
        // { columnName: 'totalFilesPendingSeven', width: 200 },
        // { columnName: 'totalCorrespondencePendingSeven', width: 200 },

        { columnName: 'sauDisplayName', width: 300 },
        { columnName: 'totalSau', width: 150 },
        { columnName: 'totalFileProcessedTenDaysCau', width: 150 },
        { columnName: 'totalFileProcessedTenDaysSau', width: 150 },
        { columnName: 'totalFilesPendingFiveTenCau', width: 150 },
        { columnName: 'totalFilesPendingFiveTenSau', width: 150 },
    ]);

    const getRowId = row => row.indexId;

    const TableRow = ({ row, ...restProps }) => (
        <Table.Row
            className={styles.customRow}
            {...restProps}
            {... { hover: true }}
        />
    );
    let arr1 = []
    let tempArr = []

    const CustomToolbarMarkup = () => ( // Custom table header of table
        <Plugin name="customToolbarMarkup">
            <Template name="toolbarContent">
                <Typography variant='button' color='primary' style={{ fontSize: '20px' }}>Section</Typography>
            </Template>
        </Plugin>
    );
    const handleClickBar = (val) => {
        setchartDetailShow(true)
        classes.chartBox = 'block';
        if (val.boolVal) {
            // let ID = rowData.filter(x => val.rowID === x.indexId).map(row => row.fileId)
            // setSauData([])
            // arr1 = []
            // let temp1 = []
            // tempArr = JSON.parse(JSON.stringify(rowData));
            // temp1 = tempArr.filter(item => item.fileId === ID[0]);
            // temp1[0].parentId = null
            // arr1.push(...temp1)
            // loadData(...ID)
            setTimeout(
                () => {
                    setBargrid({ barChartSize: 2, showMisTable: true, barSize: '250px' })
                    setBlnShowClose(true)
                },
                200)

        }
    }
    const loadData = (fileID) => {
        for (let a = 0; a < rowData.length; a++) {

            if (fileID === rowData[a].parentId) {
                arr1.push(rowData[a])
                setSauData(arr1)
                loadData(rowData[a].fileId)
            }

        }
    }

    return (
        <>
            {/* <Grid container direction={'row'} justifyContent="center"
                  alignItems="center">
                <Grid item xs={12} style={{textAlign:'center'}}>
                    <Typography variant='button' color='primary' className="headDash" style={{fontSize:'20px'}}>MIS Analysis</Typography>
                </Grid>
            </Grid> */}
            {/* <Breadcrumb
                routeSegments={[
                    { name: "My Files" }
                ]}
            /> */}
            <Grid container direction={'row'}>
                <Grid item sm={6} xs={12}>
                    <Card className='cardParent' elevation={5}>
                        <h2>My Files</h2>
                        <Grid container direction={'row'}>
                            <Grid item xs={12}>
                                <Card className='cardMargin' elevation={5}>

                                    <div className={`${classes.chartBox} ${classes.chartBoxwidth}`}>
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
                                            onClickBar={handleClickBar}
                                            blnShowLengend={chartDetailShow}
                                            barTitle='Unclassified File Report'
                                        />
                                    </div>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card className='cardMargin' elevation={5}>
                                    <div className={` ${classes.chartBox} ${classes.chartBoxwidth}`}>
                                        <div hidden={blnHideCorresDiv}>
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
                                                onClickBar={handleClickBar}
                                                blnShowLengend={chartDetailShow}
                                                barTitle='Secret File Report'
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                {/* <Breadcrumb
                routeSegments={[
                    { name: "Incoming" }
                ]}
            /> */}
                <Grid item sm={6} xs={12}>
                    <Card className='cardParent' elevation={5}>
                        <h2>Incoming</h2>
                        <Grid container direction={'row'}>
                            <Grid item xs={12}>
                                <Card className='cardMargin' elevation={5}>
                                    <div className={`${classes.chartBox} ${classes.chartBoxwidth}`}>
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
                                            data={dataArr1}
                                            onClickBar={handleClickBar}
                                            blnShowLengend={chartDetailShow}
                                            barTitle='Unclassified File Report'
                                        />
                                    </div>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card className='cardMargin' elevation={5}>
                                    <div className={` ${classes.chartBox} ${classes.chartBoxwidth}`}>
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
                                            data={dataArr2}
                                            onClickBar={handleClickBar}
                                            blnShowLengend={chartDetailShow}
                                            barTitle='Secret File Report'
                                        />
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                <Grid container direction={'column'}>
                    <Grid item xs={12} hidden={true}>
                        <Card className="px-24 py-16 mb-16 table-height-vh">
                            <DevTable rows={rowData} columns={columns} getRowId={getRowId} >
                                <TreeDataState defaultExpandedRowIds={ID} />
                                <FilteringState />
                                <SortingState />
                                <CustomTreeData getChildRows={getChildRows} />
                                <IntegratedFiltering />
                                <IntegratedSorting />
                                <Table tableComponent={TableComponent} cellComponent={Cell} rowComponent={TableRow} columnExtensions={tableColumnExtensions} />
                                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                                <TableHeaderRow cellComponent={HeaderCellComponent} showSortingControls />
                                <TableFilterRow />
                                <TableTreeColumn for="sauDisplayName" />
                            </DevTable>
                        </Card>
                    </Grid>
                    {loading && <Loading />}
                </Grid>
            </Grid>
        </>
    );
};


function mapStateToProps(state) {

    return {
        props: state.props,
        loader: state.loader
    };
}

export default connect(mapStateToProps, { setLoadData, getCardDataMis2, getCardDataSecret2, getCardDataMis1, getMISTableDashboard, getMISTableDashboard2, getMISTableListSecretDashboard, getMISTableListSecretDashboard2 })(MisTableChartOld);
