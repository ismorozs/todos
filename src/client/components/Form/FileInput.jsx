import React, { Component } from 'react';

import styles from './Form.css';

export default class FileInput extends Component {

  constructor(props) {
    super(props);
    this.imagePreview = React.createRef();
    this.fileInputButton = React.createRef();
  }

  onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.imagePreview.current.src = reader.result;
    };

    reader.readAsDataURL(file);
    
    this.props.onChange({
      [this.props.fieldName]: { value: file },
    });
  }

  onImageRemove = (e) => {
    e.stopPropagation();
    this.imagePreview.current.src = '';
    this.props.onChange({
      [this.props.fieldName]: { value: '' }
    });
  }

  onImageAdd = (e) => {
    this.fileInputButton.current.click();
  }

  render () {
    const props = {
      id: this.props.id,
      type: this.props.type,
      className: 'outOfSight',
      onChange: this.onChange
    };

    const removeButtonClassNames = [styles.imageButton, styles.removeImageButton];
    const addButtonClassNames = [styles.imageButton, styles.addImageButton, 'hidden'];

    if (!this.props.value) {
      props.value = '';
      removeButtonClassNames.push('hidden');
      addButtonClassNames.pop();
    }

    return (
      <div>
        <div className={styles.imagePreviewContainer} onClick={this.onImageAdd}>
          <img className={styles.imagePreview} ref={this.imagePreview} src={this.props.value} />
          <span className={addButtonClassNames.join(' ')}>
            <span></span>
          </span>
          <span className={removeButtonClassNames.join(' ')} onClick={this.onImageRemove}></span>
          <input {...props} ref={this.fileInputButton} />
        </div>
      </div>
    );
  }
}
