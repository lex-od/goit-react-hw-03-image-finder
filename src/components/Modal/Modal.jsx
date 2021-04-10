import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.scss';

export default class Modal extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <div className={css.Overlay}>
                <div className={css.Modal}>{children}</div>
            </div>
        );
    }
}
