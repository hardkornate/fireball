import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    total: {
      backgroundColor: 'currentColor',
      display: 'flex',
      alignItems: 'center',
      padding: '0 0 0 4px',
      justifyContent: 'center',
      fontWeight: 600,
      border: `3px solid ${alpha(theme.palette.secondary.dark, 0.5)}`,
      '& span': {
        color: theme.palette.secondary.main
      }
    },
    totalValueLoader: {
      width: 60,
      height: 26,
      backgroundColor: 'currentcolor'
    }
  })
);
