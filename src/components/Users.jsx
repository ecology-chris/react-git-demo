import React from 'react';
import GithubUser from './GithubUser';
import JwPagination from 'jw-react-pagination';
import NumberFormat from 'react-number-format';

class Users extends React.Component {
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
    /*
    This method will be called by React after the first render. It's a perfect place to load
    data with AJAX. This User component gets mounted in the DOM as soon as the URL is /user/:username

    When that happens, react-router will pass a `params` prop containing every parameter in the URL, just like
    when we get URL parameters in Express with req.params. Here, it's this.props.params. Since we called our route
    parameter `username`, it's available under this.props.params.username

    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
    the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `this.state.user` exists and we get the user info display instead of "LOADING..."
    */
    componentDidMount() {
       this.fetchData();
    }
    
    fetchData() {
        const searchTerm = `https://api.github.com/search/users?q=${this.props.params.query}&per_page=100`
        console.log(searchTerm);
        fetch(searchTerm)
        .then(response => response.json())
        .then(
            users => {
                // How can we use `this` inside a callback without binding it??
                // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    users: users
                });
            }
        );
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.params.query !== this.props.params.query)
        this.fetchData();
    }
   

    render() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
        if (!this.state.users) {
            return (<div className="user-page">LOADING...</div>);
        }

        // If we get to this part of `render`, then the user is loaded
           return (
            <div className="user-page">
                
                <h3>Total results: <NumberFormat value={this.state.users.total_count} displayType={'text'} thousandSeparator={true}  /></h3>
              <ul className="user_list">
               {this.state.pageOfItems.map(item =>
                     <li className="user_item" key={item.html_url}>
                     <GithubUser  avatar_url = {item.avatar_url} login={item.login}/>
                     </li>
                )}
                <JwPagination items={this.state.users.items} onChangePage={this.onChangePage} />
                  </ul>                  
            </div>
        );
    }
};

export default Users;
