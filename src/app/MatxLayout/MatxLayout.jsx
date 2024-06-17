import React, { Component } from "react";
import { MatxLayouts } from "./index";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { connect } from "react-redux";
import AppContext from "app/appContext";
import {
  setLayoutSettings,
  setDefaultSettings
} from "app/redux/actions/LayoutActions";
import { isEqual, merge } from "lodash";
import { isMdScreen, getQueryParam } from "utils";
import history from "../../history";

class MatxLayout extends Component {
  constructor(props, context) {
    super(props);
    this.appContext = context;
    this.updateSettingsFromRouter();

    // Set settings from query (Only for demo purpose)
    this.setLayoutFromQuery();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.updateSettingsFromRouter();
    }
      let { settings } = this.props;
      let { layout1Settings } = settings;
      let sideBarTheme, tobBarTheme, buttonTheme, footerTheme;
      history.listen((location, action) => {
          if(location.pathname === '/eoffice/mis/my/unclassified')
          {
              footerTheme = layout1Settings.footer.theme = 'blue';
              sideBarTheme = layout1Settings.leftSidebar.theme = 'blue';
              tobBarTheme = layout1Settings.topbar.theme = "blue";
              buttonTheme = layout1Settings.activeButton.theme = 'blue';
          }
          if(location.pathname === '/eoffice/mis/dashboard')
          {
              footerTheme = layout1Settings.footer.theme = 'blue';
              sideBarTheme = layout1Settings.leftSidebar.theme = 'blue';
              tobBarTheme = layout1Settings.topbar.theme = "blue";
              buttonTheme = layout1Settings.activeButton.theme = 'blue';
          }
          if(location.pathname === '/eoffice/mis/incoming/unclassified')
          {
              footerTheme = layout1Settings.footer.theme = 'blue';
              sideBarTheme = layout1Settings.leftSidebar.theme = 'blue';
              tobBarTheme = layout1Settings.topbar.theme = "blue";
              buttonTheme = layout1Settings.activeButton.theme = 'blue';
          }
          if(location.pathname === '/eoffice/mis/my/secret')
          {
              footerTheme = layout1Settings.footer.theme = 'red';
              sideBarTheme = layout1Settings.leftSidebar.theme = 'red';
              tobBarTheme = layout1Settings.topbar.theme = "red";
              buttonTheme = layout1Settings.activeButton.theme = 'red';
          }
          if(location.pathname === '/eoffice/mis/incoming/secret')
          {
              footerTheme = layout1Settings.footer.theme = 'red';
              sideBarTheme = layout1Settings.leftSidebar.theme = 'red';
              tobBarTheme = layout1Settings.topbar.theme = "red";
              buttonTheme = layout1Settings.activeButton.theme = 'red';
          }
      });

  }

  componentWillMount() {
    if (window) {
      // LISTEN WINDOW RESIZE
      window.addEventListener("resize", this.listenWindowResize);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("resize", this.listenWindowResize);
    }
  }

  setLayoutFromQuery = () => {
    try {
      let settingsFromQuery = getQueryParam("settings");
      settingsFromQuery = settingsFromQuery
        ? JSON.parse(settingsFromQuery)
        : {};
      let { settings, setLayoutSettings, setDefaultSettings } = this.props;
      let updatedSettings = merge({}, settings, settingsFromQuery);

      setLayoutSettings(updatedSettings);
      setDefaultSettings(updatedSettings);
    } catch (e) {
      // console.log("Error! Set settings from query param", e);
    }
  };

  listenWindowResize = () => {
    let { settings, setLayoutSettings } = this.props;

    if (settings.layout1Settings.leftSidebar.show) {
      let mode = isMdScreen() ? "close" : "full";
      setLayoutSettings(
        merge({}, settings, { layout1Settings: { leftSidebar: { mode } } })
      );
    }
  };

  updateSettingsFromRouter() {
    const { routes } = this.appContext;
    const matched = matchRoutes(routes, this.props.location.pathname)[0];
    let { defaultSettings, settings, setLayoutSettings } = this.props;
    if (matched && matched.route.settings) {
      // ROUTE HAS SETTINGS
      const updatedSettings = merge({}, settings, matched.route.settings);
      if (!isEqual(settings, updatedSettings)) {
        setLayoutSettings(updatedSettings);
      }
    } else if (!isEqual(settings, defaultSettings)) {
      setLayoutSettings(defaultSettings);
    }
  }

  render() {
    const { settings } = this.props;
    const Layout = MatxLayouts[settings.activeLayout];

    return <Layout {...this.props} />;
  }
}

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
  defaultSettings: state.layout.defaultSettings
});

MatxLayout.contextType = AppContext;

export default withRouter(
  connect(
    mapStateToProps,
    { setLayoutSettings, setDefaultSettings }
  )(MatxLayout)
);
