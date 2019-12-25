import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var currId = 1;

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      postlist: [],
      comments: [],
      currUser: '',
    }
  }
  async componentDidMount() {
    const getUsers = await axios.get('https://panorbit.in/api/users.json');
    const firstRequest = await axios.get('https://panorbit.in/api/posts.json');
    const secondRequest = await axios.get('https://panorbit.in/api/comments.json');

    this.setState({
      users: getUsers.data.users,
      postlist: firstRequest.data.posts,
      comments: secondRequest.data.comments,
    });
  }

  renderContent = (users, list, commentList) => {

    if (users.length >= 0 && list.length >= 0) {
      return users.map(user => {
        if (user.id === currId) {
          return list.map((post, index) => {
            if (post.userId === user.id) {
              return (
                <div key={index} className="posts-card">
                  <div className="posts-card-header">
                    <div className="d-flex align-items-center p-4 row">
                      <img className="border rounded-circle mb-2" src={`${user.profilepicture}`} width="70" height="70" alt="user-dp" />
                      <span className="subtext" style={{ color: 'rgb(139, 139, 139)' }}>by {user.name}</span>
                    </div>
                    <div className="col subtext">
                      <h5>{post.title}</h5>
                      <span style={{ color: 'rgb(139, 139, 139)' }}>{post.time}</span>
                    </div>
                  </div>
                  <div className="col posts-img-container">
                    <img style={{ borderRadius: '15px' }} src={`${post.image}`} width="600px" height="auto" alt="post_img" />
                  </div>
                  <div className="col">
                    <p className="post-body">{post.body}</p>
                  </div>
                  <div className="icon-container">
                    <div className="d-flex justify-content-end">
                      <div className="d-flex align-items-center">
                        <img src="/assets/like.png" width="auto" height="auto" alt="icon"/>
                      </div>
                      <div className="ml-4 pl-2 icon-text" onClick={() => this.handleRedirect(user, commentList)}>
                        <img src="/assets/comment.png" width="auto" height="auto" alt="icon"/>
                        <span className="subtext">comments</span>
                      </div>
                    </div>
                    <div className="" onClick={() => this.handleRedirect(user, commentList)}>
                      <span className="subtext">Add comments</span>
                      <img className="border rounded-circle" src={`${user.profilepicture}`} width="40" height="40" alt="dp"/>
                    </div>
                  </div>
                </div>
              )
            }
            return null;
          })
        }
        return null;
      })
    }
    return null;
  }

  renderAvatar = (userlist) => {
    if(userlist !== '')
    return userlist.map((user,index) => {
      if(user.id === 1){
        return (
          <div key={index} className="avatar">
            <img className="border rounded-circle" src={`${user.profilepicture}`} width="100" height="100" alt="avatar" />
          </div>
        )
      }
      return null;
    })
  }

  handleRedirect = (currUser, commentList) => {
    this.props.history.push({
      pathname: `/comments`,
      state: { title: "Comments", 
        user: currUser, 
        comments: commentList,
        handleSubmit: this.handleSubmit
      }
    })
  }

  handleSubmit = (data) => {
    console.log(data)
    // if(data){
    //     const newData = {
    //         postId: 1,
    //         id:data.id+1,
    //         body: this.state.content,
    //         time: new Date(),     
    //     }
    //     data.push(newData)
    // }
}

  render() {
    const { users, postlist, comments } = this.state;

    return (
      <div className="container">
        <div className="nav-header">
          <div className="logo">
            <img src='/assets/hamburger.png' width="auto" height="auto" alt="ham" />
            <img src='/assets/logo.jpg' width="auto" height="auto" alt="logo" />
          </div>
          {this.renderAvatar(users)}
        </div>
        <section className="posts-container">
          {users && postlist && comments ? this.renderContent(users, postlist, comments) : null}
        </section>
      </div>
    );
  }
}

export default App;
