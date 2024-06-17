import React, { useEffect } from "react";
import { withStyles, MuiThemeProvider, Button } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import history from "../../../history";
import { withRouter } from "react-router-dom";

const Footer = ({ theme, settings }) => {
    let footerTheme = settings.themes[settings.layout1Settings.footer.theme] || theme;
    return (
        <MuiThemeProvider theme={footerTheme}>
            <Helmet>
                <style>
                    {`
              .footer {
                background: ${footerTheme.palette.footerTheme};
                color: ${footerTheme.palette.primary.contrastText};
              }
            `}
                </style>
            </Helmet>
            <div className="footer flex flex-middle h-20" style={{ padding: '0px !important', bottom: '0px', paddingTop: '6px !important', position: 'fixed' }}>
                <div className="flex flex-middle container px-sm-30 w-100">
                    <span className="m-auto">
                        <p className="m-0 footMis" style={{ fontSize: '13px' }}>
                            INDIAN AIR FORCE
                        </p>
                    </span>
                </div>
            </div>
        </MuiThemeProvider>
    );
};

Footer.propTypes = {
    settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
    withRouter(
        connect(
            mapStateToProps,
            {}
        )(Footer)
    )
);
