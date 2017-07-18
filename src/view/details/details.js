import Ajax from 'ajax/ajax';
import ReviewList from 'review/ReviewList';

let propTypes = {
    title: PT.string,
    casts: PT.array,
    imagesSrc: PT.string,
    genres: PT.array,
    directors: PT.array,
    year: PT.string,
    imgSrc: PT.string,
    summary: PT.string,
    rating: PT.object

}

export default class Details extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            genres: [],
            casts: [],
            directors: [],
            year: '',
            imgSrc: '',
            summary: '',
            rating: ''
        }
        this.getDetailsData = this.getDetailsData.bind(this);
    }
    
    getDetailsData() {
        let {location:{state:{id}}} = this.props;
        const that = this;
        Ajax.get({
            url: '/v2/movie/subject/'+id,
            data: '',
            success: function(res){
                console.log(res);
                that.setState({
                    title: res.title,
                    genres: res.genres,
                    casts: res.casts,
                    directors: res.directors,
                    year: res.year,
                    imgSrc: res.images.large,
                    summary: res.summary,
                    rating: res.rating
                })
            }
        })
    }

    render() {

        let {title, genres, casts, directors, year, imgSrc, summary, rating:{average}} = this.state;
        
        genres = genres.map((item, index) => {
            return <span className="mr6" key={index}>{item}</span>
        })

        casts = casts.map((item, index) => {
            return <span className="mr6" key={index}>{item.name}</span>
        })

        directors = directors.map((item, index) => {
            return <span className="mr6" key={index}>{item.name}</span>
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <img className="img-thumbnail" src={imgSrc} />
                    </div>
                    <div className="col-sm-6 col-md-8">
                        <h3>{title}</h3>
                        <p>类型：{genres}</p>
                        <p>主演：{casts}</p>
                        <p>导演：{directors}</p>
                        <p>{`上映日期: ${year}`}</p>
                        <p>评分：<span className="text-danger">{average}</span></p>
                        <p>摘要：{summary}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="reviewWrap">
                        <div className="review">
                            <h4>最新影评</h4>
                            <div className="reviewItem">
                                <ReviewList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    componentDidMount() {
        this.getDetailsData();
    }

}

Details.propTypes = propTypes;