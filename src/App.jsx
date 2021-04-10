import { Component } from 'react';
import css from './styles/App.module.scss';
import pixApi from './services/pixabayApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button';

const PAGE_SIZE = 12;
const STATE_BASE = {
    images: [],
    currPage: 0,
    totalCount: 0,
};

class App extends Component {
    state = {
        ...STATE_BASE,
        searchQuery: '',
        isLoading: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.searchNextPage();
        }

        if (
            this.state.currPage > prevState.currPage &&
            this.state.currPage > 1
        ) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
    }

    handleChangeQuery = query => {
        // Без этой проверки повторный поиск по последнему запросу приведет к пустой галерее
        if (query === this.state.searchQuery) return;

        if (this.state.isLoading) return;

        this.setState({ ...STATE_BASE, searchQuery: query });
    };

    searchNextPage = async () => {
        const { searchQuery, currPage } = this.state;

        try {
            const { hits, totalHits } = await pixApi.searchImages(
                searchQuery,
                currPage + 1,
                PAGE_SIZE,
            );

            this.setState(({ images, currPage }) => ({
                images: [...images, ...hits],
                currPage: currPage + 1,
                totalCount: totalHits,
            }));
        } catch (err) {
            console.log(`${err.name}: ${err.message}`);
        }
    };

    isLastPage() {
        const { currPage, totalCount } = this.state;
        return currPage * PAGE_SIZE >= totalCount;
    }

    render() {
        // console.log('isLastPage:', this.isLastPage());
        // console.log(this.state.images);

        const { images } = this.state;

        return (
            <div className={css.App}>
                <Searchbar onSubmit={this.handleChangeQuery} />

                <ImageGallery images={images} />

                {!this.isLastPage() && <Button onClick={this.searchNextPage} />}
            </div>
        );
    }
}

export default App;
