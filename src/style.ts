import styledSC from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import { bgColors, textColors } from "./styles/colors";
import { Box, Card as CardMUI, CSSObject, Drawer as DrawerMUI, ListItem, Theme } from "@mui/material";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { expandedDrawerWidth, miniDrawerWidth } from "./styles/constants";


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

export const Flexbox = styledMUI(Box)(({ theme }) => ({
  display: "flex",
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
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const Card = styledMUI(CardMUI)(({theme}) => ({
  margin: 3,
}))
