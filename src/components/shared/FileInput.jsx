import React from 'react';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import {formatBytes} from "../../utils";

class FileInput extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      file: null,
      draggingOver: false
    };
  }

  componentDidMount() {
    const dropZone = document.getElementById("drop-zone");
    ['dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, true)
    })

    dropZone.addEventListener("dragover", (event) => this.handleDragOver(event), true)
    dropZone.addEventListener("dragleave", (event) => this.handleDragLeave(event), true)
    dropZone.addEventListener("drop", (event) => this.handleDrop(event), true)
  }

  handleDragLeave(e) {
    this.setState({draggingOver: false});
  }

  handleDragOver(e) {
    this.setState({draggingOver: true});
  }

  handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    this.setFile(files[0]);
  }

  setFile(fileObj) {
    this.setState({file: fileObj, draggingOver: false});
    this.props.onChange(fileObj);
  }

  render() {
    const {draggingOver, file} = this.state;

return !file ? <div id="drop-zone" className={"component-container drop-zone " + (draggingOver ? "active" : "")}>
        <CloudUploadOutlinedIcon className="component-container-icon" />
        <div className="component-container-label-main">Drag & drop file here</div>
        <div className={"component-container-label-secondary " + (draggingOver ? "hidden" : "")}>or</div>
        <div className="file-input">
          <input type="file" id="file" className="file" onChange={(e) => this.setFile(e.currentTarget.files[0])}/>
          <label htmlFor="file" className={draggingOver ? "hidden" : null}>Choose file</label>
        </div>
    </div> : <div className={"component-container"}>
        <DescriptionOutlinedIcon className="component-container-icon" />
        <div className="component-container-label-main file-name">{file.name}</div>
        <div className="component-container-label-secondary file-size">{formatBytes(file.size)}</div>
        <div className="component-container-link-button" onClick={() => this.setFile(null)}>cancel</div>
    </div>
  }
}

export default FileInput;
