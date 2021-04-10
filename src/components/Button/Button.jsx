import PropTypes from 'prop-types';
import css from './Button.module.scss';

const Button = ({ onClick }) => (
    <button type="button" onClick={onClick} className={css.Button}>
        Загрузить еще
    </button>
);

Button.propTypes = { onClick: PropTypes.func.isRequired };

export default Button;
