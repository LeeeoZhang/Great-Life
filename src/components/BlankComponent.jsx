import React from 'react'
import {withAuth} from "../utils"

//这是一个默认的页面
const BlankComponent = ()=>{
  return (
    <div/>
  )
}
export default withAuth()(BlankComponent)
