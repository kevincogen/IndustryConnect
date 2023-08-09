import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NetworkButton from '../buttons/network-button';


const Root = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)',
  fontSize: 14,
}));

const Label = styled('label')({
  padding: '0 0 4px',
  lineHeight: 1.5,
  display: 'block',
});

const InputWrapper = styled('div')(({ theme }) => ({
  width: 300,
  border: `1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'}`,
  backgroundColor: theme.palette.mode === 'dark' ? '#141414' : '#fff',
  borderRadius: 4,
  padding: '1px',
  display: 'flex',
  flexWrap: 'wrap',
  '&:hover': {
    borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff',
  },
  '&.focused': {
    borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff',
    boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
  },
  '& input': {
    backgroundColor: theme.palette.mode === 'dark' ? '#141414' : '#fff',
    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)',
    height: 30,
    boxSizing: 'border-box',
    padding: '4px 6px',
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
  },
}));

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 24,
  margin: 2,
  lineHeight: 22,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'}`,
  borderRadius: 2,
  boxSizing: 'content-box',
  padding: '0 4px 0 10px',
  outline: 0,
  overflow: 'hidden',
  '&:focus': {
    borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff',
    backgroundColor: theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff',
  },
  '& span': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  '& svg': {
    fontSize: 12,
    cursor: 'pointer',
    padding: 4,
  },
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 300,
  margin: '2px 0 0',
  padding: 0,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'dark' ? '#141414' : '#fff',
  overflow: 'auto',
  maxHeight: 250,
  borderRadius: 4,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: 1,
  '& li': {
    padding: '5px 12px',
    display: 'flex',
    '& span': {
      flexGrow: 1,
    },
    '& svg': {
      color: 'transparent',
    },
  },
  '& li[aria-selected="true"]': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa',
    fontWeight: 600,
    '& svg': {
      color: '#1890ff',
    },
  },
  '& li[data-focus="true"]': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff',
    cursor: 'pointer',
    '& svg': {
      color: 'currentColor',
    },
  },
}));


export default function SearchBar({ options, defaultValue, onChange }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
    setValue,
  } = useAutocomplete({
    id: 'SearchBar',
    defaultValue: defaultValue,
    multiple: true,
    options: options,
  });

  //notify parent component the value changed
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (

      <Root>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>Industry Lookup</Label>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {value.map((option, index) => (
              <StyledTag label={option} {...getTagProps({ index })} />
            ))}
            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </Root>
  );
}

SearchBar.propTypes = {
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.array,
};
