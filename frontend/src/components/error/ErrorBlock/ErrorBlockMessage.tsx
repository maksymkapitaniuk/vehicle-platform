import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { ErrorsListItem } from './ErrorsListItem';
import type { ErrorBlockProps } from './ErrorBlock';
import { ValidationError } from '../../../util/errors';

export function ErrorBlockMessage({ error }: ErrorBlockProps) {
  if (
    error instanceof ValidationError &&
    error.errors &&
    error.errors.length > 0
  ) {
    return (
      <List dense>
        {error.errors.map((err) => (
          <ErrorsListItem error={err} key={JSON.stringify(err)} />
        ))}
      </List>
    );
  }

  return <Typography>{error.message}</Typography>;
}
