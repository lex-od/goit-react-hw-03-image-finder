import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ image, onClick }) => (
    <li className={css.ImageGalleryItem}>
        <img
            src={image}
            alt=""
            className={css.ImageGalleryItemImage}
            onClick={onClick}
        />
    </li>
);

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
