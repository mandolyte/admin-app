import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {Paper, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CreateRepoButton from './CreateRepoButton'
import RenameRepoButton from './RenameRepoButton'
import * as dcsApis from '../utils/dcsApis'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4),
  },
}))


export default function RepoHealthCheck({
  title,
  owner,
  languageId,
  resourceId,
}) 
{
  const [repoCheck, setRepoCheck] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if ( owner.toLowerCase() === 'unfoldingword') {
      if ( resourceId === 'glt' ) resourceId = 'ult';
      if ( resourceId === 'gst' ) resourceId = 'ust';
    }
  
    const rid = languageId + '_' + resourceId.toLowerCase();
    let errors = [];
    
    async function doRepoCheck() {
      dcsApis.verifyRepo(owner,rid,errors,resourceId,languageId)
      .then((errors) => {
          setRepoCheck(errors);
      });
    }

    doRepoCheck()

  }, [setRepoCheck, owner, languageId, resourceId])

  function generateMessage() {
    let msg = '';
    if ( !repoCheck ) return msg;

    if ( repoCheck[0].repoFound ) {
      msg = 'Repo OK';
      if ( repoCheck[0].manifestFound ) {
        if ( repoCheck[0].manifestValid ) msg += " and manifest OK.";
        else msg += " but manifest is not valid.";
      } else {
        msg += " but manifest not found."
      }
    }
    else msg = 'Repo not found';
    return msg;
  }


  return (
    <Paper className={classes.paper} >
      <Typography align="center" variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2">Org is {owner}</Typography>
      <Typography variant="body2">LangId is {languageId}</Typography>
      <Typography variant="body2">resourceId is {resourceId}</Typography>
      <Typography variant="body2">
        { generateMessage() }
      </Typography>
      {
        repoCheck && !repoCheck[0].repoFound && 
        <div>
          <CreateRepoButton active={true} owner={owner} languageId={languageId} resourceId={resourceId} />
          <RenameRepoButton active={true} owner={owner} languageId={languageId} resourceId={resourceId} />
        </div>
      }
    </Paper>
  )
}

RepoHealthCheck.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  languageId: PropTypes.string.isRequired,
  resourceId: PropTypes.string.isRequired,
}
