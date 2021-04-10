import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.scss';

const modalRootRef = document.querySelector('#modal-root');

export default class Modal extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    };

    render() {
        const { children } = this.props;

        return createPortal(
            <div className={css.Overlay} onClick={this.handleOverlayClick}>
                <div className={css.Modal}>{children}</div>
            </div>,
            modalRootRef,
        );
    }
}
