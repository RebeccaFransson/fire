import { AutoGraph } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Drawer, DrawerHeader, ItemHover } from "../style";
import { ChevronLeft, Menu } from "@mui/icons-material";

export const Sidebar = ({
  open,
  handleDrawerToggle,
}: {
  open: boolean;
  handleDrawerToggle: () => void;
}) => {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" anchor="left" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>
        <ItemHover>
          <ListItemIcon>
            <AutoGraph />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ItemHover>
        <ItemHover>
          <ListItemIcon>
            <AutoGraph />
          </ListItemIcon>
          <ListItemText primary="Mail" />
        </ItemHover>
      </List>
    </Drawer>
  );
};
