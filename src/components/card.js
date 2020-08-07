import React from 'react'
import { useSpring, animated } from 'react-spring'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import './styles/card.css'


const AnimatedPaper = animated(Paper)
const styles = makeStyles({
  paper: {
    width: '100%',
    height: '100%',
    background: 'transparent',
    borderRadius: 16,
    transition: 'box-shadow 0.5s',
    justifyContent: 'center',
    '&:hover': {
      boxShadow: '0px 15px 30px -10px rgba(0, 0, 0, 0.4)'
    }
  },
  card: {
    borderRadius: 1,
    boxShadow: 'none',
    height: '100%'
  },
  media: {
    backgroundSize: 'contain',
  },
  svgmedia: {
    backgroundSize: 'contain',
  },
  content:{
    backgroundColor: '#fff',
    padding: '1rem 1.5rem 1.5rem',
    height: '100%'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#203f52',
    textTransform: 'uppercase',
  },
  subtitle: {
    justifySelf: 'flex-end',
    color: '#203f52',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 300,
    fontSize: 16,
  },
})


export default function OptionCard(props) {
  const {item: {id, title, subtitle, image}, handleOpen} = props
  const classes = styles()
  const mediaStyles = useFourThreeCardMediaStyles();
  const calc = (x, y) => [-(y - window.innerHeight / 2) / 1000, -(x - window.innerWidth / 2) / 1000, 1.01]
  const trans = (x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
  const [style, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 40, tension: 300, friction: 40, clamp: true } }))
  return (
    <AnimatedPaper
      // className="card"
      className={classes.paper}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      elevation={3}
      style={{ transform: style.xys.interpolate(trans) }}
    >
      <Card className={classes.card} onClick={() => handleOpen(id-1)}>
        <CardMedia classes={mediaStyles} className={classes.svgmedia} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </AnimatedPaper>
  )
}

export function CustomCard(props) {
  const {item: {title, subtitle, image}} = props
  const classes = styles()
  const mediaStyles = useFourThreeCardMediaStyles();

  return (

      <Card className={classes.card} >
        <CardMedia classes={mediaStyles} className={classes.media} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>

  )
}
