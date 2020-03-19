import { h } from 'preact';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { addParticipant } from '../../utils/garage-api';
import { useState } from 'preact/hooks';

const AddParticipantDialog = ({ event, open, closeHandler }) => {
  const [email, setEmail] = useState('');
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState({
    done: false
  });

  const send = async () => {
    closeHandler();
    setFetching(true);
    const { calendar, id } = event;
    setResult({
      done: true,
      ...await addParticipant(calendar.id, id, email)
    });

    // Reset
    setFetching(false);
    setEmail('');
  }

  return (
    <div>
      <Dialog open={open} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">S'inscrire</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inscrivez-vous à <b>{event.summary}</b> en entrant votre e-mail. Cela vous permettra d'ajouter l'événement à votre calendrier !
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            value={email}
            onInput={e => setEmail(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>
            Retour
          </Button>
          <Button onClick={send}>
            S'inscrire
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={fetching}
        autoHideDuration={6000}
        message="En cours d'inscription..."
      />
      <Snackbar
        open={result.done}
        autoHideDuration={6000}
        onClose={() => setResult({...result, done: false})}
      >
        <Alert severity={result.success ? "success" : "error"}>{result.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default AddParticipantDialog;