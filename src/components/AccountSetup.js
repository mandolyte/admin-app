import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { Paper } from 'translation-helps-rcl'
import { ReferenceContext } from '@context/ReferenceContext'
import TranslationSettings from '@components/TranslationSettings'

function AccountSetup({ authentication }) {
  const {
    state: { owner: organization, languageId },
    actions: { setShowAccountSetup },
  } = useContext(ReferenceContext)

  const handleSubmit = () => {
    setShowAccountSetup(false)
  }

  const disabledButton = !organization || !languageId

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col w-full px-4 lg:w-132 lg:p-0'>
        <Paper className='flex flex-col h-40 w-full p-6 pt-3 px-7 my-2'>
          <h5>Account Setup</h5>
          <p className='text-lg'>
            Choose your Organization and Primary Language
          </p>
        </Paper>
        <TranslationSettings authentication={authentication} />
        <div className='flex justify-end h-62 w-full'>
          <Button
            className='my-2'
            variant='contained'
            color='primary'
            disableElevation
            disabled={disabledButton}
            onClick={handleSubmit}
          >
            Save and Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

AccountSetup.propTypes = {
  authentication: PropTypes.object.isRequired,
}

export default AccountSetup
