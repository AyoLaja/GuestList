import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase';

//First, let's carve out some space in our component's state - a space to keep
//track of the user using our app (username) and the item they intend to bring
//(currentItem). We'll do this by creating a constructor() hook for our app and
//setting a default value for our input's state there
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    //Don't understand this
    //Need access to this in our handleChange method, we'll also
    //need to bind it back in our constructor()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  //Receives the event from our inputs, and updates that input's corresponding piece of state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    //Prevents form from loading page on submit
    e.preventDefault();
    //Creating a space in firebase db where info will be stored, ref method is called and items destination is passed
    const itemRef = firebase.database().ref('items');
    //Put info into an object
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    }
    //Send object to firebase db
    itemRef.push(item);
    //Clear input for other items to be added
    this.setState({
      currentItem: '',
      username: ''
    });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        })
      }
    })

    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      //New array populated with results from value listener
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }

      this.setState({
        items: newState
      });
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Fun Food Friends</h1>
              {this.state.user ?
                <button onClick={this.logout}>Log Out</button>
                :
                <button onClick={this.login}>Log In</button>
              }
            </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
            <div className='container'>
              <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
                  <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Item</button>
                </form>
              </section>
              <section className='display-item'>
                <div className='wrapper'>
                  <ul>
                    {this.state.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <h3>{item.title}</h3>
                          <p>brought by: {item.user}
                              {item.user == this.state.user.displayName || item.user == this.state.user.email ?
                            <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
                          </p>
                        </li>
                      )
                    })
                  }
                  </ul>
                </div>
              </section>
            </div>
          </div>
          :
          <div className="wrapper">
            <p>You must be logged in to see potluck list and add to it.</p>
          </div>
        }
      </div>
    )};
}

export default App;
