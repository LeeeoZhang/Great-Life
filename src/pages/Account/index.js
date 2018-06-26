import Account from './Account'
import {withAuth,getAuth} from '@/utils'

function authInAccount () {
  return true
}

export default withAuth(authInAccount)(Account)
