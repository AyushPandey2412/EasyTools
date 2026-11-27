    //     import { Button,Drawer,List, ListItem, ListItemButton, ListItemText,Box, Typography} from "@mui/material"
    //     import { useState } from "react"
    //     import MenuIcon from "@mui/icons-material/Menu"
    // import { useMediaQuery, useTheme } from "@mui/material"
    //     export default function Layout() {

    // const theme =useTheme()
    //     const [mobileOpen,setMobileOpen]=useState(false)

    // const isMobile=useMediaQuery(theme.breakpoints.down("md"))
    //     const handelOpen=()=>{
    //         setMobileOpen((prev)=>!prev)
    //     }

    //     const handelClose=()=>{
    //         setMobileOpen(false)
    //     }


    //     return (
        
    //             <Box sx={{
    //                 display:"flex"
    //             }}>


    //             {
    //                 isMobile &&     <Button onClick={handelOpen}><MenuIcon/></Button>    
    //             }
            
                


    //             <Drawer anchor="left" open={isMobile ? mobileOpen :true} onClose={handelClose} variant={isMobile ?  "temporary" :"permanent"}>
                    
    //             <List sx={{width:200}}>
    //     <ListItemButton onClick={handelClose}>
    //         <ListItemText primary="Home"/>
    //     </ListItemButton>
    //     <ListItemButton onClick={handelClose}>

    //             <ListItemText primary="About"/>
    //     </ListItemButton>
    //             </List>


    //             </Drawer>

    //             <Box sx={{flexGrow:1,p:2}}>


    // <Typography>Main content</Typography>

    //             </Box>
    //             </Box>
    //     )
    //     }
