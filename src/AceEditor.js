import React, { Component } from 'react';
import './AceEditor.css';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-dot';

class AceEditor extends Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
  }
  
  componentDidMount() {
    this.editor = ace.edit(this.elementRef.current);
    this.editor.on('change', this.aceChanged.bind(this));
    this.editor.getSession().setMode('ace/mode/dot');
		this.editor.getSession().getDocument().setValue(this.props.value || '');
  }
  
  componentWillUnmount() {
  }
  
  componentDidUpdate(prevProps, prevState) {
    const editorDocument = this.editor.getSession().getDocument();
    
    if (this.props.value !== editorDocument.getValue()) {
      editorDocument.setValue(this.props.value);
    }
  }
  
  aceChanged(data) {
    const editorDocument = this.editor.getSession().getDocument();
    
    if (this.props.onChange) {
      this.props.onChange(editorDocument.getValue(), data);
    }
	}
  
  render() {
    return (
      <div className="AceEditor" ref={this.elementRef}></div>
    );
  }
}

export default AceEditor;
