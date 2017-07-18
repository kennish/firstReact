import Ajax from 'ajax/ajax';
import SearchBar from 'search/search';
import SearchMenu from 'search/searchMenu';
import RecommendList from 'home/recommendList';
import NavPage from 'navPage/navPage';

export default class List extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            searchText: '',
            total: null
        }
        this.getData = this.getData.bind(this);
        this.comingSoonData = this.comingSoonData.bind(this);
        this.boxOfficeData = this.boxOfficeData.bind(this);
        this.searchData = this.searchData.bind(this);
        this.changeText = this.changeText.bind(this);
        this.keySearchData = this.keySearchData.bind(this);
    }

    //搜索
    searchData() {
        let {searchText} = this.state;
        const that = this;
        Ajax.get({
            url: '/v2/movie/search',
            data: {count: 12, q: searchText},
            success: function(res){
                that.setState({
                    data: res.subjects,
                    loading: true,
                    searchText: '',
                    total: res.total
                })
            }
        })
    }
    
    //回车键搜索
    keySearchData(ev) {
        if(ev.keyCode == 13){
            let {searchText} = this.state;
            const that = this;
            that.setState({
                loading: false
            })
            Ajax.get({
                url: '/v2/movie/search',
                data: {count: 12, q: searchText},
                success: function(res){
                    that.setState({
                        data: res.subjects,
                        loading: true,
                        searchText: '',
                        total: res.total
                    })
                }
            })
        }
    }

    changeText(ev) {
        this.setState({
            searchText: ev.target.value
        })
    }

    //正在热映
    getData() {
        const that = this;
        that.setState({
            loading: false
        })
        Ajax.get({
            url: '/v2/movie/in_theaters',
            data: {start: 0, count: 12, city: '杭州'},
            success: function(res){
                console.log(res)
                that.setState({
                    data: res.subjects,
                    loading: true,
                    total: res.total
                })
            }
        })
    }
    
    //即将上映
    comingSoonData() {
        const that = this;
        that.setState({
            loading: false
        })
        Ajax.get({
            url: '/v2/movie/coming_soon',
            data: {count: 12, city: '杭州'},
            success: function(res){
                that.setState({
                    data: res.subjects,
                    loading: true,
                    total: res.total
                })
            }
        })
    }

    //票房榜
    boxOfficeData() {
        const that = this;
        Ajax.get({
            url: '/v2/movie/us_box',
            data: {count: 12, city: '上海'},
            success: function(res){
                that.setState({
                    data: res.subjects,
                    loading: true
                })
            }
        })
    }

    render() {
        let {data, loading, searchText, total} = this.state;
        let {location:{pathname}} = this.props;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            <div className="searchBarWrap">
                                <SearchBar 
                                    {...{
                                        searchData: this.searchData,
                                        changeText: this.changeText,
                                        keySearchData: this.keySearchData,
                                        searchText: searchText
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="searchMenuWrap">
                                <SearchMenu 
                                {...{
                                    getData: this.getData,
                                    comingSoonData: this.comingSoonData,
                                    boxOfficeData: this.boxOfficeData,
                                    pathname: pathname
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="recommend-Wrap">
                        <div className="container">
                            <div className="recommend-Wrap">
                                <RecommendList data={data} loading={loading}/>
                                <NavPage {...{total,loading}}/>
                            </div>
                        </div>   
                    </div>
                    
            </div>
        )
    }

    componentDidMount() {
        let {location:{pathname}} = this.props;
        if(pathname === '/list') {
            this.getData();
        } else if(pathname === '/list/sy'){
            this.comingSoonData();
        }
        
    }
    
}