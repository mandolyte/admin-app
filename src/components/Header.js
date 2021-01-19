import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@components/Drawer'
import BibleReference from '@components/BibleReference'
import { AuthContext } from '@context/AuthContext'
// TODO: Enable buttons once ready to fully implement functionality
// import LinkIcon from '@material-ui/icons/Link'
// import Button from '@material-ui/core/Button'
// import SubmitButton from '@components/SubmitButton'
// import ShareIcon from '@material-ui/icons/Share'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    minWidth: '40px',
    padding: '5px 0px',
    marginRight: theme.spacing(3),
  },
  icon: {
    width: '40px',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  navigation: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default function Header({ title, authentication: { user } }) {
  const classes = useStyles()
  const router = useRouter()
  const [drawerOpen, setOpen] = useState(false)

  const { logout } = useContext(AuthContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <header>
      <AppBar position='static'>
        <Toolbar>
          <div className='flex flex-1 justify-center items-center'>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              className={classes.title}
              onClick={() => router.push('/')}
            >
              {title}
            </Typography>
          </div>
          <div className={classes.navigation}>
            <BibleReference />
          </div>
          <div className='flex flex-1 justify-end'>
            {/* <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {}}
            >
              <LinkIcon classes={{ root: classes.icon }} htmlColor='#ffffff' />
            </Button>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => {}}
            >
              <ShareIcon classes={{ root: classes.icon }} htmlColor='#ffffff' />
            </Button>
            <SubmitButton variant='contained' disableElevation active={false} /> */}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        user={user}
        logout={logout}
        open={drawerOpen}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
      />
    </header>
  )
}

Header.propTypes = {
  authentication: PropTypes.object,
}
