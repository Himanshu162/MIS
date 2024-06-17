import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Breadcrumb } from "../../../matx";
import MisTable from "./shared/MisTable";
import DetailedTable from "./shared/DetailedTable";
import StatCards from '../utilities/StatCards'
import { getCardDataSecret2 } from "../../camunda_redux/redux/action";
import { useDispatch } from "react-redux";
import { setSnackbar } from "app/camunda_redux/redux/ducks/snackbar";


function Mis() {
    const [selectionMode, setSelectionMode] = useState(true);
    const [headerText, setHeaderText] = useState([]);
    const [loadVal, setLoadVal] = useState(true);
    const setLoads = (val) => {
        setLoadVal(val);
    };
    const dispatch = useDispatch();
    const [cardData, setCardData] = useState([{}])
    // const [cardBgColor, setCardBgColor] = useState([
    //     'linear-gradient(90deg, #0E51E3, #1BA6D7)',
    //     'linear-gradient(90deg, #ff9800, #ffff4d)',
    //     'linear-gradient(90deg, rgb(0, 128, 0), rgb(0 128 0 / 50%))',
    //     'linear-gradient(90deg, #0E51E3, #ee82ee)',
    //     'linear-gradient(315deg, #90d5ec 0%, #fc575e 74%)'
    // ])

    const cardBgColor = '#f44a47';

    const [cardText, setCardText] = useState([
        'Total Files Inprogress',
        'Inprogress Files (0-5)',
        'Inprogress Files (5-10)',
        'Inprogress Files (> 10)',
    ])

    const groupName = sessionStorage.getItem("department");
    const sauId = 0;


    const callMessageOut = (message) => {
        dispatch(setSnackbar(true, "error", message));
    }

    useEffect(() => {
        dispatch(getCardDataSecret2(groupName, sauId)).then((res) => {
            setCardData(res)
        }).catch((error) => {
            setLoading(false);
            callMessageOut(error.message);
        })
    }, [])
    return (
        <>
            <div className="m-sm-30">
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12} lg={3}>
                        <StatCards cardText={cardText[0]} cardData={cardData.totalInboxFileCount} bgColor={cardBgColor} />
                    </Grid>
                    <Grid item sm={6} xs={12} lg={3}>
                        <StatCards cardText={cardText[1]} cardData={cardData.totalfilePendingAtFiveDaysSau} bgColor={cardBgColor} />
                    </Grid>
                    <Grid item sm={6} xs={12} lg={3}>
                        <StatCards cardText={cardText[2]} cardData={cardData.totalFilePendingAtFiveAndTenDaysSau} bgColor={cardBgColor} />
                    </Grid>
                    <Grid item sm={6} xs={12} lg={3}>
                        <StatCards cardText={cardText[3]} cardData={cardData.totalfileProcessedAtTenDaysSau} bgColor={cardBgColor} />
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MisTable setSelectionMode={setSelectionMode} setLoad={loadVal} setHeaderText={setHeaderText} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '30px' }}>
                    <Grid item xs={12}>
                        <DetailedTable selectionMode={selectionMode} setTableLoading={setLoads} headerText={headerText} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
export default withStyles({}, { withTheme: true })(Mis);
