import React, { useEffect, useState } from "react";
import {
    Grid as DevTable,
    Table,
    TableHeaderRow,
    TableTreeColumn,
    Toolbar,
    TableFilterRow,
    TableBandHeader,
    VirtualTable,
    TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';
import { Card, Grid, IconButton, Paper, Tooltip, Typography, AppBar, Tabs, Tab, Box, Button } from "@material-ui/core";
import { CustomTreeData, TreeDataState, FilteringState, SortingState, RowDetailState, IntegratedFiltering, IntegratedSorting } from "@devexpress/dx-react-grid";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from "react-redux";
import { getMISTableList, getMISTableListSecret2, getSauDataSecretWAC } from "../../../camunda_redux/redux/action";
import { Loading } from '../therme-source/material-ui/loading';
import { Plugin, Template } from "@devexpress/dx-react-core";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import DoughnutChart from './Doughnut';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { makeStyles } from '@material-ui/core/styles';
import '../therme-source/material-ui/loading.css'

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
    },
    tabPanelPadding: {
        '& > div': {
            padding: '0px',
            paddingTop: '10px'
        }
    }
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
        style={{
            textAlign: 'center',
        }}
    />
);
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
const HeaderCellComponent = props => (
    <TableHeaderRow.Cell
        {...props}
        style={{
            fontSize: '14px',
            fontWeight: 900,
            borderRight: '1px solid #e0e0e0',
            textAlign: 'center',
        }}
        className={"headingTable"}
    />
);

const HeaderCellBand = props => (
    <TableHeaderRow.Cell
        {...props}
        style={{
            fontSize: '14px',
            fontWeight: 900,
            borderRight: '1px solid #e0e0e0',
            textAlign: 'center',
        }}
        className={"headingTable bandTableHeader"}
    />
);


const ROOT_ID = 0;
const getRowId = row => row.sauId;
const getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(r => r.parentId === (row ? row.sauId : ROOT_ID));
    if (childRows.length) {
        return childRows;
    }

    return row && row.hasItems ? [] : null;
};

const MisTable = (props) => {
    const { setSelectionMode, setHeaderText, setLoad } = props;
    const classes = chartStyle();
    const dispatch = useDispatch();
    const columns = [
        // { name: 'sauDisplayName', title: 'BRANCH/DIRECTORATE' },
        // { name: 'totalFileInbox', title: 'TOTAL FILES' },
        // { name: 'totalFilesPendingThreeSeven', title: 'PENDING FILES \n(> 3 & <= 7) Days' },
        // { name: 'totalFilesPendingSeven', title: 'PENDING FILES \n > 7 Days' },
        // { name: 'totalFileProcessedThirtyDays', title: 'PENDING FILES \n > 30 Days' },


        { name: 'sauDisplayName', title: 'Branch/Directorate' },
        // { name: 'totalFileInboxSau', title: 'TOTAL FILES' },
        { name: 'totalFilesPendingFiveSau', title: '0 - 5', },
        { name: 'totalFilesPendingFiveTenSau', title: '5 - 10' },
        { name: 'totalFilePendingTenDaysSau', title: '> 10' },
        { name: 'totalSau', title: 'Total' },
        { name: 'totalFilesPendingFiveCau', title: '0 - 5' },
        { name: 'totalFilesPendingFiveTenCau', title: '5 - 10' },
        { name: 'totalFilePendingTenDaysCau', title: '> 10' },
        { name: 'totalCau', title: 'Total' },
    ];

    const [rowData, setRowData] = useState([]);
    const [rowDataWAC, setRowDataWAC] = useState([])
    const [sauData, setSauData] = useState([]);
    let [ID, setID] = useState([1]);
    const [loading, setLoading] = useState(false);
    const [barGrid, setBargrid] = useState({ barChartSize: 12, showMisTable: false, barSize: '500px' });
    const [dataArr, setDataArr] = useState([]);
    const [corresArr, setCorresArr] = useState([]);
    const [blnShowClose, setBlnShowClose] = useState(false);
    const [chartDetailShow, setchartDetailShow] = useState(true)
    const [blnHideCorresDiv, setBlnHideCorresDiv] = useState(false)
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [expandedRowIdsWAC, setExpandedRowIdsWAC] = useState([])
    const [tabIndex, setTabIndex] = useState(0);

    let groupName = sessionStorage.getItem("department");

    const loadMisData = () => {


        let rowIdsWithNotLoadedChilds = [];
        let apiFun;
        let dataState;
        let setDataState;

        if (tabIndex === 0) {
            rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds]
                .filter(rowId => rowData.findIndex(row => row.parentId === rowId) === -1);
            apiFun = props.getMISTableListSecret2;
            dataState = rowData;
            setDataState = setRowData;
        }
        if (tabIndex === 1) {
            rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIdsWAC]
                .filter(rowId => rowDataWAC.findIndex(row => row.parentId === rowId) === -1);
            apiFun = props.getSauDataSecretWAC;
            dataState = rowDataWAC;
            setDataState = setRowDataWAC;
        }

        // const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds]
        //     .filter(rowId => rowData.findIndex(row => row.parentId === rowId) === -1);

        if (rowIdsWithNotLoadedChilds.length) {
            if (loading) return;
            setLoading(true);
            Promise.all(rowIdsWithNotLoadedChilds
                .map((rowId, index) => apiFun(groupName, rowId).then(response => response)))
                .then((response) => {
                    try {
                        if (response !== undefined) {
                            setDataState(dataState.concat(...response[0]));
                            setLoading(false);

                        } else {
                            setLoading(false);
                            const errorMessage = resp.status + " : " + resp.error + " AT " + resp.path
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
        }


        // const rowIdsWithNotLoadedChildren = [ROOT_ID, ...expandedRowIdsWAC]
        //     .filter(rowId => rowDataWAC.findIndex(row => row.parentId === rowId) === -1);
        // if (rowIdsWithNotLoadedChildren.length) {
        //     if (loading) return;
        //     setLoading(true);
        //     debugger
        //     Promise.all(rowIdsWithNotLoadedChildren
        //         .map((rowId, index) => props.getDataOtherCMD(groupName, rowId).then(response => response))).then((response) => {
        //             debugger
        //             try {
        //                 if (response !== undefined) {
        //                     setRowDataWAC(rowDataWAC.concat(...response[0]));
        //                     setLoading(false);

        //                 } else {
        //                     setLoading(false);
        //                     const errorMessage = resp.status + " : " + resp.error + " AT " + resp.path
        //                     callMessageOut(errorMessage);
        //                 }
        //             }
        //             catch (e) {
        //                 setLoading(false);
        //                 callMessageOut(e.message);
        //             }
        //         }).catch(error => {
        //             console.log(error);
        //             setLoading(false);
        //         });
        // }

    }

    useEffect(() => {
        if (!loading) {
            loadMisData();
        }
    }, [tabIndex, expandedRowIds, expandedRowIdsWAC]);

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }
    const [tableColumnExtensions] = useState([
        // { columnName: 'sauDisplayName', align: 'left', width: 250 },
        // { columnName: 'totalFileInbox', align: 'center' },
        // { columnName: 'totalFilesPendingThreeSeven', align: 'center', wordWrapEnabled: true },
        // { columnName: 'totalFilesPendingSeven', align: 'center', wordWrapEnabled: true },
        // { columnName: 'totalFileProcessedThirtyDays', align: 'center', wordWrapEnabled: true },

        { columnName: 'sauDisplayName', align: 'left' },
        // { columnName: 'totalFileInboxSau', align: 'center', },
        { columnName: 'totalFilesPendingFiveSau', align: 'center', },
        { columnName: 'totalFilePendingTenDaysSau', align: 'center' },
        { columnName: 'totalFilesPendingFiveTenSau', align: 'center' },
        { columnName: 'totalSau', align: 'center' },
        { columnName: 'totalFilesPendingFiveCau', align: 'center' },
        { columnName: 'totalFilePendingTenDaysCau', align: 'center' },
        { columnName: 'totalFilesPendingFiveTenCau', align: 'center' },
        { columnName: 'totalCau', align: 'center' },
    ]);

    const HighlightedCell = ({ column, value, row, style, colorProp, ...restProps }) => (
        <Table.Cell{...restProps} style={{ cursor: 'pointer', ...style, }} onClick={(e) => handleClick(e, value, column, row)}>
            <span style={{ color: colorProp, }}>{value}</span>
        </Table.Cell>
    );

    const Cell = (props) => {
        const { column, row } = props;
        // if (row.totalFileInboxSau > 0 && column.name === "totalFileInboxSau") {
        //     return <HighlightedCell {...props} />;
        // }
        if (row.totalFilesPendingFiveSau > 0 && column.name === "totalFilesPendingFiveSau") {
            return <HighlightedCell colorProp='green' {...props} style={{ textAlign: 'center' }} />;
        }
        if (row.totalFilePendingTenDaysSau > 0 && column.name === "totalFilePendingTenDaysSau") {
            return <HighlightedCell colorProp='red' {...props} style={{ textAlign: 'center' }} />;
        }
        if (row.totalFilesPendingFiveTenSau > 0 && column.name === "totalFilesPendingFiveTenSau") {
            return <HighlightedCell colorProp='orange' {...props} style={{ textAlign: 'center' }} />;
        }
        if (row.totalSau > 0 && column.name === "totalSau") {
            return <HighlightedCell {...props} style={{ textAlign: 'center', fontWeight: "900" }} />;
        }
        if (row.totalFilesPendingFiveCau > 0 && column.name === "totalFilesPendingFiveCau") {
            return <HighlightedCell colorProp='green' {...props} style={{ textAlign: 'center' }} />;
        }
        if (row.totalFilesPendingFiveTenCau > 0 && column.name === "totalFilesPendingFiveTenCau") {
            return <HighlightedCell colorProp='orange' {...props} style={{ textAlign: 'center' }} />;
        }
        if (row.totalFilePendingTenDaysCau > 0 && column.name === "totalFilePendingTenDaysCau") {
            return <HighlightedCell colorProp='red' {...props} style={{ textAlign: 'center' }} />;
        }
        if (row.totalCau > 0 && column.name === "totalCau") {
            return <HighlightedCell {...props} style={{ textAlign: 'center', fontWeight: "900" }} />;
        }
        return <Table.Cell style={{ textAlign: 'center' }} {...props} />;
    };

    const handleClick = (e, value, column, row) => {
        let data;
        // setLoading(true);
        setSelectionMode(false);
        switch (column.name) {
            // case "totalFileInboxSau":
            //     data = `TOTAL FILES IN ${row.sauDisplayName} - ${value} `;
            //     break;
            case "totalFilesPendingFiveSau":
                data = `InProgress FILES AT (0 - 5) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFilesPendingFiveTenSau":
                data = `InProgress FILES AT (5 - 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFilePendingTenDaysSau":
                data = `InProgress FILES AT (> 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalSau":
                data = `InProgress FILES AT (Total) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFilesPendingFiveCau":
                data = `InProgress FILES Including Subsection (0 - 5) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFilesPendingFiveTenCau":
                data = `InProgress FILES Including Subsection (5 - 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalFilePendingTenDaysCau":
                data = `InProgress FILES Including Subsection (> 10) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            case "totalCau":
                data = `InProgress FILES Including Subsection (Total) DAYS IN ${row.sauDisplayName} - ${value}`;
                break;
            default:
                data = `${row.sauDisplayName}`;
        }

        setHeaderText({ "Data": data, "ColumnName": column.name, "Value": value, "SAU": row.sauBranch, "tabIndex": tabIndex });
        setTimeout(
            () => setSelectionMode(true),
            3000
        );
    };

    const [defaultColumnWidths, setDefaultColumnWidths] = useState([
        { columnName: 'sauDisplayName', width: 400 },
        // { columnName: 'totalFileInboxSau', width: 150 },
        { columnName: 'totalFilesPendingFiveSau', width: 145 },
        { columnName: 'totalFilesPendingFiveTenSau', width: 145 },
        { columnName: 'totalFilePendingTenDaysSau', width: 150 },
        { columnName: 'totalSau', width: 150 },
        { columnName: 'totalFilesPendingFiveCau', width: 150 },
        { columnName: 'totalFilesPendingFiveTenCau', width: 145 },
        { columnName: 'totalFilePendingTenDaysCau', width: 150 },
        { columnName: 'totalCau', width: 150 },

        // { columnName: 'sauDisplayName', width: screen.width > 1400 ? 400 : 300 },
        // { columnName: 'totalFileInboxSau', width: screen.width > 1400 ? 250 : 150 },
        // { columnName: 'totalFilePendingTenDaysCau', width: screen.width > 1400 ? 250 : 150 },
        // { columnName: 'totalFilePendingTenDaysSau', width: screen.width > 1400 ? 250 : 150 },
        // { columnName: 'totalFilesPendingFiveTenCau', width: screen.width > 1400 ? 250 : 145 },
        // { columnName: 'totalFilesPendingFiveTenSau', width: screen.width > 1400 ? 250 : 145 },
    ]);
    // const getRowId = row => row.indexId;

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
        setchartDetailShow(false)
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
                    setBargrid({ barChartSize: 2, showMisTable: true, barSize: '270px' })
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

    const [columnBands] = useState([
        {
            title: 'My Files In Progress',
            children: [
                { columnName: 'totalFilesPendingFiveSau' },
                { columnName: 'totalFilesPendingFiveTenSau' },
                { columnName: 'totalFilePendingTenDaysSau' },
                { columnName: 'totalSau' },
            ],
        },
        {
            title: 'All Files In Progress(Including Subsection)',
            children: [
                { columnName: 'totalFilesPendingFiveCau' },
                { columnName: 'totalFilesPendingFiveTenCau' },
                { columnName: 'totalFilePendingTenDaysCau' },
                { columnName: 'totalCau' },
            ],
        },
        // {
        //     title: 'Pending Under',
        //     children: [
        //         { columnName: 'GDP_Total' },
        //         {
        //             title: 'By Sector',
        //             children: [
        //                 { columnName: 'GDP_Agriculture' },
        //                 { columnName: 'GDP_Industry' },
        //                 { columnName: 'GDP_Services' },
        //             ],
        //         },
        //     ],
        // },
    ]);

    const selectData = tabIndex === 0 ? rowData : tabIndex === 1 ? rowDataWAC : '';
    const selectExpandedRowIds = tabIndex === 0 ? expandedRowIds : tabIndex === 1 ? expandedRowIdsWAC : '';
    const selectExpandedRowIdsChange = tabIndex === 0 ? setExpandedRowIds : tabIndex === 1 ? setExpandedRowIdsWAC : '';

    const getDataFromTable = () => {
        return (
            <Grid container direction={'column'}>
                <Grid item xs={12} hidden={barGrid.showMisTable}>
                    <Card className="px-24 py-16 mb-16 table-height-vh col-width">
                        <DevTable rows={selectData} columns={columns} getRowId={getRowId} >
                            <TreeDataState
                                expandedRowIds={selectExpandedRowIds}
                                onExpandedRowIdsChange={selectExpandedRowIdsChange} />
                            <CustomTreeData getChildRows={getChildRows} />
                            <VirtualTable
                                columnExtensions={tableColumnExtensions} tableComponent={TableComponent} cellComponent={Cell} rowComponent={TableRow}
                            />
                            {/* <TableColumnResizing onColumnWidthsChange={setDefaultColumnWidths} defaultColumnWidths={defaultColumnWidths} /> */}
                            <SortingState />
                            <IntegratedSorting />
                            <TableHeaderRow cellComponent={HeaderCellComponent} showSortingControls />
                            <TableTreeColumn for="sauDisplayName" />
                            <TableBandHeader columnBands={columnBands} cellComponent={HeaderCellBand} />
                        </DevTable>
                    </Card>
                </Grid>
                {loading && <Loading />}
            </Grid>

            // <Grid container direction={'column'}>
            //     <Grid item xs={12} hidden={barGrid.showMisTable}>
            //         <Card className="px-24 py-16 mb-16 table-height-vh col-width">
            //             <DevTable rows={selectData} columns={columns} getRowId={getRowId} >
            //                 <TreeDataState
            //                     expandedRowIds={selectExpandedRowIds}
            //                     onExpandedRowIdsChange={selectExpandedRowIdsChange} />
            //                 <CustomTreeData getChildRows={getChildRows} />
            //                 <VirtualTable
            //                     columnExtensions={tableColumnExtensions} tableComponent={TableComponent} cellComponent={Cell} rowComponent={TableRow}
            //                 />
            //                 {/* <TableColumnResizing defaultColumnWidths={defaultColumnWidths} /> */}
            //                 <SortingState />
            //                 <IntegratedSorting />
            //                 <TableHeaderRow cellComponent={HeaderCellComponent} showSortingControls />
            //                 <TableTreeColumn for="sauDisplayName" />
            //                 <TableBandHeader columnBands={columnBands} cellComponent={HeaderCellBand} />
            //             </DevTable>
            //         </Card>
            //     </Grid>
            // </Grid>
        )
    }

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            {getDataFromTable()}

            {/* <AppBar position="static" color="default">
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="AIRHQ" />
                    <Tab label="WAC" />
                    <Tab label="EAC" />
                    <Tab label="SAC" />
                    <Tab label="Item Five" />
                    <Tab label="Item Six" />
                    <Tab label="Item Seven" />
                </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0} className={classes.tabPanelPadding}>
                {getDataFromTable()}
            </TabPanel>
            <TabPanel value={tabIndex} index={1} className={classes.tabPanelPadding}>
                {getDataFromTable()}
            </TabPanel>
            <TabPanel value={tabIndex} index={2} className={classes.tabPanelPadding}>
                Item Three
            </TabPanel>
            <TabPanel value={tabIndex} index={3} className={classes.tabPanelPadding}>
                Item Four
            </TabPanel>
            <TabPanel value={tabIndex} index={4} className={classes.tabPanelPadding}>
                Item Five
            </TabPanel>
            <TabPanel value={tabIndex} index={5} className={classes.tabPanelPadding}>
                Item Six
            </TabPanel>
            <TabPanel value={tabIndex} index={6} className={classes.tabPanelPadding}>
                Item Seven
            </TabPanel> */}
            {loading && <Loading />}
        </>
    );
};


function mapStateToProps(state) {

    return { props: state.props };
}

export default connect(mapStateToProps, { getMISTableListSecret2, getSauDataSecretWAC })(MisTable);