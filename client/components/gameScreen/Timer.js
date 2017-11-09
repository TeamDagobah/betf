//Timer.js
import React from 'react';
import axios from 'axios'; 
import ReactCountdownClock from 'react-countdown-clock';


export class Timer extends React.Component {
	constructor(props) {
		super(props);
}

render(){
		return (
			<div>
		        <div> 
                    <ReactCountdownClock 
                            seconds={100}
                            color="#000"
                            alpha={0.9}
                            size={100}
                            onComplete={function() {
                                console.log('works')
                            }}
                    /> 
                </div>
			</div>
		)
	}
}

export default Timer;