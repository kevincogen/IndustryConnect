import { Card, CardContent, CardMedia, Button, Typography, CardActions } from '@mui/material';

function ProfileCard({ profile }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={profile.profile_picture}
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
      </CardContent>
      <CardActions>
        <Button size="small" href={profile.linkedin} target="_blank">
          LinkedIn
        </Button>
        <Button size="small" href={profile.github} target="_blank">
          GitHub
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProfileCard;

