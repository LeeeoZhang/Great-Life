import Charts from './Charts';
import {withAuth,getAuth} from "../../utils"

function authInCharts(){
  return getAuth().charts.isAuth === 1
}

export default withAuth(authInCharts)(Charts)
