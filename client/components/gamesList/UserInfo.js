var React = require('React');
var axios = require('axios');

export class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.username);
	}

	render(){
		return(
			<div>
				<div> Username: {this.props.username} </div>
				<div> Points: {this.props.points} </div>
				<div> Level: {this.props.level} </div>
			</div>
		)
	}
}

export default UserInfo; 