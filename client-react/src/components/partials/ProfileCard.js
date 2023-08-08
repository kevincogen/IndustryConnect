import { Card, CardContent, CardMedia, Button, Typography, CardActions } from '@mui/material';
import ConnectButton from '../buttons/connect-button';
import PassButton from '../buttons/pass-button.js';
import TinderCard from 'react-tinder-card'
import Rating from '@mui/material/Rating';


function ProfileCard({ carousel, profile, connection, currentUser }) {

  // Check if profile or necessary keys are undefined or null
  if (!profile || !profile.first_name || !profile.last_name) {
    // You can render a placeholder or return null
    return <div>Profile not available</div>;
  }
  return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={profile.profile_picture || "default-image.jpg"} // Fallback image if undefined
          title="Profile Picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${profile.first_name} ${profile.last_name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.bio}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Education: {profile.education}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Experience: {profile.experience}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Industry: {profile.industry}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating:
          </Typography>
          <Rating name="half-rating-read" defaultValue={profile.average_rating} precision={0.5} readOnly size="small" />
        </CardContent>
        <CardActions>
          <Button size="small" href={profile.linkedin} target="_blank">
            LinkedIn
          </Button>
          <Button size="small" href={profile.github} target="_blank">
            GitHub
          </Button>
        </CardActions>
        {/* {carousel && 
        (<div className="connect-pass">
        <PassButton onClick={() => connection.handlePass(profile)} />
        <ConnectButton onClick={() => connection.handleConnect(profile, currentUser)} />
        </div>)} */}
      </Card>
  );
}

export default ProfileCard;

