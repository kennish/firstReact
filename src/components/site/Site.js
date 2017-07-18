export default class Site extends React.Component{
    render() {
        let {siteDatas, removeSite} = this.props;
        siteDatas = siteDatas.map((item, index) => {
            return (
                <div className="alert alert-warning alert-dismissible" key={index}>
                    <button type="button" onClick={ev => removeSite(item)} className="close">
                        <span>&times;</span>
                    </button>
                    <strong>地址</strong> {item.ssq}
                </div>
            )
        })
        return (
            <div>
                {siteDatas}
            </div>
        )
    }
}