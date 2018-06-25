import React from 'react'
import {withAuth,getAuth} from "../utils"

function isAuthList (){
  return !!getAuth()
}
//这是一个默认的页面
const BlankComponent = ()=>{
  return (
    <div/>
  )
}
export default withAuth(isAuthList)(BlankComponent)
