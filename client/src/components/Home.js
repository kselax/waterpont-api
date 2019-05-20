import React from 'react'

// import $ from 'jquery'

// require ('../js/jquery.ripples-min.js')
const $ = window.jQuery

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  // onClick = e => {
  //   console.log('click');
  //   e.preventDefault()
  // }
  componentDidMount() {
    console.log(window.jQuery);
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

  componentWillUnmount() {
    $('.loginForm, .admin').ripples('destroy');
  }

  handleSubmit = e => {
    console.log('onsubmit click');
    e.preventDefault()
  }
  render() {
    return (
      <div>
        <section className="loginForm">
          <div>
            <div className="background"></div>
            <div className="form">
              <form onSubmit={this.props.onSubmitLoginForm}>

                <div className="form-group">
                  <div>
                    <label htmlFor="username">Логин:</label>
                  </div>
                  <div>
                    <input
                      id="username"
                      type="text"
                      value={this.props.username}
                      onChange={this.props.onChangeUsername}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div>
                    <label htmlFor="password">Пароль:</label>
                  </div>
                  <div>
                    <input
                      id="password"
                      type="password"
                      value={this.props.value}
                      onChange={this.props.onChangePassword}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <button 
                    className="btn blue"
                    onClick={this.onClick}
                  >
                    Войти
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </section>
      </div>
    )
  }
  
}

export default Home