import { Link, NavLink} from 'react-router-dom';

let propTypes = {
    title: PT.string,
    casts: PT.array,
    year: PT.string,
    imagesSrc: PT.string,
    genres: PT.array,
    directors: PT.array
}

export default function RecommendList(props){
    let {title, casts, year, imagesSrc, genres, directors, itemId} = props;

        let protagonist = casts;

        protagonist = protagonist.map((item,index) => {
            return <span className="mr6" key={index}>{item.name}</span>
        });

        genres = genres.map((item, index) => {
            return <span className="mr6" key={index}>{item}</span>
        })

        directors = directors.map((item, index) => {
            return <span className="mr6" key={index}>{item.name}</span>
        })
        
        return (
            <div className="col-sm-6 col-md-3">
                <div className="thumbnail">
                    <Link className="thumbnailImg" to={{
                        pathname: '/details',
                        state: {
                            id: itemId
                        }
                    }}>
                        <img className="w100" src={imagesSrc} />
                    </Link>
                    <div className="caption">
                        <h3 className="whiteSpace">{title}</h3>
                        <p className="whiteSpace">类型：{genres}</p>
                        <p className="whiteSpace">主演：{protagonist}</p>
                        <p className="whiteSpace">导演：{directors}</p>
                        <p>上映日期：{year}</p>
                    </div>
                </div>
            </div>
        )
}

RecommendList.propTypes = propTypes;