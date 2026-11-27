

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PercentIcon from "@mui/icons-material/Percent"
import CalculateIcon from "@mui/icons-material/Calculate"
import BarChartIcon from "@mui/icons-material/BarChart"
import SettingsIcon from "@mui/icons-material/Settings"
import Link from "next/link"
import { usePathname } from "next/navigation"
import path from "path"
const drawerWidth = 230

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/",
    icon: DashboardIcon,
  },
  {
    label: "Percentage",
    href: "/calculators/percentage",
    icon: PercentIcon,
  },
  {
    label: "Age Calculator",
    href: "/calculators/age",
    icon: CalculateIcon,
  },
  {
    label: "EMI Calculator",
    href: "/calculators/emi",
    icon: BarChartIcon,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];
export default function Layout() {
  const theme = useTheme();
  const pathname=usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleToggle = () => setMobileOpen((prev) => !prev)
  const handleClose = () => setMobileOpen(false)

  return (
    <Box sx={{ display: "flex" }}>

      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>


      <Drawer
        anchor="left"
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isMobile ? 0 : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Typography variant="h6" sx={{px:2,py:1}}>Easy Tools</Typography>
        <Divider/>
        <List>
{NAV_ITEMS.map((item)=>(

<ListItemButton onClick={handleClose} key={item.label} component={Link} href={item.href} 
selected={pathname === item.href} 
sx={{
  gap: 2,
  color: "text.secondary",

  "&.Mui-selected": {
    backgroundColor: "primary.main",
    color: "white",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "primary.dark",
  },
  "&:not(.Mui-selected):hover": {
    backgroundColor: "grey.200",
    color: "primary.main",
  },
  alignItems:'center',
  py:1.5,
px:2,
}}> <item.icon sx={{fontSize:22}} /><ListItemText primary={item.label}/></ListItemButton>


))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh", bgcolor: "grey.50" }}>
        <Toolbar />
        <Typography>Main content</Typography>
      </Box>
    </Box>
  )
}