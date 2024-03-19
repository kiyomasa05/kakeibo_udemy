import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import React, { CSSProperties } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

interface menuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: SidebarProps) => {
  const MenuItem: menuItem[] = [
    { text: "Home", path: "/", icon: HomeIcon },
    { text: "Report", path: "/report", icon: EqualizerIcon },
  ];

  const baseLinkStyle: CSSProperties = {
    textDecoration:"none",
    color: "inherit",
    display:"block"
  };
  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.08)",
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItem.map((item, index) => (
          // 選択済みのメニューに対し、背景色を変更させる
          <NavLink key={item.text} to={item.path} style={({isActive})=>{
            return {...baseLinkStyle,
            ...(isActive ? activeLinkStyle:{})
            }
          }}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* モバイル用 */}
      <Drawer
        variant="temporary" //表示日表示を切り替える
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // ドロワーが開くパフォーマンスが向上する
        }}
        sx={{
          // PCサイズだとdisplay:none
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* PC用 */}
      <Drawer
        variant="permanent" // 常に固定で表示されるドロワーに
        sx={{
          // 600px以上になった時にdisplay block
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideBar;
