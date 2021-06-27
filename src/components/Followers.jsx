import React from 'react';
import GithubUser from './GithubUser';
import JwPagination from 'jw-react-pagination';

class Followers extends React.Component {
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
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?per_page=100`)
        .then(response => response.json())
        .then(
            followers => {
                // How can we use `this` inside a callback without binding it??
                // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    followers: followers                    
                });
            }
        );
    }



    render() {
        if (!this.state.followers) {
            return <div>LOADING FOLLOWERS...</div>
            }
            return (
                
            <div className="followers-page">
                <h2>Followers of {this.props.params.username}</h2>
             

                <ul className="user_list">
               {this.state.pageOfItems.map(item =>
                     <li className="follower-item" key={item.html_url}>
                     <GithubUser  avatar_url = {item.avatar_url} login={item.login}/>
                     </li>
                )}
                <JwPagination items={this.state.followers} onChangePage={this.onChangePage} />
                  </ul>              
            </div>
            );
    }};
    export default Followers;