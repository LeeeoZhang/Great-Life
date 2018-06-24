import React from 'react'
import { Redirect } from 'react-router-dom'

function getAuth() {
  return true
}
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
