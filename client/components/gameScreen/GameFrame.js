// the following commented out components need to be uncommented once their components are rendered. 
		// When you have finsihed a component: 
			// uncomment the import
			// uncomment the component on the render screen. 

import React from 'react';
import axios from 'axios';
import Prompt from './Prompt.js'; 
import Timer from './Timer.js'; 
import CodeEntryForm from './CodeEntryForm.js'
// import Tests from './Tests' // this needs a file
// import Xonsole from './Xonsole' // because 'Console' isn't a reserved word but it should be.
// import RunXonsoleButton from './RunXonsoleButton' // this needs a file
import SubmitButton from './SubmitButton.js' // this needs a file

// this receives the following props from the 'GamesList': 
			// game object with: 
				// algorithm: _id
				// participants
				// leaderboard
				// status
				// playerScores

export class GameFrame extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			algorithm : null, 
      prompt : null, 
      seedCode : null, 
      tests : null, 
      // the below three are not currently being used. 
      isSubmitted : false, 
      isXonsoleRun : false, 
      isTimerRunning : false, 
    }
	console.log('gameObject', this.props.gameObject)
	
    this.algorithmID = this.props.gameObject.algorithmID
    this.getAlgorithm = this.getAlgorithm.bind(this)
    this.getSeedCode = this.getSeedCode.bind(this)
    this.getTests = this.getTests.bind(this)
    this.toggleSubmitStatus = this.toggleSubmitStatus.bind(this)
    this.toggleRunXonsoleStatus = this.toggleRunXonsoleStatus.bind(this)
	}


  getAlgorithm(algoId, cb) {
	  axios.get('/algos/' + algoId) 
	  .then((algorithm) => {
	  	this.setState({algorithm : algorithm.data});
	  	// run the response in a callback so that other functions can use it. 
	  	if (cb) cb(algorithm.data); 
    })
  }

  // these could be refactored into one function, but I think it is more readable to have them seperate. 
	getPrompt(algoId) {
		this.getAlgorithm(algoId, (algo) => {
			var prompt = algo.prompt
			this.setState({prompt})
		})
	}

	getSeedCode(algoId) {
		this.getAlgorithm(algoId, (algo) => {
			var seedCode = algo.seedCode
			this.setState({seedCode})
		})
	}

	getTests(algoId) {
		this.getAlgorithm(algoId, (algo) => {
			var tests = algo.testingSuite
			// console.log('tests in getTests', tests)
			this.setState({tests})
		})
	}

	// both of these functions handle the pressing of the buttons. When they are pressed, they change the state
	// of the GameFrame, triggering a rerendering and passing down a true value to their respective children. 
	// NIETHER OF THESE ARE BEING USED CURRENTLY, BUT PROBABLY SHOULD BE.
	toggleSubmitStatus() {
		this.setState({isSubmitted : !this.state.isSubmitted})
	}
	toggleRunXonsoleStatus() {
		this.setState({isXonsoleRun : !this.state.isXonsoleRun})
	}

	componentWillMount() {
		// on the first mounting of the game frame, we want to render the game. 
		this.getAlgorithm(this.algorithmID)
		this.getPrompt(this.algorithmID)
		this.getSeedCode(this.algorithmID)
		this.getTests(this.algorithmID)
	}	

	render(props){
		// console.log('tests in gameFrame render', this.state.tests)
		return (this.state.tests === null || this.state.prompt === null || this.state.seedCode === null || this.state.algorithm === null) ? 
		(<div> loading gameFrame... </div>) : 
		(<div className="row">
				<div className="col s9 container">
					<Prompt promptdetails={this.state.prompt} name={this.props.gameObject.name} />
					<CodeEntryForm seedCode = {this.state.seedCode} test={this.state.tests}
					 algo={this.props.gameObject.algorithmID} /> 
				</div> 
				<div className="col s3">
					<Timer/>
				</div>
				<div className="inline-block-div"> 
					{/*
					<Xonsole toggleRunXonsoleStatus={this.toggleRunXonsoleStatus} isXonsoleRun={this.state.isXonsoleRun}/>
					<RunXonsoleButton toggleRunXonsoleStatus={this.toggleRunXonsoleStatus}/>  
				*/}
					
				</div>
			</div> 
		)
	}
}

export default GameFrame; 