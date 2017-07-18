import RecommendList from 'home/recommendList';
import Slideshow from 'slideshow/slideshow';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            imgArrO: [
                {
                    src: 'http://img.zcool.cn/community/focus/bcae5966e031000001786da793a2.jpg',
                    href: '/sign_in'
                },
                {
                    src: 'http://img.zcool.cn/community/focus/18365966e065000001786d516223.jpg',
                    href: '/sign_in'
                },
                {
                    src: 'http://img.zcool.cn/community/focus/bc0d5966df79000001786daf453a.jpg',
                    href: '/sign_in'
                },
                {
                    src: 'http://img.zcool.cn/community/focus/b1825966df11000001786d62b375.jpg',
                    href: '/sign_in'
                }
            ]
        }
    }
    getData() {
        const that = this;
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/movie/in_theaters',
            data: {count: 12, city: '上海'},
            dataType: 'jsonp',
            success: function(res){
                console.log(res);
                that.setState({
                    data: res.subjects,
                    loading: true
                })
            }
        })
    }
    render(){

        let {data, loading, imgArrO} = this.state;
        
        return (
            <div>
                <div className="container">
                    <div className="banner">
                        <Slideshow {...{imgArr: imgArrO}}/>
                    </div>
                </div>
                <div className="recommend-bar">
                    <h2>最新推荐</h2>
                    <div className="recommend-Wrap">
                        <div className="container">
                            <RecommendList data={data} loading={loading}/>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
    componentDidMount() {
        this.getData()
    }
}