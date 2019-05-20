import React from 'react'
import { Route, 
  Link, 
  Switch,
  Redirect } from 'react-router-dom'

import Home from './components/Home'
import Admin from './components/Admin'
import User from './components/User'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: window.localStorage.getItem('token') ? true : false,
      user_id: window.localStorage.getItem('id') 
        ? window.localStorage.getItem('id') 
        : '',
      user_login: window.localStorage.getItem('login')
        ? window.localStorage.getItem('login')
        : '',
      username: '',
      password: '',
      isFetching: false
    }
    console.log('this.state = ', this.state);
  }

  logOut = () => {
    console.log('logOut');
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('login')
    this.setState({ 
      user_id: '',
      user_login: '', 
      logged: false 
    })
  }

  onSubmitLoginForm = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.setState({ isFetching: true })
    fetch(`/auth/login`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=${username}&password=${password}`
    })
      .then(r => {
        this.setState({ isFetching: false })
        return r.json()
      })
      .then(json => {
        console.log('json = ', json);
        if (json.token) {
          window.localStorage.setItem('token', json.token)
          window.localStorage.setItem('id', json.user.id)
          window.localStorage.setItem('login', json.user.login)
          this.setState({ 
            logged: true,
            user_id: String(json.user.id),
            user_login: String(json.user.login)
          })
        }
      })

  }

  onChangeUsername = e => {
    this.setState({ username: e.target.value })
  }

  onChangePassword = e => {
    this.setState({ password: e.target.value })
  }

  render() {

    return (
      <div>
        <Switch>

          <Route path="/" exact render={propsRoute => 
              this.state.logged 
                ? this.state.user_id && +this.state.user_id === 0
                    ? <Redirect to="/admin"
                        logOut={this.logOut}
                      />
                    : <Redirect to="/user"
                        logOut={this.logOut}
                      />
                : <Home {...propsRoute} {...this.state}
                username={this.state.username}
                password={this.state.password}
                onChangePassword={this.onChangePassword}
                onChangeUsername={this.onChangeUsername} 
                onSubmitLoginForm={this.onSubmitLoginForm} />
          } />

          <Route path="/admin" exact render={propsRoute =>
            this.state.logged && this.state.user_id && +this.state.user_id === 0
              ? <Admin 
                  {...propsRoute} 
                  {...this.state}
                  logOut={this.logOut}
                />
              : <Redirect to='/' />
          } />

          <Route path="/user" exact render={propsRoute =>
            this.state.logged && this.state.user_id && +this.state.user_id !== 0
              ? <User 
                  {...propsRoute} 
                  {...this.state}
                  logOut={this.logOut}
                />
              : <Redirect to='/' />
          } />

        </Switch>

        <div 
          className="preloader" 
          style={this.state.isFetching ? {} : {display: "none" } }
        >
          <div></div>
          <img src="/img/3.gif" />
        </div>
        
      </div>
    )
  }
}

export default App