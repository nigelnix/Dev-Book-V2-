import './CurrentUser.scss'

import CurrentUserComponent from './CurrentUserComponent'

function CurrentUser() {
  return (
    <div className='current-user-container box-shadow button-TextInput borderCurrentUser backgroundInner'>
      <CurrentUserComponent />
    </div>
  )
}

export default CurrentUser
