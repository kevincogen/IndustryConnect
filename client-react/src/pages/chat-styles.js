import { styled } from '@mui/material/styles';
import { Grid, Button, TextField } from '@mui/material';

// styled components

const ChatHistoryContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ChatBubble = styled('div')(({ theme, isCurrentUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: '16px',
  wordWrap: 'break-word',
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
  backgroundColor: isCurrentUser ? '#007bff' : '#f0f0f0',
  color: isCurrentUser ? 'white' : 'black',
  position: 'relative', 
  boxShadow: '0px 2px 4px lightgrey',
}));

const Timestamp = styled('span')(({ theme, isCurrentUser }) => ({
  fontSize: '12px', 
  color: theme.palette.grey[500], 
  position: 'absolute',
  bottom: '-16px', 
  marginLeft: theme.spacing(1.5),
  marginRight: theme.spacing(1.5),
  left: isCurrentUser ? 'auto' : '0',
  right: isCurrentUser ? '0' : 'auto',
  transform: isCurrentUser ? 'translateX(8px)' : 'translateX(-8px)',
  whiteSpace: 'nowrap', 
}));


const FormContainer = styled('form')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '8px',
  borderRadius: '16px',
});

const InputField = styled(TextField)({
  flex: 1,
  borderRadius: '16px',
  paddingRight: '8px',
  paddingLeft: '8px',
  marginLeft: '8px',
  marginRight: '8px',
  boxShadow: '0px 2px 4px lightgrey',
  marginBottom: '8px',
});

const SendButton = styled(Button)({
  borderRadius: '16px',
  marginBottom: '8px',
  boxShadow: '0px 2px 4px lightgrey',
});

export {
  ChatHistoryContainer,
  ChatBubble,
  Timestamp,
  FormContainer,
  InputField,
  SendButton,
};
