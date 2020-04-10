import axios from 'axios';
import {getHeaders} from '../hooks/userHooks';
import {API_PATH, AXIOS_TIMEOUT} from '../constants';
import {getToken} from '../functions';

class Word {
    constructor(english, russian, courseId, onResult) {
        this._data = {english, russian, course_id: courseId};
        this._onResult = onResult;
    }

    create() {
        const token = getToken();
        const url = API_PATH.WORD_CREATE;
        axios.post(url, {...this._data}, {
            timeout: AXIOS_TIMEOUT,
            headers: getHeaders(token)
        })
            .then(
                (res) => {
                    this._onResult(res['statusText'] + ': добавлено слово с id '+ res['data']['id']);
                })
            .catch(e => {
                this._onResult(e.message);
            })
    }

    get status() {
        return this._status;
    }
}

export default Word;