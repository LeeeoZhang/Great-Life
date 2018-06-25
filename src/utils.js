import React from 'react'
import { Redirect } from 'react-router-dom'

//获取权限列表，权限列表存储在sessionStorage中
export function getAuth() {
  const authList = JSON.parse(sessionStorage.getItem('authList'))
  return authList || false
}

//移除权限列表
export function removeAuth(){
  sessionStorage.removeItem('authList')
}

export function setAuth(data) {
  sessionStorage.setItem('authList',JSON.stringify(data))
}

/*
* 权限包装的HOC,基于路由的
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


//基于组件的权限包装
export function withAuthOfComponent(auth) {
  return function(Component){
    return class extends React.Component {
      render(){
        if(auth()){
          return (<Component/>)
        } else {
          return null
        }
      }
    }
  }
}
