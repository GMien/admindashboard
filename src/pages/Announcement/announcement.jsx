import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import { FetchingAnnounce,CreateAnnouncement,ListAccess } from '../../api/request';
import { styled, ThemeProvider } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from "react";
import { admininfo } from "../../App";
import { useSelector } from 'react-redux';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const Announcement = () => {
  const { admin  } = useSelector((state) => state.login)
    const [access,setAccess] = useState([])
    const [announced,setAnnounced] = useState([]);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [showBackdrop, setShowBackdrop] = useState(false);

    useEffect(() =>{
        async function Fetch(){
          setShowBackdrop(true);
          let response = await FetchingAnnounce.FETCH_ANNOUNCE();
          let acc = await ListAccess.ACCESS()
          const empacc = acc.data.result?.filter(data => data.employeeName === admin[0].name)
          setAccess(empacc)
          const dat = response.data.Announce
          setAnnounced(dat.reverse())
          setShowBackdrop(false);
        }
        Fetch()
    },[])

    const AnnouncedList = announced?.map((data,index) =>{
      return (
        <>
        <div key={index}>
   <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.date}
        </Typography>
        <hr />
        <Typography variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2">
          {data.content}
        </Typography>
      </CardContent>
    </Card>
    </div>
        </>
      )
    })
    const Create = async() =>{

      if(title === '' || content === ''){
        swal({
          text: 'Please Provide necessary Information',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content',content)
      setShowBackdrop(true);
      await CreateAnnouncement.CREATE_ANNOUNCEMENT(formData)
      .then(res => {
        const announce = res.data.Announce
        setAnnounced(announce.reverse());
        setShowBackdrop(false);
        swal({
          title: "Success",
          text: "Being Announced!",
          icon: "success",
          button: "OK",
        });
      }
       )
      .catch(err => console.log(err));
    }
  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
    <div className="scholarships" style={{backgroundColor:'whitesmoke'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <Typography style={{display:'flex',fontSize:29,justifyContent:'center',fontWeight:'bold',marginBottom:'20px',color:'#666'}}>
        Announcements
        </Typography>
          <div style={{backgroundColor:'#f1f3fa',width:'100%',height:'100vh',overflow:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:'90%',height:'100%',display:'flex'}}>
              <div style={{width:'50%',height:'100%'}}>
              <Card sx={{width:'100%',height:'max',paddingBottom:'30px'}}>
                <Typography style={{marginTop:'10px',marginLeft:'15px',fontWeight:'bold',fontSize: 27,color:'#666'}}>
                Create Announcement
                </Typography>

                <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Title
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Content:
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField multiline
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    rows={10} fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <button className='btnofficials1' onClick={Create} variant='contained'>Announce</button>

              </div>
              </Card>
              </div>
              <div style={{marginLeft:'10px',marginRight:'10px',width:'50%',height:'600px',overflow:'auto',display:'flex',flexDirection:'column'}}>
              <h1 style={{color:'#666'}}>Announced</h1>
                {AnnouncedList}
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Announcement