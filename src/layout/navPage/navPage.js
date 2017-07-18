require('common/pager/pager.css');
require('common/pager/pager.js');

export default class NavPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.doChangePage = this.doChangePage.bind(this);
    }
    
    doChangePage(iNow) {
        console.log(iNow.index)
    }

    render() {
        let {total, loading} = this.props;
        let pagerBox = this.refs.pager1;
        $(pagerBox).html('');
        if(total && loading){
            var pager = new Pager({
                index: 1,
                total: total/12,
                parent: pagerBox,
                onchange: this.doChangePage
            });
        }
        return (
           <div ref="pager1">123</div>
        )
    }

}