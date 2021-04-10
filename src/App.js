import { Component } from 'react';
import css from './styles/App.module.scss';
import pixApi from './services/pixabayApi';
import Searchbar from './components/Searchbar';

const PAGE_SIZE = 12;
const INIT_STATE = {
    images: [],
    searchQuery: '',
    currPage: 0,
    totalCount: 0,
};

class App extends Component {
    state = { ...INIT_STATE };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.searchNextPage();
        }
    }

    handleChangeQuery = query => {
        this.setState({ ...INIT_STATE, searchQuery: query });
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

        return (
            <div className={css.App}>
                <Searchbar onSubmit={this.handleChangeQuery} />
            </div>
        );
    }
}

export default App;
