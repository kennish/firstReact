export default class Map extends React.Component{

    componentDidMount () {

        // 百度地图API功能
        var map = new BMap.Map("l-map");            // 创建Map实例
        map.centerAndZoom('上海', 15);
        map.enableScrollWheelZoom(true);
        var myKeys = ["电影"];
        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map, panel:"r-result"},
            pageCapacity:5  //1为精准匹配 2345..往后匹配更多
        });
        local.searchInBounds(myKeys, map.getBounds());
        
        console.log(local)

    }
    
    render() {
        return(
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <div id="r-result"></div>
                </div>
                <div className="col-sm-6 col-md-8">
                    <div id="l-map" style={{width:'100%', height: '500px'}}></div> 
                </div>
            </div>
        )
    }
    
}