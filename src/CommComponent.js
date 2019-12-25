import React, { Component } from 'react';

class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            content: ''
        }
    }

    renderComment = (commList, userItem) => {
        console.log(userItem.id)
        if (commList.length > 0) {
            return commList.map((comment,index) => {
                if (userItem.id === comment.userId){
                    return (
                        <div key={index} className="d-flex align-items-center p-4 col">
                            <img className="border rounded-circle mb-2" src={`${comment.profilePicture}`} width="70" height="70" alt="user-dp" />
                            <span className="subtext" style={{ color: 'rgb(139, 139, 139)' }}>{comment.body} </span>
                        </div>
                    )
                }
                return null;
            })
        }
        return null;
    }

    handleChange = (e) => {
        this.setState({ content: e.target.value})
    }

    
    render() {
        const { history: { location: { state: { comments, user, handleSubmit } } } } = this.props;
        return (
            <section className="">
                <div className="container">
                    <div className="nav-header">
                        <div className="row d-flex align-items-center" onClick={() => this.props.history.goBack()}>
                            <img src='/assets/back.png' width="25" height="25" alt="ham" />
                            <h4 className="mt-2 ml-2">Comments</h4>
                        </div>
                    </div>
                    {this.renderComment(comments, user)}
                </div>
                <div className="footer d-flex align-items-center p-2 border">    
                    <img src={`${user.profilepicture}`} className="rounded-circle mb-2" width="70" height="70" alt="user-dp" />
                    <div className="col d-flex w-100 align-items-center">
                        <input style={{fontSize: '20px'}} className="form-group ml-2 subtext w-75" placeholder="Add a comment" />
                        <div className="btn ml-2 text-right w-25" placeholder="Post" onChange={this.handleChange} onClick={() => handleSubmit(this.state.content)}>
                            <span classname="text-secondary" style={{fontSize: '20px'}}>Post</span>
                        </div>
                    </div>
                </div>
                
            </section>
        );
    }
}

export default Comments;
