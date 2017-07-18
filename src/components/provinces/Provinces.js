import Ajax from 'ajax/ajax';

let ssqData = require('provinces/Provinces.json');

import Site from 'site/Site';

export default class Provinces extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: ssqData,
            cityData: [],
            districtData: [],
            detailedValue: '',
            siteDatas: []
        }
        this.changeProvince = this.changeProvince.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changedistrict = this.changedistrict.bind(this);
        this.detailedSite = this.detailedSite.bind(this);
        this.addSite = this.addSite.bind(this);
        this.removeSite = this.removeSite.bind(this);
    }
   
    changeProvince(ev) {
        let index = ev.target.selectedIndex-1;  //ev.target.selectedIndex获取select的索引
        
        if(index == -1){
            this.setState({
                cityData: [],
                districtData: []
            })
            return;
        }
        let {data} = this.state;

        this.setState({
            cityData: data[index].city,
            districtData: []
        })

        this.refs.city.value = '';

    }

    changeCity(ev) {
        let index = ev.target.selectedIndex-1;

        if(index == -1){
            this.setState({
                districtData: []
            })
            return;
        }

        let {cityData} = this.state;
        this.setState({
            districtData: cityData[index].area
        })

    }

    changedistrict(ev) {
        
    }

    detailedSite(ev) {
        this.setState({
            detailedValue: ev.target.value
        })
    }

    addSite() {
        let {detailedValue, siteDatas} = this.state;
        let provinceValue = this.refs.province.value,
            cityValue = this.refs.city.value,
            districtValue = this.refs.district.value;
        if(provinceValue == '' || cityValue =='' || districtValue == '' || detailedValue == ''){
            layer.msg('请完善信息', {
                offset:'t',
                icon: 5,
                time: 2000
            });
            return;
        }
        let siteShow = provinceValue+'-'+cityValue+'-'+districtValue+'-'+detailedValue;
        let siteObj = {};
        siteObj.ssq = siteShow;
        siteObj.id = new Date().getTime();
        siteDatas.push(siteObj);

        this.setState({
            siteDatas: siteDatas,
            detailedValue: ''
        });

    }

    removeSite(site) {
        let {siteDatas} = this.state;

        siteDatas =  siteDatas.filter(function(item){
            return item.id !== site.id
        })

        this.setState({siteDatas});

    }

    render() {

        let provinceLists = null, cityLists = null, districtLists = null;
        let {data, cityData, districtData, provinceValue, cityValue, districtValue, detailedValue, siteDatas} = this.state;

        provinceLists = data.map((item, index) => {
            return <option key={index} value={item.name}>{item.name}</option>
        })

        cityLists = cityData.map((item, index) => {
            return <option key={index} value={item.name}>{item.name}</option>
        })
        
        districtLists = districtData.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-2">
                        <select className="form-control" name="province" ref="province" onChange={this.changeProvince}>
                            <option value="">请选择省</option>
                            {provinceLists}
                        </select>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        <select className="form-control" name="city" ref="city" onChange={this.changeCity}>
                            <option value="">请选择市</option>
                            {cityLists}
                        </select>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        <select className="form-control" name="district" ref="district" onChange={this.changedistrict}>
                            <option value="">请选择区</option>
                            {districtLists}
                        </select>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <input type="text" className="form-control" placeholder="详细地址" value={detailedValue} onChange={this.detailedSite}/>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        <button className="btn btn-warning" onClick={this.addSite}>确定</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <h4>收货地址</h4>
                        <Site
                            siteDatas={siteDatas}
                            removeSite={this.removeSite}
                        />
                    </div>
                </div>
            </div>
        )
    }
}