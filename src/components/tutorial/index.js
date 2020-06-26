import { h } from 'preact';
import style from './style.scss'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useEffect } from 'preact/hooks';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

const versionTuto = 1;
const message = [
    {
        image: "../../assets/images/tutorial/logoGarage.png",
        title : "Bienvenue",
        content : "Bienvenue sur Garage Companion.\n "
                    + "Ce site a pour objectif de permettre aux isépiens de se renseigner et de pouvoir s'inscrire facilement aux évènements de GarageISEP. \n"
                    + "Souhaitez-vous voir en détail les différentes fonctionnalités offertes par ce site ?"
    },
    {
        image: '../../assets/images/tutorial/calendarNav.png',
        title : "Barre de navigation",
        content : "La barre de navigation va permettre de filtrer les évènements en fonction du lab qui les organise. Il suffit simplement de cliquer sur les labs pour les sélectionner ou désélectionner. \n"
                    + "Le bouton 'Previously' permet quand à lui de choisir si l'on affiche ou non les anciens évènements " 

    },
    {
        image: "../../assets/images/tutorial/event.png",
        title : "Les évènements",
        content : "Pour chacun des évènements, il est possible de se renseigner en appuyant sur le bouton \"EN SAVOIR PLUS\" ou de s'inscrire en appuyant sur le bouton \"S'INSCRIRE\""
    },
    {
        image: "../../assets/images/tutorial/addParticipantDialog.png",
        title : "S'inscrire",
        content : "Une fois que vous avez appuyé sur le bouton \"S'INSCRIRE\", une fenêtre s'ouvre et il ne vous reste plus qu'à renseigner votre adresse mail."
    },
];

const useStyles = makeStyles({
    root: {
        maxWidth : 700
    }
});

export default function Tutorial(){
    const [idMessage, setIdMessage] = useState(0);
    
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const [buttonPrevious, setButtonPrevious] = useState("Quitter");
    const [buttonNext, setButtonNext] = useState("Suivre le tutoriel");

    const handleClose = () => {
        setOpen(false);
    };
    
    const incrementIdMessage = () => {
        if(idMessage === message.length - 1){
            handleClose();
        }else{
            setIdMessage(idMessage + 1);
        }
    };

    const decrementIdMessage = () => {
        if(idMessage === 0){
            handleClose();
        }else{
            setIdMessage(idMessage - 1);
        }
    };

    useEffect(() => {
        if(idMessage === 0){
            setButtonPrevious("Quitter");
            setButtonNext("Suivre le tutoriel");
        }else if(idMessage === message.length - 1){
            setButtonPrevious("Précédent");
            setButtonNext("Terminer le tutoriel");
        }else{
            setButtonPrevious("Précédent");
            setButtonNext("Suivant");
        }
    });

    const isDone = () => { //verify if tuto is already done
        if(localStorage.getItem("versionTutorialDone")){
            if(localStorage.getItem("versionTutorialDone") == versionTuto){
                handleClose();
            }else{
                localStorage.versionTutorialDone = versionTuto;
            }
        }else{
            localStorage.versionTutorialDone = versionTuto;
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick={true}
                fullwidth={true}
                maxWidth = {false}
                onEnter = {isDone}
                className = {style.dialog}
                PaperProps={{
                    classes : {
                        root : classes.root
                    }
                }}
            >
                <LinearProgress className={style.progress} variant="determinate" value={idMessage / (message.length-1) * 100} />

                <DialogTitle id="alert-dialog-title">{message[idMessage].title}</DialogTitle>

                <Box className={style.imageBox}><img className={style.imageTuto} src = {message[idMessage].image}/></Box>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message[idMessage].content}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={decrementIdMessage} color="primary">
                        {buttonPrevious}
                    </Button>

                    <Button onClick={incrementIdMessage} color="primary" autoFocus>
                        {buttonNext}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}