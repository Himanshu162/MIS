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
import { Card, Grid, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import {
    CustomTreeData,
    TreeDataState,
    FilteringState,
    SortingState,
    IntegratedFiltering,
    IntegratedSorting,
    RowDetailState
} from "@devexpress/dx-react-grid";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from "react-redux";
import { getMISTableList, getMISTableList2 } from "../../../camunda_redux/redux/action";
import { Loading } from '../therme-source/material-ui/loading';
import { Plugin, Template } from "@devexpress/dx-react-core";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import DoughnutChart from './Doughnut';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { makeStyles } from '@material-ui/core/styles';
import { setLoadData } from "../../../redux/actions/LoadingActions";
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
    const { setSelectionMode, setHeaderText, setLoad, loader } = props;
    const classes = chartStyle();
    const { loadsVal } = props;

    const dispatch = useDispatch();
    const columns = [
        { name: 'sauBranch', title: 'BRANCH/DIRECTORATE' },
        { name: 'totalFileInbox', title: 'TOTAL FILES' },
        { name: 'totalFilesPendingThreeSeven', title: 'PENDING FILES \n(> 3 & <= 7) Days' },
        { name: 'totalFilesPendingSeven', title: 'PENDING FILES \n > 7 Days' },
        { name: 'totalFileProcessedThirtyDays', title: 'PENDING FILES \n > 30 Days' },
    ];


    const [rowData, setRowData] = useState([]);
    const [sauData, setSauData] = useState([]);
    let [ID, setID] = useState([1]);
    const [loading, setLoading] = useState(false);
    const [barGrid, setBargrid] = useState({ barChartSize: 12, showMisTable: false, barSize: '500px' });
    const [dataArr, setDataArr] = useState([]);
    const [corresArr, setCorresArr] = useState([]);
    const [blnShowClose, setBlnShowClose] = useState(false);
    const [chartDetailShow, setchartDetailShow] = useState(true);
    const [blnHideCorresDiv, setBlnHideCorresDiv] = useState(false);
    const [expandedRowIds, setExpandedRowIds] = useState([]);


    let groupName = sessionStorage.getItem("department");

    const loadMisData = () => {
        // let newArr = []
        // let total = 0
        // let newCorresArr = []
        // let corresTotal = 0


        const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds]
            .filter(rowId => rowData.findIndex(row => row.parentId === rowId) === -1);
        if (rowIdsWithNotLoadedChilds.length) {
            if (loading) return;
            setLoading(true);

            Promise.all(rowIdsWithNotLoadedChilds
                .map((rowId, index) => props.getMISTableList2(groupName, rowId).then(response => response))).then((response) => {
                    try {
                        if (response !== undefined) {
                            setRowData(rowData.concat(...response[0]));
                            // const FileId = tmpArr.filter(x => x.parentId === null).map(item => item.fileId)
                            // console.log(FileId)
                            // for (let x = 0; x < tmpArr.length; x++) {
                            //     if (FileId[0] === tmpArr[x].parentId && tmpArr[x].totalFileInbox >= 0) {
                            //         newArr.push(tmpArr[x])
                            //     }
                            // }
                            // newArr.map(i => total = i.totalFileInbox + total)
                            // setDataArr((newArr.map(x => ({ 'value': (x.totalFileInbox / total) * 100, 'name': x.sau, 'label': `Total Inbox Files : ${x.totalFileInbox}`, 'rowID': x.indexId }))))

                            // const CorresFileID = tmpArr.filter(x => x.parentId === null).map(item => item.fileId)

                            // for (let x = 0; x < tmpArr.length; x++) {

                            //     if (CorresFileID[0] === tmpArr[x].parentId && tmpArr[x].totalCorrespondenceInbox >= 0) {
                            //         newCorresArr.push(tmpArr[x])

                            //     }
                            // }

                            // newCorresArr.map(i => corresTotal = i.totalCorrespondenceInbox + corresTotal)
                            // setCorresArr((newCorresArr.map(x => ({ 'value': (x.totalCorrespondenceInbox / corresTotal) * 100, 'name': x.sau, 'label': `Correspondence Files : ${x.totalCorrespondenceInbox}`, 'rowID': x.indexId }))))
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
    };

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }

    useEffect(() => {
        if (!loading) {
            loadMisData();
        }
    }, [expandedRowIds]);

    const [tableColumnExtensions] = useState([
        { columnName: 'sauBranch', align: 'left' },
        { columnName: 'totalFileInbox', align: 'center' },
        { columnName: 'totalFilesPendingThreeSeven', align: 'center', wordWrapEnabled: true },
        { columnName: 'totalFilesPendingSeven', align: 'center', wordWrapEnabled: true },
        { columnName: 'totalFileProcessedThirtyDays', align: 'center', wordWrapEnabled: true },
    ]);

    const HighlightedCell = ({ column, value, row, style, ...restProps }) => (
        <Table.Cell{...restProps} style={{ cursor: 'pointer', ...style, }} onClick={(e) => handleClick(e, value, column, row)}>
            <span style={{ color: 'blue', textDecoration: 'underline' }}>{value}</span>
        </Table.Cell>
    );

    const Cell = (props) => {
        const { column, row } = props;
        if (row.totalFileInbox > 0 && column.name === "totalFileInbox") {
            return <HighlightedCell {...props} />;
        }
        if (row.totalFilesPendingThreeSeven > 0 && column.name === "totalFilesPendingThreeSeven") {
            return <HighlightedCell {...props} />;
        }
        if (row.totalFilesPendingSeven > 0 && column.name === "totalFilesPendingSeven") {
            return <HighlightedCell {...props} />;
        }
        if (row.totalFileProcessedThirtyDays > 0 && column.name === "totalFileProcessedThirtyDays") {
            return <HighlightedCell {...props} />;
        }
        return <Table.Cell {...props} />;
    };

    const handleClick = (e, value, column, row) => {
        let data;
        setSelectionMode(false);
        // setLoading(true);
        switch (column.name) {
            case "totalFileInbox":
                data = `TOTAL FILES IN ${row.sauBranch} - ${value} `;
                break;
            case "totalFilesPendingThreeSeven":
                data = `PENDING FILES (> 3 & <= 7) DAYS IN ${row.sauBranch} - ${value}`;
                break;
            case "totalFilesPendingSeven":
                data = `PENDING FILES > 7 DAYS IN ${row.sauBranch} - ${value}`;
                break;
            case "totalFileProcessedThirtyDays":
                data = `PENDING FILES > 30 DAYS IN ${row.sauBranch} - ${value}`;
                break;
            default:
                data = `${row.sauBranch}`;

        }

        setHeaderText({ "Data": data, "ColumnName": column.name, "Value": value, "SAU": row.sauBranch });
        setTimeout(
            () => { setSelectionMode(true); },
            5000
        );
    };

    const [defaultColumnWidths] = useState([
        { columnName: 'sauBranch', width: 250 },
        { columnName: 'totalFileInbox', width: 200 },
        { columnName: 'totalFilesPendingThreeSeven', width: 200 },
        { columnName: 'totalFilesPendingSeven', width: 200 },
        { columnName: 'totalFileProcessedThirtyDays', width: 200 },
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
        setchartDetailShow(false);
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
            title: 'Population',
            children: [
                { columnName: 'Population_Total' },
                { columnName: 'Population_Urban' },
            ],
        },
        {
            title: 'Nominal GDP',
            children: [
                { columnName: 'GDP_Total' },
                {
                    title: 'By Sector',
                    children: [
                        { columnName: 'GDP_Agriculture' },
                        { columnName: 'GDP_Industry' },
                        { columnName: 'GDP_Services' },
                    ],
                },
            ],
        },
    ]);
    return (
        <>
            {/* <Grid container direction={'row'}>
                <Grid item xs={12}>
                    <Card className="mb-10 mt-16 ml-2 mr-1" elevation={5}>
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
                                data={dataArr}
                                onClickBar={handleClickBar}
                                blnShowLengend={chartDetailShow}
                                barTitle='File Report'
                            />
                        </div>
                    </Card>
                </Grid>
            </Grid> */}
            <Grid container direction={'column'}>
                <Grid item xs={12} hidden={barGrid.showMisTable}>
                    <Card className="px-24 py-16 mb-16 table-height-vh">
                        <DevTable rows={rowData} columns={columns} getRowId={getRowId} >
                            <TreeDataState
                                expandedRowIds={expandedRowIds}
                                onExpandedRowIdsChange={setExpandedRowIds} />
                            <CustomTreeData getChildRows={getChildRows} />
                            <VirtualTable
                                columnExtensions={tableColumnExtensions} tableComponent={TableComponent} cellComponent={Cell} rowComponent={TableRow}
                            />
                            <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                            <SortingState />
                            <IntegratedSorting />
                            <Table
                                columnExtensions={tableColumnExtensions}
                            />
                            <TableHeaderRow cellComponent={HeaderCellComponent} showSortingControls />
                            <TableTreeColumn for="sauBranch" />
                            {/* <TableBandHeader
                                columnBands={columnBands}
                            /> */}
                        </DevTable>
                    </Card>
                </Grid>
                {loading && <Loading />}
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

export default connect(mapStateToProps, { setLoadData, getMISTableList2 })(MisTable);
