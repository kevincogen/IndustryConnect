import { styled } from '@mui/material/styles';
import { ListItem, Avatar, ListItemAvatar, ListItemText, ListItemButton, Box } from '@mui/material';

// Styled components
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  borderRadius: '10px',
  boxShadow: '2px 2px 4px lightgrey',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
  padding: theme.spacing(1),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '50px',
  height: '50px',
}));

const AvatarContainer = styled(ListItemAvatar)(({ theme }) => ({
  minWidth: '30px',
  minHeight: '30px',
}));

const AvatarAndNameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: '#7E8C9C',
  '& .MuiTypography-root': {
    fontSize: '14px',
  },
  '&:hover': {
    color: '#55C2C3',
    backgroundColor: '#F6F8F6',
    borderRadius: '14px',
    padding: theme.spacing(0.25),
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  marginTop: theme.spacing(1),
  '&:hover': {
    color: '#55C2C3',
    backgroundColor: 'transparent',
  },
}));


const RatingAndChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  marginTop: theme.spacing(-2),
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(1)
}));


export {
  StyledListItem,
  StyledAvatar,
  AvatarContainer,
  AvatarAndNameContainer,
  StyledListItemText,
  StyledListItemButton,
  RatingAndChatContainer,
  StyledBox,
}