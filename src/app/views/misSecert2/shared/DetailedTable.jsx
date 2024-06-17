import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    Grid as DevTable, PagingPanel, Table, TableHeaderRow, TableFilterRow,
    Toolbar,
    ExportPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { Backdrop, Divider, fade, Grid, IconButton, Paper, Typography, withStyles } from "@material-ui/core";
import { IntegratedPaging, PagingState, FilteringState, SortingState, IntegratedFiltering, IntegratedSorting } from "@devexpress/dx-react-grid";
import CloseIcon from '@material-ui/icons/Close';
import { connect, useDispatch } from "react-redux";
import { getMISDetailTableList, getMISDetailTableListSecret2, getMISDetailTableListSecretWAC } from '../../../camunda_redux/redux/action';
import { Loading } from "../therme-source/material-ui/loading";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";
import { GridExporter } from '@devexpress/dx-react-grid-export';
import saveAs from 'file-saver';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";

const styles = theme => ({
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: fade(theme.palette.secondary.main, 0.10),
        },
        customRow: {
            '&:hover': {
                backgroundColor: fade(theme.palette.primary.main, 0.50),
            }
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    },
});
const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={styles.tableStriped}
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

const DetailedTable = (props) => {
    const { selectionMode, headerText, setTableLoading } = props;
    const [rowDataWAC, setRowDataWAC] = useState([])
    console.log(selectionMode);
    const dispatch = useDispatch();
    const columns = [

        { name: 'fileNumber', title: 'FILE #' },
        { name: 'subject', title: 'SUBJECT' },
        { name: 'initiatedBy', title: 'INITIATED BY' },
        { name: 'pendingWith', title: 'PENDING WITH' },
        { name: 'pendingSince', title: 'PENDING SINCE' },
        { name: 'pendingdays', title: 'NO OF DAYS PENDING' },
    ];

    const rows = [
        { 'sno': 1, 'departmentName': 'DG(Air Ops)', 'fileNumber': "IAF/1122/1122", 'subject': "Proposal for to M/s ABC Ltd", 'initiatedBy': "IAFAC", 'pendingWith': "so_dg_airops", 'pendingSince': "4/25/21", 'pendingdays': 10, 'status': "in progress" },
        { 'sno': 2, 'departmentName': 'DG(Air Ops)', 'fileNumber': "IAF/1124/1124", 'subject': "Proposal for to M/s XYZ LTD ", 'initiatedBy': "IAFAC", 'pendingWith': "so_dg_airops", 'pendingSince': "4/25/21", 'pendingdays': 9, 'status': "in progress" },
        { 'sno': 3, 'departmentName': 'DG(Air Ops)', 'fileNumber': "IAF/1128/1128", 'subject': "Proposal for Procurement", 'initiatedBy': "IAFAC", 'pendingWith': "so_dg_airops", 'pendingSince': "4/25/21", 'pendingdays': 8, 'status': "in progress" },
    ];

    const onSave = (workbook) => {
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), headerText.SAU + '.xlsx');
        });
    };

    const [tableColumnExtensions] = useState([
        // { columnName: 'sno', align: 'center' },

        { columnName: 'fileNumber', align: 'center' },
        { columnName: 'subject', align: 'center', wordWrapEnabled: true },
        { columnName: 'initiatedBy', align: 'center', wordWrapEnabled: true },
        { columnName: 'pendingWith', align: 'center', wordWrapEnabled: true },
        { columnName: 'pendingSince', align: 'center', wordWrapEnabled: true },
        { columnName: 'noOfDaysPending', align: 'center', wordWrapEnabled: true },
        // { columnName: 'status', align: 'center', wordWrapEnabled: true },
    ]);

    const getRowId = row => row.sno;
    const [blnHidden, setBlnHidden] = useState(false);

    const handleCloseClick = () => {

        setTableLoading(false);
        setBlnHidden(false);
    };
    const TableRow = ({ row, ...restProps }) => (
        <Table.Row
            className={styles.customRow}
            {...restProps}
            {... { hover: true }}
        />
    );
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (selectionMode === false) {
            setLoading(true);
            let apiFun;
            let setDataState;

            if (headerText.tabIndex === 0) {
                apiFun = props.getMISDetailTableListSecret2;
                setDataState = setRowData;
            }
            if (headerText.tabIndex === 1) {
                apiFun = props.getMISDetailTableListSecretWAC;
                setDataState = setRowDataWAC;
            }
            // let formData = new FormData();
            // formData.append('sau', headerText.SAU);
            // formData.append('column', headerText.ColumnName);
            // formData.append('num', headerText.Value);
            apiFun(headerText.SAU, headerText.ColumnName, headerText.Value).then((resp) => {
                let tmpArr = [];
                try {
                    if (resp.Data !== undefined && resp.Data !== null) {
                        tmpArr = resp.Data;
                        setDataState(tmpArr);
                        setBlnHidden(true);
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                        const errorMessage = "Data is null"
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

    }, [selectionMode]);

    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }
    const exporterRef = useRef();
    const startExport = (options) => {
        exporterRef.current.exportGrid(options);
    };

    const selectData = headerText.tabIndex === 0 ? rowData : headerText.tabIndex === 1 ? rowDataWAC : '';

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={styles.modal}
                open={blnHidden}
                onClose={handleCloseClick}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{ display: 'grid', margin: '0px 30px', marginTop: "auto", marginBottom: "auto" }}
            >
                <Fade in={blnHidden}>
                    <Paper elevation={12}>
                        <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='button' color='primary' className={"headingTable"} style={{ marginLeft: '20px', marginTop: '10px', fontSize: "16px" }}>{headerText.Data}</Typography>
                            <IconButton aria-label="close" color="primary" onClick={handleCloseClick}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>

                        <Divider />
                        <DevTable rows={selectData} columns={columns}>
                            <FilteringState />
                            <SortingState />
                            <IntegratedFiltering />
                            <IntegratedSorting />
                            <PagingState
                                defaultCurrentPage={0}
                                pageSize={5}
                            />
                            <IntegratedPaging />
                            <Table tableComponent={TableComponent} style={{ overflow: 'hidden' }} columnExtensions={tableColumnExtensions} rowComponent={TableRow} />
                            <TableHeaderRow cellComponent={HeaderCellComponent} showSortingControls />
                            <TableFilterRow />
                            <PagingPanel />
                            <Toolbar />
                            <ExportPanel startExport={startExport} />
                        </DevTable>
                        <GridExporter
                            ref={exporterRef}
                            rows={selectData}
                            columns={columns}
                            onSave={onSave}
                        />

                        {loading && <Loading />}
                    </Paper>
                </Fade>
            </Modal>
        </>


    );
};

function mapStateToProps(state) {

    return { props: state.props };
}

export default connect(mapStateToProps, { getMISDetailTableListSecret2, getMISDetailTableListSecretWAC })(DetailedTable);
