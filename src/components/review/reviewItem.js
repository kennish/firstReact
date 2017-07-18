import TextareaBar from 'textarea/textarea';

export default class ReviewItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            iItem: this.props.item.chid,
            textareaStatus: false,
            titleValue: '',
            textValue: ''
        }
        this.changeStatus = this.changeStatus.bind(this);
        this.changeTitleValue = this.changeTitleValue.bind(this);
        this.changeTextValue = this.changeTextValue.bind(this);
        this.submitValue = this.submitValue.bind(this);
        this.allChid = this.allChid.bind(this);
    }

    changeStatus() {
        this.setState({
            textareaStatus: !this.state.textareaStatus
        })
    }

    changeTitleValue(ev) {
        this.setState({
            titleValue: ev.target.value
        })
    }

    changeTextValue(ev) {
        this.setState({
            textValue: ev.target.value
        })
    }

    submitValue(chid){

        let {titleValue, textValue} = this.state;

        if(titleValue == '' || textValue == '') {
            alert('写点什么吧');
            return
        };

        let addChid = [];
		if(chid !== undefined){
			addChid = chid;
		}
		
		let obj = {};
		obj.title = titleValue;
		obj.text = textValue;
		obj.chid = [];
		addChid.push(obj);

        this.setState({
            iItem: addChid,
            titleValue: '',
            textValue: '',
            textareaStatus: !this.state.textareaStatus
        })
    }

    allChid(chid) {
        return chid.map((item, index) => {
            return (
                <ReviewItem key={index} item={item} />
            )
        })
    }

    render() {
        let {icon, title, text, time, chid} = this.state.item;
        let {textareaStatus, titleValue, textValue} = this.state;
        let {changeStatus, changeTitleValue, changeTextValue, submitValue} = this;
        
        return (
            <div className="media">
                <div className="media-left">
                    <a href="javascript:;">
                        <img className="media-object reviewIcon" src={require('img/item.jpg')} />
                    </a>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">{title}</h4>
                    <p>{text}</p>
                    <p>{time}</p>
                    <a href="javascript:;" onClick={changeStatus}>回复</a>
                    {
                        textareaStatus ? <TextareaBar {...{changeTitleValue, changeTextValue, submitValue, chid, titleValue, textValue}} /> : ''
                    }
                    {
                        chid ? this.allChid(chid) : ''
                    }
                </div>
            </div>
        )
    }
    
}