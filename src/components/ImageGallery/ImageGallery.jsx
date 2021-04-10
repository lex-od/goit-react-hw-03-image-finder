import PropTypes from 'prop-types';
import css from './ImageGallery.module.scss';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images }) => (
    <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL }) => (
            <ImageGalleryItem key={id} image={webformatURL} />
        ))}
    </ul>
);

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            // largeImageURL: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default ImageGallery;
