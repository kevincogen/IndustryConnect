import React from "react";
import ProfileCard from "./ProfileCard";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MatchList from "./MatchTable";

const Sidebar = ({ currentUser, connectHistory, passHistory, profiles, refreshMatches }) => {
  console.log(currentUser)
  return (
    <Container className="profile-sidebar">
      <ProfileCard profile={currentUser} />
      <h3>Match List</h3>
      <MatchList currentUser={currentUser} refreshMatches={refreshMatches}/>
      <h3>Connect History</h3>
      <List>
        {connectHistory?.map((profileId, index) => {
          const profile = profiles.find(p => p.id === profileId);
          return (
            <ListItem key={index}>
              {profile?.first_name} {profile?.last_name}
            </ListItem>
          );
        })}
      </List>

      <h3>Pass History</h3>
      <List>
        {passHistory?.map((profileId, index) => {
          const profile = profiles.find(p => p.id === profileId);
          return (
            <ListItem key={index}>
              {profile?.first_name} {profile?.last_name}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Sidebar;

