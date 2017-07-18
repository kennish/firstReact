import { Link, NavLink} from 'react-router-dom';

export default function Nav(props){
    let {myInfo, logout, toggleMask, maskTouchMove} = props;
    let navList = [
        {link: '/sign_in', text: '登录'},
        {link: '/sign_up', text: '注册'}
    ]
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" onClick={toggleMask} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <i className="icon-bar"></i>
                        <i className="icon-bar"></i>
                        <i className="icon-bar"></i>
                    </button>
                    <Link className="navbar-brand" to="/">Logo</Link>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" onTouchMove={maskTouchMove}>
                    <ul className="nav navbar-nav">
                        <li>
                            <NavLink exact to="/" activeClassName="active" onClick={toggleMask} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">首页</NavLink>
                        </li>
                        <li>
                            <NavLink to={{
                                pathname: '/list',
                                state: {
                                    qindong: 666
                                }
                            }} activeClassName="active" onClick={toggleMask} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">电影</NavLink>
                        </li>
                        <li>
                            {/* <NavLink to="/boxOffice" activeClassName="active">票房</NavLink> */}
                        </li>
                        <li>
                            <NavLink to="/about" activeClassName="active" onClick={toggleMask} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">我的</NavLink>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {
                            myInfo ? (
                                <li><a href="javascript:;" onClick={logout}>退出</a></li>
                            ) : (
                                navList.map((item,index) => {
                                    return <li key={index}>
                                        <NavLink to={item.link} activeClassName="active" onClick={toggleMask} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">{item.text}</NavLink>
                                    </li>
                                })
                            )
                        }
                    </ul>
                </div>

            </div>
        </nav>
    );
}