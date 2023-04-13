import * as React from 'react';

import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';

import NotificationsIcon from '@mui/icons-material/Notifications';

import {Autocomplete, TextField} from "@mui/material";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

import Chip from '@mui/material/Chip';

import FormControlLabel from '@mui/material/FormControlLabel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const mdTheme = createTheme();
function createData(id,platform, location, keyword, author,country ) {
    try {
      return {"id":id, "platform":platform,"location":location,"keyword":keyword.toString(), "authors":author.toString(), "country":country.toString()};
    } catch (error) {
  // Expected output: ReferenceError: nonExistentFunction is not defined
  // (Note: the exact output may be browser-dependent)
}
}

let rows = [
    createData(" "," "," ",[],[],[])
];

function preventDefault(event) {
  event.preventDefault();
}

function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Keywords</TableCell>
            <TableCell>Authors</TableCell>
            <TableCell align="right">Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (

            <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>

              <TableCell>{row.platform}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.keyword}</TableCell>
              <TableCell>{row.authors}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
function DashboardContent() {





  const [open, setOpen] = React.useState(true);
  const [platform, setPlatform] = React.useState([]);
  const [journal, setJournal] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);
  const [isContains, setIsContains] = React.useState(false);
  const [isGeo, setisGeo] = React.useState(false);
  const [beginCitationDate, setBeginCitationdate] = React.useState(null);
  const [endCitationDate, setEndCitationdate] = React.useState(null);
  const [beginReleaseDate, setBeginReleaseDate] = React.useState(null);
  const [endReleaseDate, setEndReleaseDate] = React.useState(null);
  const [data, setData] = React.useState(null)
  const [LongTopleftMarker,setLongTopleftMarker] = React.useState(0)
  const [LongBottomrightMarker,setLongBottomrightMarker] = React.useState(0)
  const [LatTopleftMarker,setLatTopleftMarker] = React.useState(0)
  const [LatBottomrightMarker,setLatBottomrightMarker] = React.useState(0)
  const [beginTemporalExtent, setBeginTemporalExtent] = React.useState(null);
  const [endTemporalExtent, setEndTemporalExtent] = React.useState(null);
  const [publicationName, setPublicationName] = React.useState([])


  const onChangePlatform = (event, value) => {

    setPlatform(value.map((r)=>{
          console.log(r);
      return r.title}))
  }
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const platforms = [
    { title: 'PDB', year: 1994 },
    { title: 'ODATIS', year: 1972 },
    { title: 'AERIS', year: 1972 },
  ];


  const handleLatTopleftMarker= (event)=>{

    setLatTopleftMarker(event.target.value)
  }
  const handleLongTopleftMarker= (event)=>{

    setLongTopleftMarker(event.target.value)
  }
  const handleLatBottomrightMarker= (event)=>{

    setLatBottomrightMarker(event.target.value)
  }
  const handleLongBottomrightMarker= (event)=>{

    setLongBottomrightMarker(event.target.value)
  }
  const handleEndCitationDate= (event)=>{
    try{
    setEndCitationdate(event.$y)
    }
    catch{
        setEndCitationdate(null)
    }

  }
  const handleBeginCitationDate= (event)=>{
    try{
    setBeginCitationdate(event.$y)
    }
    catch {
        setBeginCitationdate(null)
    }

  }
  const handleEndReleaseDate= (event)=>{

    try {
        setEndReleaseDate(event.toISOString())
    }
    catch {
        setEndReleaseDate(null)
    }
  }
  const handleBeginTemporalExtent= (event)=>{
    try{
    setBeginTemporalExtent(event.toISOString())
    }
    catch {
        setBeginTemporalExtent(null)
    }

  }
  const handleEndTemporalExtent= (event)=>{
    try {
        setEndTemporalExtent(event.toISOString())
    }
    catch {
        setEndTemporalExtent(null)
    }
  }
  const handleBeginReleaseDate= (event)=>{
    try {
        setBeginReleaseDate(event.toISOString())
    }
    catch{
        setBeginReleaseDate(null)
    }
}
  function handleisGeo(event, value){

      setisGeo(value);

  }
  function handleisContains(event){
      setIsContains(event.target.checked);
  }

  const onChangebeginCitationDate= (event, date)=>{
    setBeginCitationdate(date)
  }
  // console.log(platform)
   function callAPI() {
       let head = {}
       head["platform"]=platform.map((r)=>{return r.title})
        head["journals"]=journal
       head["keywords"]=keywords
        head["isContains"]=isContains.toString()
       head["publicationName"]=publicationName
       if (beginCitationDate !== null){
            head["beginCitationDate"]=beginCitationDate
       }
       if (endCitationDate !== null){
            head["endCitationDate"]=endCitationDate
       }
       if (beginReleaseDate !== null){
            head["beginReleaseDate"]=beginReleaseDate
       }
       if (endReleaseDate !== null){
            head["endReleaseDate"]=endReleaseDate
       }
       if (beginTemporalExtent !== null){
            head["beginTemporalExtent"]=beginTemporalExtent
       }
       if (endTemporalExtent !== null){
            head["endTemporalExtent"]=endTemporalExtent
       }
       if (journal.length > 0 ){
           head["journals"]=journal
       }
       if (platform.length>0){
           head["platform"]=platform
           head["isContains"]=isContains.toString()
       }

        if (isGeo){
            head["isGeo"]=isGeo
            head["Northlat"]=LatTopleftMarker
            head["Westlong"]=LongTopleftMarker
            head["Southlat"]=LatBottomrightMarker
            head["Eastlong"]=LongBottomrightMarker
        }
         axios.get("http://localhost:5000/get_metadata",{headers:head}).then(res => {
         // Handle Your response here.
         // Likely you may want to set some state
         setData(res.data);
          if (res.data!= null){
          rows=res.data.map(r=>{
            return createData(r.id,r.platform,r.location, r.keyword, r.author, r.country)
        })
          }
      });
   };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={!open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '0px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Research integrated metadata
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    <h3>Associated publication : publication year</h3>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker label="Begin" view={"year"} views={["year"]} onChange={handleBeginCitationDate}/>

                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>


                    <DatePicker label="End" view={"year"} views={["year"]} onChange={handleEndCitationDate}/>
                  </LocalizationProvider>

                </Paper>
              </Grid>

                <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    <h3>Dataset : release date</h3>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker label="Begin"  onChange={handleBeginReleaseDate}/>

                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>


                    <DatePicker label="End" onChange={handleEndReleaseDate}/>
                  </LocalizationProvider>

                </Paper>
              </Grid>

                <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    <h3>Dataset (content) : temporal extent (period)</h3>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker label="Begin" onChange={handleBeginTemporalExtent}/>

                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>


                    <DatePicker label="End"  onChange={handleEndTemporalExtent}/>
                  </LocalizationProvider>

                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={platforms}
                      defaultValue={[]}
                    getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                          <TextField {...params} label="Platform" placeholder="Favorites" />
                      )}
                      sx={{ width: '100%' }}
                      onChange={onChangePlatform}
                  />
                </Paper>
              </Grid>

                <Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                ><h3>Associated publication : journal name</h3>
                <Autocomplete
                        value={journal}
                        onChange={(event, newValue) => {
                          setJournal(newValue);
                        }}
                        multiple
                        id="tags-filled"
                        options={journal}
                        freeSolo
                        renderTags={(journal: string[], getTagProps) =>
                          journal.map((option: string, index: number) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            label="Journal title"
                            placeholder="Search"
                          />
                        )}
                      />

                    </Paper>

              </Grid><Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                ><h3>Associated publication : publication title</h3>
                <Autocomplete
                        value={publicationName}
                        onChange={(event, newValue) => {
                          setPublicationName(newValue);
                        }}
                        multiple
                        id="tags-filled"
                        options={publicationName}
                        freeSolo
                        renderTags={(publicationName: string[], getTagProps) =>
                          publicationName.map((option: string, index: number) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            label="Publication title"
                            placeholder="Search"
                          />
                        )}
                      />

                    </Paper>

              </Grid>
                <Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                ><h3>Content : keywords</h3>
                <Autocomplete
                        value={keywords}
                        onChange={(event, newValue) => {
                          setKeywords(newValue);
                        }}
                        multiple
                        id="tags-filled"
                        options={keywords}
                        freeSolo
                        renderTags={(keywords: string[], getTagProps) =>
                          keywords.map((option: string, index: number) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            label="Keywords"
                            placeholder="Search"
                          />
                        )}
                      />

                    </Paper>

              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <h3>Content : Spatial extent</h3>
                      {/*<Button variant="contained" onClick={() => callAPI()}>Search</Button>*/}
                    <FormGroup>
                      <FormControlLabel  control={<Checkbox  onChange={handleisGeo} />} label="Request on spatial extent" />
                     </FormGroup>


                 <TextField
                      id="standard-number"
                      label="North lattitude"
                      type="number"
                      inputProps={{step:0.01 }}
                      InputLabelProps={{
                        shrink: true,

                      }}
                      variant="standard"
                      value={LatTopleftMarker}
                      onChange={handleLatTopleftMarker}
                    /><TextField
                      id="standard-number"
                      label="South latitude"
                      type="number"
                      inputProps={{step:0.01 }}
                      InputLabelProps={{
                        shrink: true,

                      }}
                      variant="standard"
                      value={LatBottomrightMarker}
                      onChange={handleLatBottomrightMarker}
                    />
                    <TextField
                      id="standard-number"
                      label="East longitude"
                      type="number"
                      inputProps={{step:0.01 }}
                      InputLabelProps={{
                        shrink: true,

                      }}
                      variant="standard"
                      value={LongBottomrightMarker}
                      onChange={handleLongBottomrightMarker}
                    />



                    <TextField
                      id="standard-number"
                      label="West longitude"
                      type="number"
                      inputProps={{step:0.01 }}
                      InputLabelProps={{
                        shrink: true,

                      }}
                      variant="standard"
                      value={LongTopleftMarker}
                      onChange={handleLongTopleftMarker}
                    />
                </Paper>
              </Grid>



              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Button variant="contained" onClick={() => callAPI()}>Search</Button>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>


            </Grid>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

