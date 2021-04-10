import PropTypes from 'prop-types';
import css from './Button.module.scss';

const Button = ({ onClick, children }) => (
    <button type="button" onClick={onClick} className={css.Button}>
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;
