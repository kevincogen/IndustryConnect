import { Card, CardContent, CardMedia, Button, Typography, CardActions } from '@mui/material';
import ConnectButton from '../buttons/connect-button';
import PassButton from '../buttons/pass-button.js';
import TinderCard from 'react-tinder-card'


function ProfileCard({ profile, connection, currentUser }) {
  const onSwipe = (direction) => {
    console.log(`you swiped: ${direction}`)
  };
  const onCardLeftScreen = (myIdentifier) => {
    console.log(`${myIdentifier} left the screen`)
  }
  // Check if profile or necessary keys are undefined or null
  if (!profile || !profile.first_name || !profile.last_name) {
    // You can render a placeholder or return null
    return <div>Profile not available</div>;
  }
  return (
    <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
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
        </CardContent>
        <CardActions>
          <Button size="small" href={profile.linkedin} target="_blank">
            LinkedIn
          </Button>
          <Button size="small" href={profile.github} target="_blank">
            GitHub
          </Button>
        </CardActions>
        <ConnectButton onClick={() => connection.handleConnect(profile, currentUser)} />
        <PassButton onClick={() => connection.handlePass(profile)} />
      </Card>
    </TinderCard>
  );
}

export default ProfileCard;

