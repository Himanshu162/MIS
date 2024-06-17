import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Breadcrumb } from "../../../matx";
import MisTable from "./shared/MisTable";
import DetailedTable from "./shared/DetailedTable";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DoughnutChart from './shared/Doughnut'
import MisChart from './shared/MisChart'
import MisTableChartOld from './shared/MisTableChartOld'
import MisTableIncoming from './shared/MisTableIncoming'
import { Card } from "@material-ui/core";
import { chart1, chart2 } from "../../camunda_redux/redux/action";
import { connect, useDispatch } from "react-redux";
import SecondDetailedTable from './shared/SecondDetailedTable'
import FirstDetailedTable from './shared/FirstDetailedTable'
import { Loading } from './therme-source/material-ui/loading';
import { useSelector } from "react-redux";


function Mis(props) {
    const dispatch = useDispatch()
    const { bln } = useSelector(state => state.passData)
    const [selectionMode, setSelectionMode] = useState(true);
    const [selectionMode2, setSelectionMode2] = useState(true);
    const [headerText, setHeaderText] = useState([]);
    const [headerText2, setHeaderText2] = useState([]);
    const [loadVal, setLoadVal] = useState(true);
    const [loadingBln, setLoadingBln] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const setLoads = (val) => {
        setLoadVal(val);
    };
    const department = sessionStorage.getItem('department').split(".")

    const [dataChart1, setDataChart1] = useState([
        {
            "value": '',
            "name": "< 10",
            "itemStyle": {
                "normal": {
                    "color": "#c9d3e7"
                }
            }
        },
        {
            "value": '',
            "name": "10 - 20",
            "itemStyle": {
                "normal": {
                    "color": "#8ba6dd"
                }
            }
        },
        {
            "value": '',
            "name": "> 20",
            "itemStyle": {
                "normal": {
                    "color": "#4267b2"
                }
            }
        },
    ])

    const [dataChart2, setDataChart2] = useState([
        {
            "value": '',
            "name": "< 10",
            "itemStyle": {
                "normal": {
                    "color": "#c9d3e7"
                }
            }
        },
        {
            "value": '',
            "name": "10 - 20",
            "itemStyle": {
                "normal": {
                    "color": "#8ba6dd"
                }
            }
        },
        {
            "value": '',
            "name": "> 20",
            "itemStyle": {
                "normal": {
                    "color": "#4267b2"
                }
            }
        },
    ])

    useEffect(() => {
        let department = sessionStorage.getItem('department')
        let sauId = 0;
        let tempArr1 = [...dataChart1];
        let tempArr2 = [...dataChart2]

        props.chart1(department, sauId).then((res) => {
            console.log("chart :", res)
            tempArr1[0].value = res[0].totalFilesPendingFiveCau
            tempArr1[1].value = res[0].totalFilesPendingFiveTenCau
            tempArr1[2].value = res[0].totalFilePendingTenDaysCau
            console.log("chart  tempArr1:", tempArr1)
            // totalCau
            setDataChart1(tempArr1)
        })

        props.chart2(department, sauId).then((res) => {
            console.log("chart 2:", res)
            tempArr2[0].value = res[0].totalFilesPendingFiveCau
            tempArr2[1].value = res[0].totalFilesPendingFiveTenCau
            tempArr2[2].value = res[0].totalFilePendingTenDaysCau
            console.log("chart  tempArr2:", tempArr2)
            // totalCau
            setDataChart2(tempArr2)
        })
    }, [bln])


    return (
        <div style={{ margin: '0px 15px', padding: "15px 0px" }}>
            {/* <MisTableChartOld /> */}
            {/* <MisChart /> */}

            {/* <Card className='cardParent' elevation={5} style={{ backgroundColor: '#d1cecedd', marginBottom: '30px' }}> */}
            <Grid container>
                <Grid item xs={6}>
                    <DoughnutChart
                        height='250px'
                        color={[
                            '#1395ba',
                            '#0d3c55',
                            '#c02e1d',
                            '#f16c20',
                            '#ebc844',
                            '#a2b86c'
                        ]}
                        data={dataChart1}
                    // onClickBar={handleClickBar}
                    // blnShowLengend={chartDetailShow}
                    // barTitle='Secret File Report'
                    />
                </Grid>
                <Grid item xs={6}>
                    <DoughnutChart
                        height='250px'
                        color={[
                            '#1395ba',
                            '#0d3c55',
                            '#c02e1d',
                            '#f16c20',
                            '#ebc844',
                            '#a2b86c'
                        ]}
                        data={dataChart2}
                    // onClickBar={handleClickBar}
                    // blnShowLengend={chartDetailShow}
                    // barTitle='Secret File Report'
                    />
                </Grid>
            </Grid>
            <div style={{ padding: "15px" }}>
                <h2 style={{ textAlign: "center" }}>{department[1]} Branch Pending Files</h2>
                <Grid container>
                    <Grid item xs={6}>
                        <MisTable setLoadingBln={setLoadingBln} setSelectionMode={setSelectionMode} setLoad={loadVal} setHeaderText={setHeaderText} />
                        <Grid container spacing={2} style={{ marginTop: '30px' }}>
                            <Grid item xs={12}>
                                <FirstDetailedTable setLoadingBln={setLoadingBln} setTableLoading={setLoads} selectionMode={selectionMode} headerText={headerText} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <MisTableIncoming setLoadingBln={setLoadingBln} setSelectionMode2={setSelectionMode2} setLoad={loadVal} setHeaderText2={setHeaderText2} />
                        <Grid container spacing={2} style={{ marginTop: '30px' }}>
                            <Grid item xs={12}>
                                <SecondDetailedTable setLoadingBln={setLoadingBln} setTableLoading={setLoads} selectionMode={selectionMode2} headerText={headerText2} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            {loadingBln && <Loading />}
            {/* </Card> */}

            {/* <Grid container>
                <Grid item xs={12}>
                    <MisTable setSelectionMode={setSelectionMode} setLoad={loadVal} setHeaderText={setHeaderText} />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '30px' }}>
                <Grid item xs={12}>
                    <DetailedTable setTableLoading={setLoads} selectionMode={selectionMode} headerText={headerText} />
                </Grid>
            </Grid> */}
        </div >
    )
}
function mapStateToProps(state) {
    return {
        props: state.props,
        loader: state.loader
    };
}
// export default connect(mapStateToProps, { withTheme: true }, { chart1 })(Mis);
export default connect(mapStateToProps, { chart1, chart2 })(Mis);
