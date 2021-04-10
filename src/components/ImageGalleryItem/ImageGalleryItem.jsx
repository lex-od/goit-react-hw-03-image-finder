import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ image }) => (
    <li className={css.ImageGalleryItem}>
        <img src={image} alt="" className={css.ImageGalleryItemImage} />
    </li>
);

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
