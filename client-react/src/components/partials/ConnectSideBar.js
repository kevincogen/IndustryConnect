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
import { styled } from '@mui/material/styles';
import { StyledAvatar } from "./MatchTable-styles";


const Sidebar = ({ currentUser, connectHistory, passHistory, profiles, refreshMatches }) => {

  const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginTop: theme.spacing(2),   
    boxShadow: '2px 2px 4px lightgrey',
    borderRadius: '15px',
  }));
  
  return (
    <Container className="profile-sidebar">
      <ProfileCard profile={currentUser} sideBarStyle={true} />
      <h3>Match List</h3>
      <MatchList currentUser={currentUser} refreshMatches={refreshMatches}/>
      <StyledAccordion>
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
      </StyledAccordion>
      <StyledAccordion>
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
      </StyledAccordion>
    </Container>
  );
};

export default Sidebar;


