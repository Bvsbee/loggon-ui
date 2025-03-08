import { theme } from "antd";

export const loggonTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Color Tokens
    colorPrimary: "#606c38",
    colorInfo: "#BC6C25",
    colorSuccess: "#283618",

    // Typography
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    // Border Radius
    borderRadius: 8,

    // Typography Colors
    colorText: "#344E41",
    colorTextHeading: "#283618",

    // Component-specific Overrides
    colorBgContainer: "#FEFAE0",
    colorBgLayout: "#FEFAE0",
  },

  components: {
    Button: {
      colorPrimary: "#BC6C25",
      colorPrimaryHover: "#606c38",
      colorPrimaryActive: "#283618",
      borderRadius: 8,
    },
    Layout: {
      colorBgContainer: "#FEFAE0",
      colorBgHeader: "#606c38",
      colorBgTrigger: "#283618",
    },
    Menu: {
      colorItemBg: "#FEFAE0",
      colorItemText: "#344E41",
      colorItemHoverBg: "#BC6C2520", // 20% opacity
      colorItemSelectedBg: "#BC6C2540", // 40% opacity
    },
    Card: {
      colorBorderSecondary: "#283618",
      borderRadiusLG: 12,
    },
  },
};
