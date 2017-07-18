import Map from 'map/Map'
export default class BoxOffice extends React.Component{

    

    render() {
        let {data} = this.props;
        
        return (
            <div className="container">
                <Map/>
            </div>
        )
    }
}