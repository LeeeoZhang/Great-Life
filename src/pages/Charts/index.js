import Charts from './Charts';
import {withAuth} from "../../utils"

function authInCharts(){
  return false
}

export default withAuth(authInCharts)(Charts)
