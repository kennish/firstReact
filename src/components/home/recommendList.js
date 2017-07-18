import RecommendItem from 'home/recommendItem';

let propTypes = {
    data: PT.array,
    loading: PT.bool
}

export default class RecommendList extends React.Component{
    render() {
        let {data, loading} = this.props;
        console.log(loading)
        let items = data;
        items = items.map((item, index) => {
            return (
                <RecommendItem 
                {...
                    {
                        title: item.title,
                        casts: item.casts,
                        year: item.year,
                        imagesSrc: item.images.large,
                        genres: item.genres,
                        directors: item.directors,
                        itemId: item.id
                    }
                } 
                key={index}/>
            )
        })
        return (
            <div>
                {
                    !loading ?
                    <div className="text-center">拼命加载中...</div>
                    :
                    <div className="row">{items}</div>
                }
            </div>  
        )
    }
}

RecommendList.propTypes = propTypes;