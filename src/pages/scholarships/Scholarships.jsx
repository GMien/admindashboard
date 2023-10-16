import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./scholarships.scss"
import { Box, Modal,Button,TextField, Typography, InputLabel} from "@mui/material"; 
import './scholarship.css'
import { FetchingSchoProg, CreateSchoProg, UpdateSchoProg } from "../../api/request";
import { useEffect } from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import swal from "sweetalert";
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../Button style/button.css'
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import CustomNoRowsOverlay from "../Design/Norows";
import { MdClear } from "react-icons/md";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: 'white', 
    fontWeight:'bold',
    backgroundColor:'#0047a4',
    fontWeight:'bold'
  },
});


const StyledButton = styled(Button)`
  && {
    float: right;
    background-color: red;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;


const Scholarships = () => {
    const [schocat, setSchocat] = useState([]);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [icon, setSchoimg] = useState(null);
    const [title, setSchotitle] = useState('');
    const [description, setSchodesc] = useState('');
    const [status, setStatusCheck] = useState('');
    const [icon1, setSchoimg1] = useState(null);
    const [titleu, setSchotitle1] = useState('');
    const [descriptionu, setSchodesc1] = useState('');
    const [statusu, setStatusCheck1] = useState('');
    const [olddata, setOlddata] = useState([]);
    const [iconprev, setSchoprev] = useState();
    const [iconprev1, setSchoprev1] = useState();

  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const handleOpen1 = (data) => {
    setOlddata(data)
    setOpen1(true);
  }
  const handleClose1 = () => setOpen1(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'maxContent',
    bgcolor: 'background.paper',
    padding:'50px 10px 10px 20px',
    borderRadius:'5px'
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        setShowBackdrop(true);
        const response = await FetchingSchoProg.FETCH_SCHOPROG()
        
        setSchocat(response.data.SchoCat);
        setShowBackdrop(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData()
  }, []);

  useEffect(() => {
    if (!icon) {
      setSchoprev(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(icon);
    setSchoprev(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [icon])
  useEffect(() => {
    if (!icon1) {
      setSchoprev1(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(icon1);
    setSchoprev1(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [icon1])

  function Create(event){
    event.preventDefault();
    if(title === '' || description === '' || status === ''){
      swal({
        text: 'Please Provide necessary Information',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return
    }
    if(icon === null){
      swal("Error!", "Image must be selected and have a valid file format(PNG or JPEG only).", "error");
      return
    }
    const fileExtension = icon.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
      setSchoimg(null)
      return false;
    }
    const data = {icon,title,description,status};
    setOpen(false)
    setShowBackdrop(true);
    CreateSchoProg.CREATE_SCHOPROG(data)
    .then(res => {
      setSchocat(res.data.SchoCat)
      setSchodesc('')
      setSchoimg('')
      setStatusCheck('');
      setSchotitle('')
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Scholarship Program has been Added!",
        icon: "success",
        button: "OK",
      });
    }
     )
    .catch(err => console.log(err));
}

function Edit(event){
  event.preventDefault();

  if(icon1 === null){
    swal("Error!", "Image must be selected and have a valid file format(PNG or JPEG only).", "error");
    return
  }

  const fileExtension = icon1.name.split('.').pop().toLowerCase();
  if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
    swal({
      text: 'Please upload a PNG or JPG image only.',
      timer: 2000,
      buttons: false,
      icon: "error",
    });
  
    return false;
  }
  const schoid =  olddata.schoProgId;
  const icon = icon1 || olddata.icon;
  const title1 = titleu || olddata.name;
  const description1 = descriptionu || olddata.description;
  const status1 = statusu || olddata.status; 
  const formData = new FormData();
  formData.append('title',title1);
  formData.append('description',description1);
  formData.append('status',status1);
  formData.append('icon',icon);
  formData.append('schoid',schoid);
  setOpen1(false)
  setShowBackdrop(true);
  UpdateSchoProg.UPDATE_SCHOPROG(formData)
  .then(res => {
    setSchocat(res.data.SchoCat)
    setShowBackdrop(false);
    swal({
      title: "Success",
      text: "Scholarship Program has been Changed!",
      icon: "success",
      button: "OK",
    });

  }
   )
  .catch(err => console.log(err));
}

const handleFileChange = (e) => {
  const file = e.target.files[0]; 
  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg')  {
      setSchoimg(file)
    } else {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "warning",
      });
      setSchoimg(null)
      return false;
    }
  }
};
const handleEditFileChange = (e) => {
  const file = e.target.files[0]; 

  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      setSchoimg1(file)
    } else {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "warning",
      });
      setSchoimg1(null)
      return false;
    }
  }
};

    const columns = [
      {
        field: 'icon',
        headerName: 'Program Logo',
        width: 150, 
        renderCell: (params) => {     
          return (
                <Avatar
                  alt="No Image"
                  src={params.value}
                  sx={{ width: 35, height: 35 }}
                />
          );},},
      {
        field: 'name',
        headerName: 'Scholarship Name',
        width: 270,
        editable: false,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 520,
        editable: false,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: false,
      },
      {
        field: 'insert',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <button className="btnofficials" onClick={() => handleOpen1(params.row)}>
            Edit Details
          </button>
        ),
      },
    ];
  return (
    <>
  <StyledBackdrop open={showBackdrop}>
    <CircularProgress color="inherit" />
  </StyledBackdrop>
{/* Modal for Add button */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <div style={{margin:5,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                  <Typography sx={{fontSize:22,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'27px'}}>
                  Create requirements for Scholarship Program
                  </Typography>
                  <Typography sx={{fontSize:14,fontWeight:400,color:'#000000',fontFamily:'Roboto Serif',lineHeight:'16px'}}>
                  Fill up the necessary details.
                  </Typography>
                  </div>
                <div style={{width:'50px',marginRight:'15px',height:'50px',marginTop:'-35px'}}>
                <button style={{height:'100%',backgroundColor:'red',color:'white',padding:'0px',width:'100%',border:'none',borderRadius:'5px'}} onClick={handleClose}>
                  <MdClear style={{fontSize:'30px',fontWeight:'700'}}/>
                </button>
                </div>
        </div>
        <div style={{width:'100%',height:'80%',display:'flex',marginTop:'20px'}}>
              
              <div style={{width:'40%',height:'100%'}}>
              <div style={{border:'2px solid #dcdcdc',height:'300px',display:'flex',borderRadius:'5px',justifyContent:'center',alignItems:'center'}}>
                {!iconprev ? (
                  <Typography sx={{textAlign:'center',marginBottom:'20px',fontSize:'25px',fontWeight:'bold'}}>
                    Scholarship Logo<br/> Preview
                  </Typography>
                ) : (
                <img style={{width: '100%',minHeight:'150px',objectFit:'contain'}} className='previmg' src={iconprev} alt=""/>
                )}
              </div>
                  <Button sx={{padding:'10px 0px 10px 0px',width:'100%'}}>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none',width:'100%'}}
                  type='file' id="input-with-sx" label="" variant="outlined" fullWidth
                  onChange={handleFileChange}/>
                  </Button>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography sx={{fontSize:'20px',fontWeight:'bold'}}>Scholarship Logo</Typography>
                </div>
              </div>
              <Card sx={{width:'55%',marginLeft:'10px',height:'100%'}} elevation={0}>
                <div style={{width:'100%'}}>
                  <Box sx={{ display: 'flex'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Scholarship</InputLabel>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Name</InputLabel>
                  </div> 
                  <div style={{width:'100%'}}>
                  <TextField fullWidth placeholder={olddata.name} id="input-with-sx" variant="outlined" size="large"
                    onChange={(e) => setSchotitle(e.target.value)}/>
                  </div>
                  </Box>
                  <div style={{display: 'flex',margin:'10px 0px 10px 0px'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Status</InputLabel>
                  </div>
                  <div style={{border:'2px solid #dcdcdc',width:'100%',paddingLeft:'20px',borderRadius:'5px',height:'58px',paddingTop:'6px'}}>
                  <RadioGroup
                      row
                      sx={{width:'100%'}}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={olddata.status}
                      value={status}
                      onChange={(e) =>{
                      const stat = e.target.value;
                        setStatusCheck(stat);
                      }}  
                    >
                
                  <FormControlLabel value="Open" control={<Radio />} label="Open"/>
                  <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" sx={{margin:'0px 50px 0px 50px'}}/>
                  <FormControlLabel value="Paused" control={<Radio />} label="Paused"/>
                  </RadioGroup>
                  </div>

                  </div>
                  <div style={{ display: 'flex'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Description</InputLabel>
                  </div> 
                  <div  style={{width:'100%'}}>
                  <TextField multiline
                  onChange={(e) => setSchodesc(e.target.value)}
                  value={description}
                    rows={9} fullWidth id="input-with-sx" variant="outlined" />
                  </div>
                </div>
                </div>
              </Card>
              
        </div> 
        <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                <button style={{marginRight:'10px'}} className='btnofficials1' onClick={handleClose}>Cancel</button>
                <button className="btnofficials" onClick={Create}>Create</button>
        </div>          
        </Box>
      </Modal>
{/* Modal for Edit button */}
      <Modal
        className="modalAddbtn"
        open={open1}
        onClose={handleClose1}
      >
      <Box sx={style}>
        <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
            <div style={{width:'100%'}}>
              <StyledButton sx={{float:'right',backgroundColor:'red',transition: 'opacity 0.3s ease','&:hover': {opacity: 0.8,}}} 
              variant="contained" onClick={handleClose1}> X </StyledButton>
            </div>
            <div style={{width:'100%',height:'10%'}}>
            <Typography sx={{fontSize:'30px',fontWeight:'700',textAlign:'center',color:'#666'}}>Edit Scholarship Program</Typography>
            </div>
            <div style={{width:'100%',height:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
              
              <div style={{width:'20%'}}>
                <Typography sx={{textAlign:'center',marginBottom:'20px'}}>Scholarship Logo Preview</Typography>
                {icon1 ? 
                (<img style={{width: '100%'}} className='previmg' src={iconprev1} alt=''/>) : 
                (<img style={{width: '100%'}} className='previmg' src={olddata.icon} alt=''/>)}
              </div>
                <Card sx={{width:'75%',marginLeft:'10px',paddingTop:'10px'}} elevation={2}>
                <div style={{width:'100%'}}>
                  <Typography sx={{marginLeft:'20px'}}>Scholarship Logo</Typography>
                  <Button>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none',marginLeft:'10px'}}
                  type='file' id="input-with-sx" label="" variant="outlined" 
                  onChange={handleEditFileChange}/>
                  </Button><br />
                  <CardContent>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField fullWidth placeholder={olddata.name} id="input-with-sx" label="Scholarship Name" variant="outlined" 
                    onChange={(e) => setSchotitle1(e.target.value)}/>
                </Box>
                  </Typography>
                </CardContent>
                  <div style={{width:'100%'}}>
                  <FormLabel sx={{marginLeft:'20px'}} id="demo-row-radio-buttons-group-label" className="status">Status</FormLabel>
                  <RadioGroup
                      row
                      sx={{marginLeft:'20px'}}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={olddata.status}
                      value={statusu || olddata.status}
                      onChange={(e) =>{
                      const stat = e.target.value;
                        setStatusCheck1(stat);
                      }}  
                    >
                
                  <FormControlLabel value="Open" control={<Radio />} label="Open" className="edtstatus"/>
                  <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" className="edtstatus"/>
                  <FormControlLabel value="Paused" control={<Radio />} label="Paused" className="edtstatus"/>
                  </RadioGroup>
                  </div>
                  <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Description:
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField multiline
                  onChange={(e) => setSchodesc1(e.target.value)}
                  placeholder={olddata.description}
                    rows={6} fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                </div>
                <div className="buttonbacapp2">
                <button onClick={handleClose1} className="myButton">Cancel</button>
                <button className="btnofficials" onClick={Edit}>Save</button>
                 </div>
                </Card>
            </div>
        </div>
      </Box>
      </Modal>
    <div className="scholarships">
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div className="top">
                <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 10px 0px 10px'}}>
                <p className="scorecardh">Scholarships Program 
                </p>
                <button className='btnofficials1' onClick={handleOpen}>Add</button>
                </div>
                <div className="dataGridCon">
                <CustomDataGrid
                  sx={{height:'100%'}}
                  rows={schocat}
                  columns={columns}
                  getRowId={(row) => row.schoProgId}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 25,
                      },
                    },
                  }}
                  slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                  }}
                  pageSizeOptions={[25]}  
                  disableRowSelectionOnClick
                />
                </div>
          </div>
        </div>
    </div>
  </>
  )
}

export default Scholarships