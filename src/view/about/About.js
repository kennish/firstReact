import Provinces from 'provinces/Provinces';

export default class About extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        let {imgArrO, imgArrT} = this.state;
        return (
            <div className="container">
                <Provinces/>
            </div>
        )
    }
}