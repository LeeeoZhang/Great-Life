import TemplateMessage from './TemplateMessage'
import {withAuth,getAuth} from '@/utils'

function isAuth(){
  const authList = getAuth()
  return authList.type === 1
}

export default withAuth(isAuth)(TemplateMessage)
