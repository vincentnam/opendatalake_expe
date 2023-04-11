import * as React from 'react';

import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
import {Autocomplete, TextField} from "@mui/material";
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import {useCallback} from "react";
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import * as React from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Map from 'react-map-gl';
// Generate Order Data
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

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
      {/*<Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>*/}
      {/*  See more orders*/}
      {/*</Link>*/}
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
  const [beginDate, setBegindate] = React.useState(null);
  const [endDate, setEnddate] = React.useState(null);
  const [data, setData] = React.useState(null)
  const [LongTopleftMarker,setLongTopleftMarker] = React.useState(0)
  const [LongBottomrightMarker,setLongBottomrightMarker] = React.useState(0)
  const [LatTopleftMarker,setLatTopleftMarker] = React.useState(0)
  const [LatBottomrightMarker,setLatBottomrightMarker] = React.useState(0)




  const onChangePlatform = (event, value) => {
      // console.log(value)
      // console.log(value.title)
      // console.log(event)
      // console.log("TA MERe")
      // console.log(platform)
      // value.map((r)=>{
      //     console.log(r);
      // return r.title})
    setPlatform(value.map((r)=>{
          console.log(r);
      return r.title}))
    // platform.push(value.title)
  }
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const platforms = [
    { title: 'PDB', year: 1994 },
    { title: 'ODATIS', year: 1972 },
    { title: 'AERIS', year: 1972 },
  ];
  // let formattedDate = moment(beginDate).format('DD/MM/YYYY')
  // console.log(moment(beginDate.toDate()).format('DD/MM/YYYY'))
  // console.log(moment(endDate.toDate()).format('DD/MM/YYYY'))
  // console.log("prout")
  // console.log()
  // console.log(platform)

  const handleLatTopleftMarker= (event)=>{
    // console.log(date)
    setLatTopleftMarker(event.target.value)
  }
  const handleLongTopleftMarker= (event)=>{
    // console.log(date)
    setLongTopleftMarker(event.target.value)
  }
  const handleLatBottomrightMarker= (event)=>{
    // console.log(date)
    setLatBottomrightMarker(event.target.value)
  }
  const handleLongBottomrightMarker= (event)=>{
    // console.log(date)
    setLongBottomrightMarker(event.target.value)
  }
  const handleEndDate= (event)=>{
    // console.log(date)
    setEnddate(event.$y)
  }
  const handleBeginDate= (event)=>{
    // console.log()
    //   console.log(date)
    setBegindate(event.$y)
  }
  function handleisGeo(event, value){
      console.log("tamoresqd")
      console.log(event.target.checked)
      console.log(value)
      setisGeo(value);

  }
  function handleisContains(event){
      console.log(event)

      setIsContains(event.target.checked);
  }

  const onChangebeginDate= (event, date)=>{
    setBegindate(date)
  }
  // console.log(platform)
   function callAPI() {
      console.log(isContains)
       let head = {}
       head["platform"]=platform.map((r)=>{return r.title})
        head["journals"]=journal
       head["keywords"]=keywords
        head["isContains"]=isContains.toString()
       console.log()
       if (beginDate !== null){
           // head["beginDate"]=moment(beginDate.toDate()).format('YYYY/MM/DD')
            head["beginDate"]=beginDate
       }
       if (endDate !== null){
           // head["beginDate"]=moment(beginDate.toDate()).format('YYYY/MM/DD')
            head["endDate"]=endDate
       }
       if (journal.length > 0 ){
           head["journals"]=journal
       }
       if (platform.length>0){
           console.log(platform)
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
      // axios.get("http://localhost:5000/get_metadata",{headers:{"beginDate":moment(beginDate.toDate()).format('YYYY/MM/DD'),
      //     "endDate":moment(endDate.toDate()).format('YYYY/MM/DD'),"platform":platform.map((r)=>{return r.title}), "journals":journal, "isContains":isContains.toString(),
      //         "LatTopleft":LatTopleftMarker,"LongTopleft":LongTopleftMarker, "LatBottomright":LatBottomrightMarker, "LongBottomright":LongBottomrightMarker }}).then(res => {
      axios.get("http://localhost:5000/get_metadata",{headers:head}).then(res => {
         // Handle Your response here.
         // Likely you may want to set some state
         setData(res.data);
         console.log(data)
          if (res.data!= null){
          rows=res.data.map(r=>{
            return createData(r.id,r.platform,r.location, r.keyword, r.author, r.country)
        })
          }
          console.log(rows)

      });
   };
    console.log(beginDate)
    console.log(endDate)
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker label="Begin" view={"year"} views={["year"]} onChange={handleBeginDate}/>

                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>


                    <DatePicker label="End" view={"year"} views={["year"]} onChange={handleEndDate}/>
                  </LocalizationProvider>


                  {/*<TextField*/}
                  {/*    required*/}
                  {/*    id="outlined-required"*/}
                  {/*    label="Required"*/}
                  {/*    defaultValue="Hello World"*/}
                  {/*    value={value_text}*/}
                  {/*    onChange={onChangeText}*/}
                  {/*/>*/}
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
                  {/*  <Autocomplete*/}
                  {/*    multiple*/}
                  {/*    limitTags={2}*/}
                  {/*    id="multiple-limit-tags"*/}
                  {/*      */}
                  {/*    freeSolo={true}*/}
                  {/*    getOptionLabel={(option) => option.title}*/}
                  {/*    defaultValue={[]}*/}

                  {/*    renderInput={(params) => (*/}
                  {/*        <TextField {...params} label="Platform" placeholder="Favorites" />*/}
                  {/*    )}*/}
                  {/*    sx={{ width: '100%' }}*/}
                  {/*    onChange={onChangePlatform}*/}
                  {/*/>*/}

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
                >
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
                            label="Journal"
                            placeholder="Search"
                          />
                        )}
                      />

                    {/*<FormGroup>*/}
                      {/*<FormControlLabel  control={<Checkbox  onChange={handleisContains} />} label="Contains" />*/}
                     {/*</FormGroup>*/}
                    {/*<FormControl>*/}
                    {/*  <FormLabel id="demo-radio-buttons-group-label">Operation</FormLabel>*/}
                    {/*  <RadioGroup*/}
                    {/*    aria-labelledby="demo-radio-buttons-group-label"*/}
                    {/*    defaultValue="Contains"*/}
                    {/*    name="radio-buttons-group"*/}
                    {/*    onChange={handleisContains}*/}
                    {/*  >*/}
                    {/*    <FormControlLabel value={isContains} control={<Radio />} label="Contains" />*/}
                    {/*    <FormControlLabel value={!isContains}  control={<Radio />} label="Equals" />*/}
                    {/*  </RadioGroup>*/}
                    {/*</FormControl>*/}
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
                >
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

                    {/*<FormGroup>*/}
                      {/*<FormControlLabel  control={<Checkbox  onChange={handleisContains} />} label="Contains" />*/}
                     {/*</FormGroup>*/}
                    {/*<FormControl>*/}
                    {/*  <FormLabel id="demo-radio-buttons-group-label">Operation</FormLabel>*/}
                    {/*  <RadioGroup*/}
                    {/*    aria-labelledby="demo-radio-buttons-group-label"*/}
                    {/*    defaultValue="Contains"*/}
                    {/*    name="radio-buttons-group"*/}
                    {/*    onChange={handleisContains}*/}
                    {/*  >*/}
                    {/*    <FormControlLabel value={isContains} control={<Radio />} label="Contains" />*/}
                    {/*    <FormControlLabel value={!isContains}  control={<Radio />} label="Equals" />*/}
                    {/*  </RadioGroup>*/}
                    {/*</FormControl>*/}
                    </Paper>

              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      {/*<Button variant="contained" onClick={() => callAPI()}>Search</Button>*/}
                    <FormGroup>
                      <FormControlLabel  control={<Checkbox  onChange={handleisGeo} />} label="Geographic request ?" />
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
                                     <TextField
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


            {/*<Copyright sx={{ pt: 4 }} />*/}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

