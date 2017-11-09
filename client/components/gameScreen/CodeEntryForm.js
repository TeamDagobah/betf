//codeentryform.js
// this file will just house the code entry. It takes the starterCode from app.js
import React from 'react';
import axios from 'axios'
import brace from 'brace';
import ReactAce from 'react-ace-editor';
import AceEditor from 'react-ace'
import SubmitButton from './SubmitButton.js' 


import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';
import 'brace/theme/monokai'



export class CodeEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value: "",
      reset : "", 
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(newValue,e) {
    const editor = this.ace.editor; // The editor object is from Ace's API
    this.setState({value : editor.getValue()})
    this.setState({reset : editor})
    event.preventDefault();
  }

  render() {
  // this displays 'loading...' until the seedcode has loaded from the gameFrame. 
  return (this.props.seedCode !== null) ? 
    (<div>
        <div>
          <AceEditor
            mode="javascript"
            theme="eclipse"
            setReadOnly= {false}
            value = {this.props.seedCode}
            onChange={this.onChange.bind(this)}
            style={{ height: '100px' }}
            ref={instance => { this.ace = instance; }} // Let's put things into scope
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
          />
        </div>
        <SubmitButton value={this.state.value} tests={this.props.tests} reset={this.state.reset}/>
      </div>
    ) : (<div> loading... </div>)
  }
}

export default CodeEntryForm;