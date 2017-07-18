import { Link, NavLink} from 'react-router-dom';

let propTypes = {
    getData: PT.func,
    comingSoonData: PT.func,
    pathname: PT.string
}

export default function SearchMenu(props){
    let {getData, comingSoonData, pathname} = props;
    console.log(pathname)
    return (
        <div className="searchMenu">
            <Link to="/list" onClick={getData} className={pathname === '/list' ? 'active':''}>正在热映</Link>
            <Link to="/list/sy" onClick={comingSoonData} className={pathname === '/list/sy' ? 'active':''}>即将上映</Link>
            {/*<NavLink exact to="/list/boxOffice" activeClassName="active" onClick={boxOfficeData}>北美票房榜</NavLink>*/}
        </div>
    )
}

SearchMenu.propTypes = propTypes;