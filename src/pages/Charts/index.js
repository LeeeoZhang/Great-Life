import Charts from './Charts';
import {withAuth,getAuth} from "../../utils"

function authInCharts(){
  return true
}

export default withAuth(authInCharts)(Charts)
