
import ReviewItem from './reviewItem';

let itemDatas = [
    {
        icon: 'img/item.jpg',
        title: '吉安娜',
        text: '这是一部很不错的电影，场景很震撼，超喜欢里面的主角...',
        time: '2017-05-01',
        isstatus: false,
        chid: []
    },
    {
        icon: 'img/item.jpg',
        title: '希尔瓦娜斯',
        text: '这是一部很不错的电影，场景很震撼，超喜欢里面的主角...',
        time: '2017-05-01',
        isstatus: false,
        chid: [
            {
                icon: 'img/item.jpg',
                title: '瓦里安',
                text: '这是一部很不错的电影，场景很震撼，超喜欢里面的主角...',
                time: '2017-05-01',
                isstatus: false,
                chid: []
            }
        ]
    },
    {
        icon: 'img/item.jpg',
        title: '萨尔',
        text: '这是一部很不错的电影，场景很震撼，超喜欢里面的主角...',
        time: '2017-05-01',
        isstatus: false,
        chid: []
    }
]

export default class ReviewList extends React.Component{

    render() {
        let myList = null;
        myList = itemDatas.map((item, index) => {
            return (
                <ReviewItem key={index} item={item}/>
            )
        })
        return (
            <div className="bs-example" data-example-id="media-list">
                <div className="media-list">
                    {myList}
                </div>
            </div>
        )
    }
    
}