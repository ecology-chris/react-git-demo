import React from 'react';
import GithubUser from './GithubUser';
import JwPagination from 'jw-react-pagination';

class Following extends React.Component {
    constructor() {
        super();
        this.onChangePage = this.onChangePage.bind(this);
        this.state = {
            pageOfItems: []
        };
    }
    onChangePage(pageOfItems) {
        // update local state with new page of items
        this.setState({ pageOfItems });
    }
    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.params.username}/following?per_page=100`)
        .then(response => response.json())
        .then(
            following => {
                // How can we use `this` inside a callback without binding it??
                // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    following: following
                });
            }
        );
    }

    render() {
        if (!this.state.following) {
            return <div>LOADING FOLLOWING...</div>
            }
            return (
                
            <div className="followers-page">
                <h2> {this.props.params.username} is following</h2>
                <ul className="user_list">
               {this.state.pageOfItems.map(item =>
                     <li className="user-item" key={item.html_url}>
                     <GithubUser  avatar_url = {item.avatar_url} login={item.login}/>
                     </li>
                )}
                <JwPagination items={this.state.following} onChangePage={this.onChangePage} />
                  </ul>         
            </div>
            );
    }};
    export default Following;