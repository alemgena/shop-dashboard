import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
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
import Button from '@mui/material/Button'
const useStyles = makeStyles((them) => ({
  card: {
    width: 150,
    height:250,
 
      backgroundColor: "green"
    
  },
  cardContent:{
    backgroundColor:"green",
        height:250,
        color:"white"
  }
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
  const { history } = props
  const classes = useStyles()
  React.useEffect(() => {
        if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
            console.log('no token')
         props.history.push('/adminLogin');
            }
  },[])
  return (
    
    <OftadehLayout>
      {}
      <h1>Dashboard</h1>
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
              <CardContent
               className={classes.cardContent}
               >User</CardContent>
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
    </OftadehLayout>
  )
}
