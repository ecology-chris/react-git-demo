import React from 'react';
import GithubRepo from './GithubRepo';
import JwPagination from 'jw-react-pagination';
import NumberFormat from 'react-number-format';

class Repos extends React.Component {
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
        fetch(`https://api.github.com/users/${this.props.params.username}/repos?per_page=100`)
        .then(response => response.json())
        .then(
            repos => {
                // How can we use `this` inside a callback without binding it??
                // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    repos: repos
                });
            }
        );
    }

  

    render() {
        if (!this.state.repos) {
            return <div>LOADING REPOS...</div>
            }
            return (
                
                <div className="user-page">
                
              <ul className="user_list">
               {this.state.pageOfItems.map(item =>
                       <li className="repo-item">
                       <GithubRepo url={item.html_url} name={item.name} stars={item.stargazers_count}/>
                       </li>
                )}
                <JwPagination items={this.state.repos} onChangePage={this.onChangePage} />
                  </ul>                  
            </div>
            );
    }};
    export default Repos;