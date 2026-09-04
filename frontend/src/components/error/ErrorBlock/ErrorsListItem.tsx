import ErrorIcon from '@mui/icons-material/Error';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface ErrorsListItemProps {
  error: Record<string, string | string[]>;
}

export function ErrorsListItem({ error }: ErrorsListItemProps) {
  return (
    <ListItem sx={{ pl: 0 }}>
      <ListItemIcon>
        <ErrorIcon />
      </ListItemIcon>
      <ListItemText>{error.message ?? JSON.stringify(error)}</ListItemText>
    </ListItem>
  );
}
