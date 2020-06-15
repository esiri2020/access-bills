import React from 'react'
import { useSpring, animated } from 'react-spring'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
// import TvIcon from '@material-ui/icons/Tv'
import { makeStyles } from '@material-ui/core/styles'
// import CardActionArea from '@material-ui/core/CardActionArea';
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
      boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.4)'
    }
  },
  card: {
    // minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
  },
  media: {
    backgroundSize: 'contain',
  },
  content:{
    backgroundColor: '#203f52',
    padding: '1rem 1.5rem 1.5rem',

  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '2rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#fff',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
})


export default function OptionCard(props) {
  const {title, subtitle, handleOpen} = props
  const classes = styles()
  const mediaStyles = useFourThreeCardMediaStyles();
  const calc = (x, y) => [-(y - window.innerHeight / 2) / 30, -(x - window.innerWidth / 2) / 30, 1.05]
  const trans = (x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
  const [style, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 20, tension: 300, friction: 40, clamp: true } }))
  return (
    <AnimatedPaper
      // className="card"
      className={classes.paper}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      elevation={3}
      style={{ transform: style.xys.interpolate(trans) }}
    >
      <Card className={classes.card} onClick={handleOpen}>
        <CardMedia classes={mediaStyles} className={classes.media} image='./images/tv.svg' />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            TV
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </AnimatedPaper>
  )
}
