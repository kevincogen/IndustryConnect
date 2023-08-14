import React from "react";
import ProfileCard from "./ProfileCard";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MatchList from "./MatchTable";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = ({ currentUser, connectHistory, passHistory, profiles, refreshMatches }) => {
  return (
    <Container className="profile-sidebar">
      <ProfileCard profile={currentUser} />
      <h3>Match List</h3>
      <MatchList currentUser={currentUser} refreshMatches={refreshMatches}/>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="connectHistory-content"
          id="connectHistory-header"
        >
          <h3>Connect History</h3>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="passHistory-content"
          id="passHistory-header"
        >
          <h3>Pass History</h3>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default Sidebar;


