import React from 'react';
import { Link } from 'react-router';

class GithubRepo extends React.PureComponent {
    constructor() {
        super();
        }

        render() {
    
            // This function wont be re-rendered in case when the new state is same as previous
            
            return ( <a href={this.props.url} target="_blank">{this.props.name} <span className="star">{this.props.stars} 	&#9733;</span> </a>)
          }
        }
        export default GithubRepo;
