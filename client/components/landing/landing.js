import React from 'react';

class Lander extends Component {
    constructor(props) {
        super(props);

    }
    
    render(){
        return(
            <div>
                <form>
                    Username:<br/>
                    <input type="text" name="firstname"/>
                    Password:<br/>
                    <input type="text" name="lastname"/>
                    <br/>
                    <button onClick="">Submit</button>
                </form>
            </div>
        )
    }
}

export default Lander