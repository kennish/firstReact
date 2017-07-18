import { Link, NavLink} from 'react-router-dom';

export default class NavPageItem extends React.Component{
    render() {
        let {index} = this.props;
        return(
            <li>
                <NavLink to="#">{index}</NavLink>
            </li>
        )
    }
}