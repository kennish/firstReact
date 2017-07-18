export default function TextareaBar(props){
    let {changeTitleValue, changeTextValue, submitValue, chid, titleValue, textValue} = props;
    return (
        <div className="textareaBar">
            <input type="text" className="form-control" value={titleValue} onChange={changeTitleValue} style={{width:'100%', marginBottom:10}} placeholder="回复标题" />
            <textarea className="textareaInp" value={textValue} onChange={changeTextValue} placeholder="回复内容"></textarea>
            <button className="textareaBtn" onClick={() =>submitValue(chid)}>提交</button>
        </div>
    )
    
}