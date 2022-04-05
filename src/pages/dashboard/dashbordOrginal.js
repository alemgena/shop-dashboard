import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import OftadehLayout from '../../components/Layout/Layout'
import { Paper, Grid, makeStyles, Typography } from '@material-ui/core'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import OftadehChart from '../../components/OftadehChart/OftadehChart'
import OftadehBarChart from '../../components/OftadehChart/OftadehBarChart'
import OftadehPieChart from '../../components/OftadehChart/OftadehPieChart'
import SimpleTable from './components/SimpleTable'
import clsx from 'clsx'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import UsersRequest from '../../pages/posts/ranchMangment/request/Dashbord/users'
import Button from '@mui/material/Button'
import LiveStockRequest from '../../pages/posts/ranchMangment/request/Dashbord/liveStocks'
import PageSpinner from '../../components/ui/PageSpinner'
import RanchRequest from '../../pages/posts/ranchMangment/request/Dashbord/AllRanch'
const useStyles = makeStyles((them) => ({
  card: {
    width: 250,
    height: 200,

    backgroundColor: 'green',
  },
  cardContent: {
    fontSize: 50,
    backgroundColor: 'green',
    height: 250,
    color: 'white',
  },
}))
function Item(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  )
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default function JustifyContent(props) {
  const { viewAllRanch } = RanchRequest()
  const { viewTotalUsers } = UsersRequest()
  const { viewTotalLiveStock } = LiveStockRequest()
  const [loading, setLoding] = React.useState(true)
  const [users, setUsers] = React.useState()
  const [ranchs, setRanchs] = React.useState([])
  const [liveStock, setLiveStock] = React.useState([])
  const [username, setUsername] = React.useState('')
  const { history } = props
  const classes = useStyles()
  React.useEffect(() => {
    setUsername(localStorage.getItem('role'))
    viewAllRanch().then((data) => {
      console.log(data)
      if (data.err) {
      } else if (data.ranches) {
        setRanchs(data.ranches)
      }
    })
    viewTotalUsers().then((data) => {
      console.log(data)
      if (data.err) {
      } else if (data.result) {
        setLoding(false)
        setUsers(data.result)
      }
    })
    viewTotalLiveStock().then((data) => {
      if (data.err) {
      } else if (data.result) {
        setLoding(false)
        setLiveStock(data.result)
      }
    })
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
      console.log('no token')
      props.history.push('/adminLogin')
    }
    if (username === 'ranchManager') {
      props.history.push('/adminLogin')
    }
  }, [])
  return (
    <div>
      {username === 'inspector' ? (
        props.history.push('/inspector')
      ) : (
        <OftadehLayout>
          {username === 'ranchManager' ? (
            props.history.push('/liveStockSuppplier')
          ) : (
            <div>
              {loading ? (
                <PageSpinner />
              ) : (
                <div style={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                      p: 1,
                      m: 1,
                      // bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <Item>
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              style={{ minHeight: '100vh' }}
                            >
                              {users}
                              <div>Users</div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Item>
                    <Item>
                      <Card className={classes.card}>
                        <CardContent
                          style={{ backgroundColor: '#00688b' }}
                          className={classes.cardContent}
                        >
                          {liveStock.length} LiveStock{' '}
                        </CardContent>
                      </Card>
                    </Item>
                    <Item>
                      <Card className={classes.card}>
                        <CardContent
                          style={{ backgroundColor: '#e91e63' }}
                          className={classes.cardContent}
                        >
                          {ranchs.length}
                          <div>Ranchs</div>
                        </CardContent>
                      </Card>
                    </Item>
                    <Item>
                      <Card className={classes.card}>
                        <CardContent></CardContent>
                      </Card>
                    </Item>
                    <Item>
                      <Card className={classes.card}>
                        <CardContent></CardContent>
                      </Card>
                    </Item>
                  </Box>
                </div>
              )}
            </div>
          )}
        </OftadehLayout>
      )}
    </div>
  )
}
