import Dashboard from './Dashboard'
import {withAuth,getAuth} from '@/utils'

function authInDashboard () {
  return getAuth().dashboard.isAuth === 1
}

export default withAuth(authInDashboard)(Dashboard)
