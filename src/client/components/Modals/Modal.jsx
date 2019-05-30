import React, { Component } from 'react';

import styles from './Modal.css';

export default class Modal extends Component {

  render () {
    const modalClassNames = [ 'border', styles.Modal, this.props.className ];
    const backdropClassNames = [ styles.Backdrop ];

    if (this.props.show) {
      modalClassNames.push(styles.ModalVisible);
      backdropClassNames.push(styles.BackdropVisible);
    }

    return [
      <div className={backdropClassNames.join(' ')} onClick={this.props.onBackdropClick} key="backdrop"></div>,
      <div className={modalClassNames.join(' ')} key="modal">
        {this.props.children}
      </div>
    ];
  }
}
