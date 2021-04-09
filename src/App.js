import { Component } from 'react';
import css from './styles/App.module.scss';
import pixApi from './services/pixabayApi';

const PAGE_SIZE = 12;

class App extends Component {
    state = {
        images: [],
        searchQuery: '',
        currPage: 0,
        totalCount: 0,
    };

    componentDidMount() {
        // this.handleChangeQuery('ff');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.searchNextPage();
        }
    }

    handleChangeQuery = query => {
        this.setState({ searchQuery: query, currPage: 0 });
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
                images: [...images, hits],
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
        console.log('isLastPage:', this.isLastPage());

        return (
            <div className={css.App}>
                <button onClick={this.searchNextPage}>Next Page</button>
            </div>
        );
    }
}

export default App;
