import styledSC from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import { bgColors, textColors } from "./styles/colors";
import { Box, CSSObject, Drawer as DrawerMUI, ListItem, Theme } from "@mui/material";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;

export const AppWrapper = styledSC.div`
    font-family: monospace;
    text-align: center;
    background-color: #${bgColors.lighterPink};   
    height: 100%;
    
    :nth-child(2) h2 {
        background-color: #${bgColors.brightPink};
    }
    :nth-child(3) h2 {
        background-color: #${bgColors.darkPink};
    }
    :nth-child(4) h2 {
        background-color: #${bgColors.darkerPink};
      }
      
    h2 {
        margin: 0;
      }
`;

export const ClickableTitle = styledSC.h2`
    color: #${textColors.primary};
    cursor: pointer;

    :hover {
        color: #${textColors.secondary};
    }
`;

export const BoxHeader = styledSC.h3`
    margin: 0;
    width: 100%;
    text-align: left;
`;


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styledMUI(DrawerMUI)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const ItemHover = styledMUI(ListItem)(({ theme }) => ({
  cursor: "pointer",
  ":hover": {
    backgroundColor: `#${bgColors.lighterPink}`,
  },
}));

export const Flexbox = styledMUI(Box)(({ theme }) => ({
  display: "flex",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styledMUI(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Main = styledMUI("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const DrawerHeader = styledMUI("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
