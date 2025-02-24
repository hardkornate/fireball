import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
  createStyles({
    gotchiSvg: {
      position: 'relative',
      '.haunt1 &': {
        backgroundColor: alpha(theme.palette.haunts.h1, 0.15)
      },
      '.haunt2 &': {
        backgroundColor: alpha(theme.palette.haunts.h2, 0.15)
      },
      '.narrowed &': {
        padding: 0,
        marginTop: 5,
        background: 'none'
      },
      '.horizontal &': {
        margin: '0 47px'
      }
    },
    svgWrapper: {
      position: 'relative',
      zIndex: 1,
      margin: 'auto',
      '& svg, & img': {
        display: 'block'
      },
      '& .gotchi-wearable': {
        transition: 'all .5s ease-in-out'
      },
      '& .gotchi-sleeves': {
        transition: 'all .5s ease-in-out'
      },
      '&.hide-wearables .gotchi-wearable:not(.wearable-bg), &.hide-wearables .gotchi-sleeves': {
        display: 'none'
      },
      '.hide-bg & .gotchi-wearable.wearable-bg': {
        display: 'none'
      },
      '.team &': {
        filter: 'sepia(0.6)',
        transition: '.3s'
      },
      '.team:hover &': {
        filter: 'none'
      },
      '&:hover': {
        '& .gotchi-wearable:not(.wearable-bg)': {
          opacity: 0
        },
        '& .gotchi-sleeves': {
          opacity: 0
        },
        '& .wearable-head': {
          transform: 'translateY(-5px) rotateZ(-45deg)'
        },
        '& .wearable-eyes': {
          transform: 'translateX(10px) rotateZ(5deg)'
        },
        '& .wearable-face': {
          transform: 'translateX(-10px) rotateZ(10deg)'
        },
        '& .wearable-body': {
          transform: 'translateY(10px) rotateZ(-5deg)'
        },
        '& .wearable-hand-right': {
          transform: 'translateX(5px) rotateZ(-5deg)'
        },
        '& .wearable-hand-left': {
          transform: 'translateX(-5px) rotateZ(5deg)'
        },
        '& .wearable-pet': {
          transform: 'translateY(5px)'
        }
      },
      '.team &:hover': {
        '& .gotchi-wearable:not(.wearable-bg)': {
          opacity: 1
        },
        '& .gotchi-sleeves': {
          opacity: 1
        },
        '& .wearable-head': {
          transform: 'none'
        },
        '& .wearable-eyes': {
          transform: 'none'
        },
        '& .wearable-face': {
          transform: 'none'
        },
        '& .wearable-body': {
          transform: 'none'
        },
        '& .wearable-hand-right': {
          transform: 'none'
        },
        '& .wearable-hand-left': {
          transform: 'none'
        },
        '& .wearable-pet': {
          transform: 'none'
        }
      }
    },
    gotchiSvgPortal: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      opacity: 0.5
    },
    gotchiHaunt: {
      color: '#000',
      textTransform: 'uppercase',
      position: 'absolute',
      right: 5,
      top: 5,
      '.team &': {
        display: 'none'
      }
    }
  })
);
