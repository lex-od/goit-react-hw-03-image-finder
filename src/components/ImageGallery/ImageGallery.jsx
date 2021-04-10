import PropTypes from 'prop-types';
import css from './ImageGallery.module.scss';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onItemClick }) => (
    <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => {
            const handleItemClick = () => onItemClick(largeImageURL);

            return (
                <ImageGalleryItem
                    key={id}
                    image={webformatURL}
                    onClick={handleItemClick}
                />
            );
        })}
    </ul>
);

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;
