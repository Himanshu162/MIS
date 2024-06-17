import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  FormControl,
  Icon,
  IconButton,
  MenuItem,
  withStyles,
  MuiThemeProvider,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { loadUserRoleData } from "../../camunda_redux/redux/action";
import { PropTypes } from "prop-types";
import { MatxMenu } from "./../../../matx";
import { isMdScreen } from "utils";
import NotificationBar from "../SharedCompoents/NotificationBar";
import {
  changingTableStatePA,
  changingTableState,
  changingTableStateInbox,
  changingTableStateOutbox,
} from "../../camunda_redux/redux/action/apiTriggers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Chip from "@material-ui/core/Chip";
import { refreshDashbord } from "../../camunda_redux/redux/ducks/passData";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
});

const elem = document.documentElement;

class Layout1Topbar extends Component {
  state = {
    fullScreen: false,
    comboValue: "",
    comboList: [],
  };

  componentWillMount() {
    const department = sessionStorage.getItem("department");
    const userName = sessionStorage.getItem("username");
    this.props.loadUserRoleData(department, userName).then((resp) => {
      let tempArr = [];
      try {
        for (let x = 0; x < resp.data.length; x++) {
          tempArr.push(resp.data[x]);
        }
        if (tempArr.length > 0) {
          this.setState({ comboList: tempArr, comboValue: tempArr[0] });
          sessionStorage.setItem("role", tempArr[0]);
          sessionStorage.setItem("department", tempArr[0]);
          // sessionStorage.setItem("role", this.state.comboValue);
        }
      } catch (e) {
        if (e.message === "Cannot read property 'roleName' of undefined") {
          this.props.history.push("/eoffice/404");
        }
      }
    });
  }

  openFullScreen = () => {
    this.setState({ fullScreen: true });
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  closeFullScreen = () => {
    this.setState({ fullScreen: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;
    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
        footer: {
          ...settings.layout1Settings.footer,
          ...sidebarSettings,
        },
      },
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    window.location = window.__ENV__.REACT_APP_LOGOUT_URL;
  };

  handleThemeChange = (e) => {
    let { settings } = this.props;
    let { layout1Settings } = settings;
    const val = e.target.checked;

    let sideBarTheme, tobBarTheme, buttonTheme;
    sideBarTheme = layout1Settings.leftSidebar.theme = val ? "red" : "blue";
    tobBarTheme = layout1Settings.topbar.theme = val ? "red" : "blue";
    buttonTheme = layout1Settings.activeButton.theme = val ? "red" : "blue";
    footerTheme = layout1Settings.footer.theme = val ? "red" : "blue";
    this.updateSidebarMode({ sideBarTheme, tobBarTheme, buttonTheme });
  };

  handleChange = (event) => {
    this.props.refreshDashbord();
    this.setState({ comboValue: event.target.value });
    if (this.state.comboValue !== null) {
      sessionStorage.setItem("department", event.target.value);
      const roleName = event.target.value;
      sessionStorage.setItem("role", roleName);
      this.refreshTables();
    }
  };

  refreshTables = () => {
    let trigger = false;
    setTimeout(() => {
      trigger = true;
      this.props.changingTableStatePA(trigger, "CHANGE_PA_APPLICATION");
      this.props.changingTableState(trigger, "CHANGE_PA_FILE");
      this.props.changingTableStateInbox(trigger, "CHANGE_INBOX");
      this.props.changingTableStateOutbox(trigger, "CHANGE_OUTBOX");
    }, 1000);
  };

  render() {
    const { fullScreen, comboList } = this.state;
    let { theme, settings, className, style, darkState } = this.props;
    const topbarTheme =
      settings.themes[settings.layout1Settings.topbar.theme] || theme;
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <div className="topbar">
          <div
            className={`topbar-hold ${className}`}
            style={Object.assign(
              {},
              { backgroundColor: topbarTheme.palette.primary.main },
              style
            )}
          >
            <div className="flex flex-space-between flex-middle h-100">
              <div className="flex">
                <IconButton
                  onClick={this.handleSidebarToggle}
                  className="hide-on-lg"
                >
                  <Icon>menu</Icon>
                </IconButton>
                <div className="hide-on-mobile">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/logo-paperless.png"
                    }
                    alt={"EOffice"}
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                  />
                </div>
              </div>
              <div className="flex">
                {" "}
                <Typography variant="h4" component="h6">
                  <span style={{ color: "snow" }}>MIS Analysis</span>
                </Typography>
              </div>
              <div className="flex flex-middle">
                {fullScreen ? (
                  <IconButton onClick={this.closeFullScreen}>
                    <Tooltip
                      title="Exit FullScreen"
                      aria-label="Exit FullScreen"
                    >
                      <Icon
                        style={{
                          fontSize: "30px",
                          marginTop: "-10px",
                          height: "auto",
                        }}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/icons/fullscreen_exit_white_24dp.svg`
                          }
                          alt="Exit FullScreen"
                        />
                      </Icon>
                    </Tooltip>
                  </IconButton>
                ) : (
                  <IconButton onClick={this.openFullScreen}>
                    <Tooltip title="FullScreen" aria-label="FullScreen">
                      <Icon
                        style={{
                          fontSize: "30px",
                          marginTop: "-10px",
                          height: "auto",
                        }}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/icons/fullscreen_white_24dp.svg`
                          }
                          className={"fullIcon"}
                          alt="FullScreen"
                        />
                      </Icon>
                    </Tooltip>
                  </IconButton>
                )}
                <FormControl
                  className={"dropRole"}
                  style={{
                    minWidth: 210,
                    background: "white",
                    borderRadius: "50px",
                    textAlignLast: "center",
                  }}
                >
                  <Select
                    native
                    value={this.state.comboValue}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                    className={"headingTable"}
                    style={{ fontSize: "14px" }}
                  >
                    {comboList.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title="Logout" aria-label="Logout">
                  <IconButton onClick={this.handleSignOut}>
                    <ExitToAppIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loadUserRoleData: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loadUserRoleData: PropTypes.func.isRequired,
  settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
      setLayoutSettings,
      logoutUser,
      loadUserRoleData,
      changingTableStatePA,
      changingTableState,
      changingTableStateInbox,
      changingTableStateOutbox,
      refreshDashbord,
    })(Layout1Topbar)
  )
);
