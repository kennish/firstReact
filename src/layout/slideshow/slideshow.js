import {Link} from 'react-router-dom';
require('./slideshow.css');

let propTypes = {
    imgArr: PT.array
}

export default class Slideshow extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            endStatus: true,
            clearTimer: null,
            imgArr: this.props.imgArr
        }
        this.prevClick = this.prevClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.wrapMouseMove = this.wrapMouseMove.bind(this);
        this.wrapMouseOut = this.wrapMouseOut.bind(this);
        this.aotoPlay = this.aotoPlay.bind(this);
    }

    prevClick(ev) {
        let {i, imgArr, endStatus} = this.state;
        let {box, subscriptBar} = this.refs;
        let that = this;
        if(i >= 0){
            if(endStatus == true){
                
                this.setState({
                    i: i-1,
                    endStatus: false
                })
                
                let transitionFlag = true;  //阻止transitionend事件多次执行
                let _width = $(box).width();
                $(box).css({
                    transition: 'transform .6s'
                }).on('transitionend',() => {
                    if(transitionFlag) {
                        transitionFlag = false;
                        if(this.state.i == 0){
                            $(box).css({
                                transition: 'transform 0s'
                            })
                            this.setState({
                                i: imgArr.length-2
                            })
                        }
                        this.setState({
                            endStatus: true
                        })
                        $(subscriptBar).find("a").eq(this.state.i-1).addClass("active").siblings().removeClass("active");
                    }
                })
            }
        }  
    }

    nextClick() {
        setTimeout(() => {
            if(this.state.endStatus){
                this.setState({
                    endStatus: false
                })
                let {box, subscriptBar} = this.refs;
                let that = this;
                if(this.state.i < this.state.imgArr.length-1){
                    this.setState({
                        i: this.state.i+1
                    })
                    var transitionFlag = true;  //阻止transitionend事件多次执行
                    $(box).css({
                        transition: 'transform .6s'
                    }).on('transitionend',() => {
                        if(transitionFlag) {
                            transitionFlag = false;
                            if(this.state.i == this.state.imgArr.length-1){
                                $(box).css({
                                    transition: 'transform 0s'
                                })
                                this.setState({
                                    i: 1
                                })
                            }
                            this.setState({
                                endStatus: true
                            })
                            $(subscriptBar).find("a").eq(this.state.i-1).addClass("active").siblings().removeClass("active");
                        }
                    })
                }
            }
        },0)
    }

    aotoPlay() {
        this.interval = setInterval(() => {
            this.nextClick()
        },3000)
    }

    wrapMouseMove() {
        clearInterval(this.interval);
    }

    wrapMouseOut() {
        this.aotoPlay();
    }

    componentWillMount() {
        let {i, imgArr} = this.state;
        let newImgArr = null;
        newImgArr = imgArr;
        newImgArr.push(imgArr[0]);
        newImgArr.unshift(imgArr[imgArr.length-2]);
        this.setState({
            imgArr: newImgArr
        })
    }

    componentDidMount() {
        this.aotoPlay();
        let {subscriptBar} = this.refs;
        $(subscriptBar).find("a").eq(0).addClass("active");
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let {prevClick, nextClick, wrapMouseMove, wrapMouseOut} = this;
        let {i, imgArr} = this.state;
        return (
            <div className="slideshowWrap" onMouseMove={wrapMouseMove} onMouseOut={wrapMouseOut}>
                <div className="slideshowBox" ref="box" style={{transform: `translateX(-${100*i}%)`}}>
                    {
                        imgArr.map((item, index) => {
                            return (
                                <Link key={index} to={item.href}>
                                    <img src={item.src} />
                                </Link>
                            )
                        })
                    }
                </div>
                <a className="prev" href="javascript:;" onClick={prevClick}>上</a>
                <a className="next" ref="nextBtn" href="javascript:;" onClick={nextClick}>下</a>
                <div className="subscriptBar" ref="subscriptBar">
                    {   
                        imgArr.map((item, index) => {
                            if(index < imgArr.length-2){
                                return (
                                    <a key={index} href="javascript:;" className="subscript"></a>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

Slideshow.propTypes = propTypes;