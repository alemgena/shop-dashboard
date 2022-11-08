import * as React from 'react'
import PropTypes from 'prop-types'
import { useEffect,useState } from 'react'
import Box from '@mui/material/Box'
import OftadehLayout from '../../components/Layout/Layout'
import { Paper, Grid, makeStyles, Typography } from '@material-ui/core'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import PageSpinner from '../../components/ui/PageSpinner'
import { url } from '../../utiles/config'
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
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

export default function Dashboard(props) {
  const history=useHistory()
  const [loading, setLoding] = React.useState(false)
  const [users, setUsers] = React.useState([])
  const classes = useStyles()
  React.useEffect(() => {
    setLoding(true)
    axios.get(`${url}/api/auth/getAllUser/`).then((response)=>{
      console.log(response)
      setLoding(false)
      setUsers(response.data)
     })
  }, [])

  return (
    <div>
        <OftadehLayout>
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
                          <ButtonBase  onClick={() => {
                          history.push('/user');
                        }}>
                      <Card className={classes.card}
                      
                      >
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
                              {users.length}
                              <div>Users</div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      </ButtonBase>
                    </Item>
                  </Box>
                </div>
              )}
            </div>

        </OftadehLayout>
    </div>
  )
}
