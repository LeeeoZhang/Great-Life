import React from 'react'
import { Redirect } from 'react-router-dom'

//获取权限列表，权限列表存储在sessionStorage中
export function getAuth() {
  const authList = sessionStorage.getItem('authList')
  return authList || false
}

//移除权限列表
export function removeAuth(){
  sessionStorage.removeItem('authList')
}

/*
* 权限包装的HOC
* @param {Function} auth 权限函数，返回一个Boolean，表明是否有权限
* @param {ReactNode} Component, react组件，被包装的权限组件
* */
export function withAuth(auth) {
  return function(Component) {
    return class extends React.Component {
      render(){
        if(!getAuth()){
          return (<Redirect to="/login"/>)
        } else if (auth()) {
          return (<Component/>)
        } else {
          return (<Redirect to="/exception/403"/>)
        }
      }
    }
  }
}
