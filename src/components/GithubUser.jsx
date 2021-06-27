import React from 'react';
import { Link } from 'react-router';

class GithubUser extends React.PureComponent {
    constructor() {
        super();
        }

        render() {
    
            // This function wont be re-rendered in case when the new state is same as previous
            
            return ( <Link to={"/user/"+this.props.login}>
                        <img className="user_avatar" src={this.props.avatar_url} />
                                    {this.props.login}
                    </Link>)
          }
        }
        export default GithubUser;
