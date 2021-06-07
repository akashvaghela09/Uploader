import { Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: theme.typography.fontWeightRegular,
    },
    headerBG: {
        background: "#4FC3F7",
        // color: "white",
        fontWeight: "bold",
    },
    accordion: {
        width: "70%"
    }
}));


const FAQ = () => {
    const classes = useStyles();

    return (
        <Grid container md={12} direction="column" justify="center" alignItem="center" className={classes.root} style={{msOverflowStyle: "none"}}>
            <Grid container justify="center" md style={{msOverflowStyle: "none"}}>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.headerBG}
                >
                <Typography className={classes.heading}><b>Is Uploder Free ?</b></Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Typography>
                    Yes, It is completely free.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className={classes.headerBG}
                >
                <Typography className={classes.heading}><b>Do I need to Register ?</b></Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Typography>
                    It is not necessary to register to use Uploder. However, if you want to keep a history of your uploads, you can use your email address to Login.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className={classes.headerBG}
                >
                <Typography className={classes.heading}><b>Are there any limits to how the service can be used ?</b></Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Typography>
                There are no limits on how you use Uploder :<br/>
                - You download and upload at maximum speed. <br/>
                - No limits on the number of files uploaded. <br/>
                - No limit on file size. <br/>
                However, keep in mind that the more the service is solicited, the more likely it is to slow down. I recommend file sizes up to 10GB.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className={classes.headerBG}
                >
                <Typography className={classes.heading}><b>How long are my uploads accessible ?</b></Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Typography>
                Your uploads remain accessible indefinitely as long as they are regularly downloaded.<br/>
                After 10 days of inactivity, an upload can be deleted to free up space on the servers.<br/>
                An upload is considered inactive if it is not regularly downloaded by different IPs.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className={classes.headerBG}
                >
                <Typography className={classes.heading}><b>Can I recover uploads that have been deleted ?</b></Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Typography>
                No, that's not possible. When an upload is deleted, it is irreversible.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className={classes.headerBG}
                >
                <Typography className={classes.heading}><b>Is Uploder secure ?</b></Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Typography>
                Uploder uses Gofile API for file uploads and Separate MongoDB Database for file upload History. <br/>
                According to GoFile, All pages and file transfers are encrypted (download and upload). <br/>
                All servers use TLS1.2+, SHA256 and RSA-4096 for encryption <a style={{textDecoration: "none"}} href="https://www.ssllabs.com/ssltest/analyze.html?d=gofile.io">(Proof)</a>. <br/>
                If you want to encrypt your data before sending it to the Gofile servers, you can do so easily with Open Source software like <a style={{textDecoration: "none"}} href="https://www.7-zip.org/">7Zip</a>. 
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className={classes.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                className={classes.headerBG}
                >
                <Typography className={classes.heading}><b>What can I upload ?</b></Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Typography>
                You can upload anything as long as it's legal.
                </Typography>
                </AccordionDetails>
            </Accordion>
            </Grid>
            
        </Grid>
    )
}

export {FAQ}