import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.scss';

export default class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        query: '',
    };

    handleChange = e => {
        this.setState({ query: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state.query);

        this.setState({ query: '' });
    };

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>
                            Искать
                        </span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Искать изображения и фото"
                        onChange={this.handleChange}
                        value={this.state.query}
                    />
                </form>
            </header>
        );
    }
}
