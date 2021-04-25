import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import ThumbDownAltTwoToneIcon from '@material-ui/icons/ThumbDownAltTwoTone';
import ReviewList from './ReviewList';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    opacity: 1
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [thumbsUp, setThumbsUp] = React.useState('Tell us what you love.');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleWriteReview= () => {
    setThumbsUp('Tell us what you love.'); 
    setOpen(true);
};

const handleWriteNegativeReview= () => {
    setThumbsUp('Tell us what we can improve.'); 
    setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <div>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            DL
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Sara"
        subheader="Nail Technician"
      />
      <CardMedia
        className={classes.media}
        image="/images/salon.jpg"
        title="Dani Salon"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Your information.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Tell us what you love." onClick={handleWriteReview}>
          <ThumbUpAltTwoToneIcon />
        </IconButton>
        <IconButton aria-label="Tell us what we can improve." onClick={handleWriteNegativeReview}>
          <ThumbDownAltTwoToneIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Salon Description is the placeholder and we are just writing some text as a placeholder.</Typography>
          <Typography paragraph>Reviews</Typography>
          <ReviewList/>
          
        </CardContent>
      </Collapse>
    </Card>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{thumbsUp}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a review, please add text to the field and save.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter review"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;