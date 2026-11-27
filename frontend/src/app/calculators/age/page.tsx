        'use client'

        import { Box, Typography ,TextField,Paper} from '@mui/material'
        import { useState } from "react";
        function Agepage() {




            function calculateAge(){}

        const[dob,setDob]=useState("")

        const today=new Date();

        const birthdate=new Date(dob)

        const birthyear=birthdate.getFullYear()
        const currentYear=today.getFullYear()


        const birthMonth = birthdate.getMonth();
const currentMonth = today.getMonth();

const birthDay = birthdate.getDate();
const currentDay = today.getDate();


const hasBirthdayPassedMonth = currentMonth > birthMonth;

const hasBirthdayPassedDay = currentDay > birthDay;

const birthdayNotReached =
  currentMonth < birthMonth ||
  (currentMonth === birthMonth && currentDay < birthDay);

        const age=currentYear-birthyear

        const finalAge = birthdayNotReached ? age - 1 : age;

        return (
            <Box sx={{display:'flex', flexDirection:'column',gap:3,p:3  }}>

                <Paper sx={{p:3,borderRadius:3,elevation:3,maxWidth:400}}>
                <Typography variant='h4' fontWeight="bold">Age calculator</Typography>
                
                <TextField label="Date of Birth" type='date' value={dob}
                onChange={(e)=>setDob(e.target.value)}
                InputLabelProps={{shrink:true}} inputProps={{ max: new Date().toISOString().split("T")[0] }}
                sx={{maxWidth:300}}
                
                >
                    
                </TextField>


                <Typography>{dob}</Typography>

{dob && <Typography>Age: {finalAge}</Typography>}
                
                </Paper>
                </Box>

        )
        }

        export default Agepage