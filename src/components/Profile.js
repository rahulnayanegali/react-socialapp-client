import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// Redux
import { connect } from 'react-redux';
// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
	...theme.spreadIt
});

class Profile extends Component {
   handleImageChange = (event) => {
      const image = event.target.files[0];
      // send to server
   }
    render() {
      const { classes, 
              user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location }, 
                loading,
                authenticated,
              }
              } = this.props;
      
      let profileMarkup = !loading ? (authenticated ? (
         <Paper className={classes.paper}>
            <div className={classes.profile}>
               <div className="image-wrapper">
                  <img src={imageUrl} alt="profile" className="profile-image"/>
                  <input type="file" id="imageUnput" onChange={this.handleImageChange}/>
               </div>
               <hr/>
               <div className="profile-details">
               <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                  @{handle}
               </MuiLink>
               <hr/>
               {bio && <Typography variant="body2">{bio}</Typography>}
               <hr/>
               {location && (
                  <>
                     <LocationOnIcon color="primary"/>
                     <span>{location}</span>
                     <hr/>
                  </>)}
               {website && (
                  <>
                     <LinkIcon color="primary"/>
                     <a href={website} target="_blank" rel="noopener noreferrer">
                        {' '}{website}
                     </a>
                     <hr/>
                  </>)}
               <CalendarTodayIcon color="primary"/>
               <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
               <hr/>
               </div>
            </div>
         </Paper>
      ) : (
         <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
               No profile found, please login
            </Typography>
            <div className={classes.buttons}>
               <Button variant="contained" color="primary" component={Link} to="/login">
                  Login
               </Button>
               <Button variant="contained" color="primary" component={Link} to="/signup">
                  Signup
               </Button>
            </div>
         </Paper>
      )) : (<p>Loading...</p>)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));