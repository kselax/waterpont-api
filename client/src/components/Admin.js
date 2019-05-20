import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const $ = window.jQuery

class Create extends React.Component {

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
        $('.admin').ripples({
          resolution: 256,
          perturbance: 0.01
        });
      }
      catch (e) {
        $('.error').show().text(e);
      }
    });
  }

  componentWillUnmount() {
    console.log('[componentWillUnmount] create');
    $('.admin').ripples('destroy');
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
          ? this.setState({ 'success': 'Пользователь создан'})
          : this.setState({ 'error': "Произошла ошибка" })
      })
  }

  render() {
    const { isFetching, success, error, id, login, pass } = this.state
    return (
      <div>
        <section className="admin">
          <div>
            <div className="background"></div>
            <div className="forground">
              
              <h1>Создать пользователя</h1>

              <div className="back">
                <Link to="/admin">
                  <button>{"<<"} Назад</button>
                </Link>
              </div>

              <div className="form-create">
                <form onSubmit={this.onSubmitLoginForm}>

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
                        ? <h2>Создание...</h2>
                        : <button className="btn blue">
                            Создать
                          </button>
                    }
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>
      </div>
    )
  }
}

class Edit extends React.Component {
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

    console.log('this.props.id = ', this.props.id);
    const { id } = this.props
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
    // if (!this.state.user) {
    //   return <div>Loading...</div>
    // }

    return (
      <div>
        <section className="admin">
          <div>
            <div className="background"></div>
            <div className="forground">
              <h1>Редактировать пользователя</h1>
              <div className="back">
                <Link to="/admin">
                  <button>{"<<"} Назад</button>
                </Link>
              </div>
              {!id
                ? <div className="loading"><h2>Загрузка...</h2></div>
                : <div className="form-edit">
                    <form onSubmit={this.onSubmitLoginForm}>

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
                            ? <h2>Обновление...</h2>
                            : <button className="btn blue">
                                Обновить
                              </button>
                        }
                      </div>
                    </form>
                  </div>
              }
                  

            </div>
          </div>
        </section>
      </div>
    )
  }
}

class Admin extends React.Component {
  constructor(props) {
    super(props)

    const Items =  [
        {
          id: 1,
          login: "user1",
          pass: "bla-bla"
        },
        {
          id: 2,
          login: "user2",
          pass: "bla-bla-bla"
        },
        {
          id: 3,
          login: "user3",
          pass: "bla-bla-bla"
        },
        {
          id: 33,
          login: "user2",
          pass: "bla-bla-bla"
        },
        {
          id: 32,
          login: "user3",
          pass: "bla-bla-bla"
        },
        {
          id: 22,
          login: "user2",
          pass: "bla-bla-bla"
        },
        {
          id: 333,
          login: "user3",
          pass: "bla-bla-bla"
        }
      ]

    this.state = {
      // Items: Items
      Items: ''
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

    console.log('componentDidMount');
    fetch(`/api/v1/clients/all`, {
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
        this.setState({ Items: json.Items })
      })
  }

  componentWillUnmount() {
    console.log('[componentWillUnmount]');
    $('.loginForm, .admin').ripples('destroy');
  }

  componentDidUpdate() {
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
  }

  render() {

    let params = new URLSearchParams(this.props.location.search)
    let page = params.get('page')
    console.log('page = ', page);
    const { logged } = this.props
    console.log('this.props = ', this.props);
    // console.log('this.state = ', this.state);
    const { Items } = this.state

    if (page === 'create') {
      return (
        <Create />
      )
    }

    if (page === 'edit') {
      let id = params.get('id')
      return (
        <Edit id={id} />
      )
    }

    return (
      <div>
        <section className="admin">
          <div>
            <div className="background"></div>
            <div className="forground">
              <h1><span className="hello">Привет</span> <span className="title">{window.localStorage.getItem('login')}</span> <button onClick={this.props.logOut}>Выйти</button></h1>
              <div className="createButton">
                <Link to="/admin?page=create"><button>Создать пользователя</button></Link>
              </div>
              <ul>
              {!Items &&
                <div className="loading"><h2>Загрузка...</h2></div>
              }
              {Items && Items.length && 
                <li className="userListTitle">
                  <h2>Список польователей:</h2>
                </li>
              }
              {Items && Items.length && Items.map((item, i) => {
                
                return (
                    <li className="user" key={item.id}>
                      <span>{i}</span>
                      <span>{item.login}</span>
                      <span className="actions">
                        <Link to={`/admin?page=edit&id=${item.id}`}>
                          <button>Редактировать</button>
                        </Link>
                        <button id={item.id}>Удалить</button>
                      </span>
                    </li>
                )
              })}
              </ul>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Admin