import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cookies from 'universal-cookie';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

// Images
import makeACopy from '../../images/make-copy.jpg'
import shareSettings from '../../images/share-settings.jpg';
import sheetId from '../../images/sheet-id.jpg';
import loadDeck from '../../images/load-deck.jpg';
import publish from '../../images/publish-to-web.jpg';

const cookies = new Cookies();

export default function Intro(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const prevTab = (event, newValue) => {
        setValue(value - 1)
    }
    const nextTab = (event, newValue) => {
        setValue(value + 1)
    }

    const introOpen = useSelector((state) => state.introOpen)
    const dispatch = useDispatch();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        
        return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
            </div>
        );
    }

    function closeIntro() {
        dispatch({type: 'modals/setIntroOpen', value: false})
        let date = new Date();
        date.setTime(date.getTime()+(30*24*60*60*1000));
        cookies.set('prevViewed', '1', { path: '/', expires: date });
    }

    return (
        <Dialog open={introOpen} onClose={() => closeIntro()} className="intro-dialog">
            <AppBar position="static">
                <Tabs 
                    value={value}
                    onChange={handleChange} 
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="simple tabs example"
                >
                    <Tab label ="Intro"></Tab>
                    <Tab label ="Step 1"></Tab>
                    <Tab label ="Step 2"></Tab>
                    <Tab label ="Step 3"></Tab>
                    <Tab label ="Step 4"></Tab>
                    <Tab label ="Step 5"></Tab>
                </Tabs>
            </AppBar>
            <TabPanel className="step-intro" value={value} index={0}>
                <Typography>This app is designed to allow you to use spreadsheet data from your own Google Sheets to quiz yourself on translations.</Typography>
                <Typography>Follow this tutorial to learn how to format an existing sheet or create a new one to use with this app.</Typography>
                <Typography>If you want to test the functionality first, click the button below to load a demo deck. You can still view this tutorial any time you want by clicking "Open Tutorial" on the Deck Loader page.</Typography>
                <Button 
                    onClick={() => dispatch({type: 'deck/setDemoDrawer', value: true})}
                    variant="contained"
                    color="primary"
                    className="demo-btn"
                >Load a Demo Deck</Button>
            </TabPanel>
            <TabPanel className="step-one" value={value} index={1}>
                <Typography>You can make a spreadsheet from scratch if you'd like, but it's easiest to copy an existing template.</Typography>
                <Typography>To do this, open the <a href="https://docs.google.com/spreadsheets/d/1_qux2HIN3GhyYmaDF2KCg1JAAoe8c6xhPV228mR5hq8/edit?usp=sharing" target="_blank" rel="noopener noreferrer">demo Spreadsheet</a> and select "File { '>' } Make a Copy"</Typography>
                <img src={makeACopy} alt="Screenshot of 'Make a Copy' Button on demo Google Spreadsheet"/>
                <Button
                    variant="contained"
                    color="primary"
                    href="https://docs.google.com/spreadsheets/d/1_qux2HIN3GhyYmaDF2KCg1JAAoe8c6xhPV228mR5hq8/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                >Open Demo Spreadsheet</Button>
            </TabPanel>
            <TabPanel className="step-two" value={value} index={2}>
                <Typography>Make sure your sheet is formatted like this:</Typography>
                <TableContainer component={Paper} className="step-one">
                    <Table aria-label="simple table">
                        <TableHead background="primary">
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">A</TableCell>
                                <TableCell align="center">B</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" align="center">1</TableCell>
                                <TableCell align="left">Language 1</TableCell>
                                <TableCell align="left">Language 2</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align="center">2</TableCell>
                                <TableCell align="left">Spanish</TableCell>
                                <TableCell align="left">English</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align="center">3</TableCell>
                                <TableCell align="left">el / la</TableCell>
                                <TableCell align="left">the</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align="center">4</TableCell>
                                <TableCell align="left">hola</TableCell>
                                <TableCell align="left">Hello</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align="center">5</TableCell>
                                <TableCell align="left">adiós</TableCell>
                                <TableCell align="left">goodbye</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align="center">6</TableCell>
                                <TableCell align="left">hola</TableCell>
                                <TableCell align="left">Today</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align="center">7</TableCell>
                                <TableCell align="left">miércoles</TableCell>
                                <TableCell align="left">Wednesday</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography>The value for <strong>A1</strong> and <strong>B1</strong> should literally be <strong>"Language 1"</strong> and <strong>"Language 2"</strong></Typography>
                <Typography>The value of <strong>A2</strong> should be the name of the language you're learning. <strong>B2</strong> should be the name of your native language.</Typography>
                <Typography>The remaining cells for <strong>B</strong> should contain the words you want to learn in your native language. <strong>A</strong> should contain the translations.</Typography>
                <Typography>You can fill in these translations manually, or automate them using the GOOGLETRANSLATE functionality. You can see how to do that <a href="https://gsuitetips.com/tips/sheets/translate-languages-in-google-sheets/#:~:text=To%20get%20started%20simply%20enter,to%20more%20than%20one%20cell." target="_blank" rel="noopener noreferrer">here</a> (external link). Note that this method may not be as accurate as sourcing the translations from other sources.</Typography>
            </TabPanel>
            <TabPanel className="step-three" value={value} index={3}>
                <Typography>In order for this app to be able to access your sheet, you will need to publish it to the web.</Typography>
                <Typography>To do this, select "File > Publish to Web". You can use all the default settings.</Typography>
                <img src={publish} alt="Screenshot of Google Publish to Web Button" />
            </TabPanel>
            <TabPanel className="step-three" value={value} index={4}>
                <Typography>You will also need to set the share settings to "anyone with this link".</Typography>
                <Typography>To do this, click the "Share" button in the top right corner of the screen and then select "Change to anyone with link"</Typography>
                <img src={shareSettings} alt="Screenshot of Google sheet share settings" />
                <Typography>After the permissions are set, you need to get the spreadsheet ID to use with this app. To do this, select the characters after "/d/" and before "/edit". Copy this for the next step.</Typography>
                <img src={sheetId} alt="Screenshot of Google sheet share settings" />
            </TabPanel>
            <TabPanel className="step-four" value={value} index={5}>
                <Typography>You're almost done! Go ahead and close this tutorial and paste your Sheet ID in the input field under "Load Your Deck"</Typography>
                <img src={loadDeck} alt="Screenshot of ID input field" />
            </TabPanel>
            {value < 5 ?
            <ButtonGroup>
                {value > 0 ?
                <Button
                onClick={prevTab}
                variant="contained"
                >Previous</Button> : null }
                <Button
                onClick={nextTab}
                variant="contained"
                >{value === 0 ? 'Start Tutorial' : 'Next' }</Button>
            </ButtonGroup>
            :
            <ButtonGroup>
                <Button
                onClick={prevTab}
                variant="contained"
                >Previous</Button>
                <Button
                onClick={() => dispatch({type: 'modals/setIntroOpen', value: false})}
                variant="contained"
                color="secondary"
                >Close Tutorial</Button>
            </ButtonGroup>
            }
        </Dialog>
    )
}