import {
    BrowserRouter as Router,
    Route,
    hashHistory
} from 'react-router-dom';
require('common/css/style.css');

import Frame from 'frame/Frame';

$.ajaxSetup({
    xhrFields: {withCredentials: true}
});

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={Frame}/>
        </div>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
