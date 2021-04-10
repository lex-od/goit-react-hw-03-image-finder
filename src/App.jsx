import { Component } from 'react';
import Loader from 'react-loader-spinner';
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

        this.setState({ isLoading: true });

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
        } finally {
            this.setState({ isLoading: false });
        }
    };

    isLastPage() {
        const { currPage, totalCount } = this.state;
        return currPage * PAGE_SIZE >= totalCount;
    }

    render() {
        const { images, isLoading } = this.state;

        const isLoadMoreShow = !this.isLastPage() && !isLoading;

        return (
            <div className={css.App}>
                <Searchbar onSubmit={this.handleChangeQuery} />
                <ImageGallery images={images} />
                {isLoadMoreShow && (
                    <Button onClick={this.searchNextPage}>Загрузить еще</Button>
                )}

                {isLoading && (
                    <Loader
                        // visible={true}
                        type="Grid"
                        color="#3f51b5"
                        height={150}
                        width={150}
                        timeout={0}
                        className={css.Loader}
                    />
                )}
            </div>
        );
    }
}

export default App;
