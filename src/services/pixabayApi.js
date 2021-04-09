import axios from 'axios';

const API_KEY = '20679339-fea13a2297aa7649e9595d106',
    BASE_URL = 'https://pixabay.com/api/';

async function searchImages(query = '', page = 1, perPage = 12) {
    const { data } = await axios.get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    );

    return data;
}

const pixabayApi = { searchImages };
export default pixabayApi;
