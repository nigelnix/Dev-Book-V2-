import { Outlet } from 'react-router-dom'
import useVerifyLogin from '../hooks/useVerifyLogin'

function AppWrapper() {
  useVerifyLogin()
  return <Outlet />
}
export default AppWrapper
