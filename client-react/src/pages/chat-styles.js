import { styled } from '@mui/material/styles';
import { Grid, Button, TextField } from '@mui/material';

// styled components

const OuterChatContainer = styled('div')((theme) => ({
  borderRadius: '16px', 
  backgroundColor: 'white', 
  boxShadow: '2px 2px 4px lightgrey',
  flex: 1, 
  display: 'flex', 
  flexDirection: 'column',
  border: '1px solid #E0E0E0',
  maxHeight: '750px',
  overflow: 'hidden',
}))

const ChatHistoryContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  flex: 1,
  overflowY: 'auto',
  minHeight: '300px',
}));

const ChatBubble = styled('div')(({ theme, isCurrentUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: '16px',
  wordWrap: 'break-word',
  margin: theme.spacing(1),
  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
  backgroundColor: isCurrentUser ? '#55C2C3' : '#F6F8F6',
  color: isCurrentUser ? 'white' : '#7E8C9C',
  position: 'relative', 
  boxShadow: '2px 2px 4px lightgrey',
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
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '8px',
  borderRadius: '16px',
});

const InputField = styled(TextField)({
  width: '100%',
  flex: 1,
  borderRadius: '16px',
  paddingRight: '8px',
  paddingLeft: '8px',
  margin: '8px',
  boxShadow: '0px 2px 4px lightgrey',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'lightgrey', 
    },
    '&.Mui-focused fieldset': {
      borderColor: '#55C2C3', 
    },
  },
});

const SendButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  marginBottom: '8px',
  boxShadow: '0px 2px 4px lightgrey',
  backgroundColor: '#55C2C3', 
  color: 'white', 
  '&:hover': {
    backgroundColor: '#55C2C3', 
  },
}));

export {
  OuterChatContainer,
  ChatHistoryContainer,
  ChatBubble,
  Timestamp,
  FormContainer,
  InputField,
  SendButton,
};
