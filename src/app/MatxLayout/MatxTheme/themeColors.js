const textLight = {
  primary: "rgba(74, 70, 109, 0.87)",
  secondary: "rgba(74, 70, 109, 0.54)",
  disabled: "rgba(74, 70, 109, 0.38)",
  hint: "rgba(74, 70, 109, 0.38)"
};

export const themeColors = {
  white: {
    palette: {
      type: "light",
      primary: {
        main: "#ffffff",
        contrastText: textLight.primary
      },
      secondary: {
        main: "#254eef",
        contrastText: textLight.primary
      },
      text: textLight
    }
  },
  slateDark1: {
    palette: {
      type: "dark",
      primary: {
        main: "#222A45",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary
      },
      background: {
        paper: "#222A45",
        default: "#1a2038"
      }
    }
  },
  slateDark2: {
    palette: {
      type: "dark",
      primary: {
        main: "#1a2038",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary
      },
      background: {
        paper: "#222A45",
        default: "#1a2038"
      }
    }
  },
  purple1: {
    palette: {
      type: "light",
      primary: {
        main: "#254eef",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary
      },
      text: textLight
    }
  },
  purple2: {
    palette: {
      type: "light",
      primary: {
        main: "#254eef",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary
      },
      text: textLight
    }
  },
  purpleDark1: {
    palette: {
      type: "dark",
      primary: {
        main: "#254eef",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary
      },
      background: {
        paper: "#222A45",
        default: "#1a2038"
      }
    }
  },
  purpleDark2: {
    palette: {
      type: "dark",
      primary: {
        main: "#254eef",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9e43",
        contrastText: textLight.primary
      },
      background: {
        paper: "#222A45",
        default: "#1a2038"
      }
    }
  },
  blue: {
    palette: {
      type: "light",
      primary: {
        main: "#4267B2",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#FFAF38",
        contrastText: textLight.primary
      },
      footerTheme: "#222A45"
      // text: textLight
    }
  },
  blueDark: {
    palette: {
      type: "dark",
      primary: {
        main: "#254eef",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#FF4F30",
        contrastText: textLight.primary
      },
      background: {
        paper: "#222A45",
        default: "#ffffff"
      }
    }
  },
  red: {
    palette: {
      type: "light",
      primary: {
        main: "#ff4d49",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#FFAF38",
        contrastText: textLight.primary
      },
      footerTheme: "#891007"
    }
  }
};
