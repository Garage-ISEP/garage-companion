import { h } from 'preact';
import style from './style.scss'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'preact/hooks';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const message = [
    {
        image: '../../assets/tutorial/calendarNavTutorial.png',
        title : "Barre de navigation",
        content : "La barre de navigation va permettre de filtrer les évènements en fonction du lab qui les organise. Il suffit simplement de cliquer sur les labs les sélectionner/désélectionner. \n"
        + "Le bouton 'Préviously' permet quand à lui de choisir si l'on affiche ou non les anciens évènements " 

    },
    {
        image: "",
        title : "titre 1",
        content : "contenu 1"

    },
    {
        image: "",
        title : "titre 2",
        content : "contenu 2"

    },
    {
        image: "",
        title : "titre 3",
        content : "contenu 3"

    },
];

const useStyles = makeStyles({
    root: {
        maxWidth : 700
    },
    backdrop: {

    }
});

export default function Tutorial(){
    const [idMessage, setIdMessage] = useState(0);
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

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

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Accéder au tutoriel
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick={true}
                fullwidth={true}
                maxWidth = {false}
                className = {style.dialog}
                BackdropProps={{
                    classes :{
                        root : classes.backdrop
                    }
                }}
                PaperProps={{
                    classes : {
                        root : classes.root
                    }
                }}
            >
                <LinearProgress className={style.progress} variant="determinate" value={idMessage / (message.length-1) * 100} />

                <DialogTitle id="alert-dialog-title">{message[idMessage].title}</DialogTitle>

                <img className={style.imageTuto} src = {message[idMessage].image}/>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message[idMessage].content}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Quitter
                    </Button>

                    <Button onClick={incrementIdMessage} color="primary" autoFocus>
                        Suivant
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}