import {NavLink} from 'react-router-dom';

export default class SignBar extends React.Component{
    render() {
        let {children, userNameChange, passwChange, userNameVal, userNameErr, userNameErrStatus, passwErr, passwErrStatus, passwVal, onKeySubmit} = this.props;
        return (
            <div className="container signBar">
                <div className="row">
                    <div className="col-sm-12 text-center" style={{marginBottom:50,marginTop:50}}>
                        <NavLink className="signTitle" to="/sign_in" activeClassName="active">登录</NavLink>
                        <span style={{marginLeft:20,marginRight:20,color:'#d1d1d1',verticalAlign: "super"}}>|</span>
                        <NavLink className="signTitle" to="/sign_up" activeClassName="active">注册</NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <div className="form-horizontal">
                            <div className={`form-group ${userNameErrStatus ? 'has-error' : null}`}>
                                <div className="col-sm-2 control-label">用户名</div>
                                <div className="col-sm-8">
                                    <input type="email" className="form-control"
                                    value={userNameVal} 
                                    onChange={userNameChange} 
                                    onKeyDown={onKeySubmit}
                                    placeholder="用户名"/>
                                    <span style={{color:'#a94442',marginTop:6,display:'block'}}>{userNameErr}</span>
                                </div>
                            </div>
                            <div className={`form-group ${passwErrStatus ? 'has-error' : null}`}>
                                <div className="col-sm-2 control-label">密码</div>
                                <div className="col-sm-8">
                                    <input type="password" className="form-control" 
                                    value={passwVal} 
                                    onChange={passwChange} 
                                    onKeyDown={onKeySubmit} 
                                    placeholder="密码"/>
                                    <span style={{color:'#a94442',marginTop:6,display:'block'}}>{passwErr}</span>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}