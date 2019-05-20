import React from 'react'

const $ = window.jQuery

class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isFetching: false,
      success: '',
      error: '',
      id: '',
      login: '',
      pass: ''
    }
  }

  componentDidMount() {
    $(document).ready(function() {
      try {
        $('.loginForm, .admin').ripples({
          resolution: 256,
          perturbance: 0.01
        });
      }
      catch (e) {
        $('.error').show().text(e);
      }
    });

    const id = window.localStorage.getItem('id')
    console.log('id = ', id);
    fetch(`/api/v1/clients/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then(r => r.json())
      .then(json => {
        console.log('json = ', json);
        const { id, login } = json.Item
        this.setState({
          id, login
        })
      })
  }

  componentWillUnmount() {
    $('.loginForm, .admin').ripples('destroy');
  }

  onChangeId = e => {
    this.setState({ id: e.target.value })
  }

  onChangeLogin = e => {
    this.setState({ login: e.target.value })
  }

  onChangePass = e => {
    this.setState({ pass: e.target.value })
  }

  onSubmitLoginForm = e => {
    e.preventDefault()
    console.log('onSubmitLoginForm');
    const { id, login, pass } = this.state
    console.log(id, login, pass);
    return
    this.setState({ 
      isFetching: true,
      success: '',
      error: ''
    })
    fetch('/api/v1/clients/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({ id, login, pass })
    })
      .then(r => {
        this.setState({ isFetching: false })
        return r.json()
      })
      .then(json => {
        console.log('json = ', json);
        !json.error
          ? this.setState({ 'success': 'Пользователь обновлен'})
          : this.setState({ 'error': "Произошла ошибка" })
      })
  }

  render() {
    const { isFetching, success, error, id, login, pass } = this.state

    return (
      <section className="admin">
        <div>
          <div className="background"></div>
          <div className="forground">
            <h1><span className="hello">Привет</span> <span className="title">{window.localStorage.getItem('login')}</span> <button onClick={this.props.logOut}>Выйти</button></h1>
            
            {!id
              ? <div className="loading"><h2>Загрузка...</h2></div>
              : <div className="form-create">

                  <form onSubmit={this.onSubmitLoginForm}>
                    <h2>Настройки</h2>
                    <div className="form-group">
                      <div>
                        <label htmlFor="id">id:</label>
                      </div>
                      <div>
                        <input
                          id="id"
                          type="text"
                          value={id}
                          onChange={this.onChangeId}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div>
                        <label htmlFor="login">Логин:</label>
                      </div>
                      <div>
                        <input
                          id="login"
                          type="text"
                          value={login}
                          onChange={this.onChangeLogin}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div>
                        <label htmlFor="pass">Пароль:</label>
                      </div>
                      <div>
                        <input
                          id="pass"
                          type="password"
                          value={pass}
                          onChange={this.onChangePass}
                        />
                      </div>
                    </div>

                    {error && 
                      <div className="error">
                        {error}
                      </div>
                    }

                    {success &&
                      <div className="success">
                        {success}
                      </div>
                    }

                    <div className="form-group">
                      {isFetching 
                          ? <h2>Сохранение...</h2>
                          : <button className="btn blue">
                              Сохранить
                            </button>
                      }
                    </div>
                  </form>
                </div>
            }
            

          </div>
        </div>
      </section>
    )
  }
}

export default User