import SignBar from 'signBar/signBar';
export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userNameVal: '',
            passwVal: '',
            confirmPassVal: '',
            userNameErr: '',
            passwErr: '',
            confirmPassErr: '',
            userNameErrStatus: false,
            passwErrStatus: false,
            confirmPassStatus: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.userNameChange = this.userNameChange.bind(this);
        this.passwChange = this.passwChange.bind(this);
        this.confirmPassChange = this.confirmPassChange.bind(this);
        this.onKeySubmit = this.onKeySubmit.bind(this);
    }
    userNameChange(ev) {
        let val = ev.target.value;
        if(val == '') {
            this.setState({
                userNameVal: val,
                userNameErr: '不能为空',
                userNameErrStatus: true
            })
            return;
        }
        if(val.length > 6) {
            this.setState({
                userNameVal: val,
                userNameErr: '最长为6',
                userNameErrStatus: true
            })
            return;
        }
        
        this.setState({
            userNameVal: val,
            userNameErr: '',
            userNameErrStatus: false
        })
    }
    passwChange(ev) {
        let val = ev.target.value;
        if(val == ''){
            this.setState({
                passwVal: val,
                passwErrStatus: true,
                passwErr: '不能为空'
            })
            return;
        }
        this.setState({
            passwVal: val,
            passwErrStatus: false,
            passwErr: ''
        })
    }
    confirmPassChange(ev) {
        let val = ev.target.value;
        if(val == ''){
            this.setState({
                confirmPassVal: val,
                confirmPassStatus: true,
                confirmPassErr: '不能为空'
            })
            return;
        }
        this.setState({
            confirmPassVal: val,
            confirmPassStatus: false,
            confirmPassErr: ''
        })
    }
    onSubmit(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let {userNameVal, passwVal, confirmPassVal} = this.state;
        if(userNameVal == ""){
            this.setState({
                userNameErrStatus: true,
                userNameErr: '不能为空'
            })
            return;
        } else if(passwVal == ""){
            this.setState({
                passwErrStatus: true,
                passwErr: '不能为空'
            })
            return;
        } else if(confirmPassVal != passwVal){
            this.setState({
                confirmPassStatus: true,
                confirmPassErr: '密码不同'
            })
            return;
        }
        let {siginUpAjax} = this.props;
        siginUpAjax({username: userNameVal, passw: passwVal, cfPassw: confirmPassVal});
    }
    onKeySubmit(ev) {
        if(ev.keyCode !== 13) return;
        this.onSubmit(ev);
    }
    render() {
        let {onSubmit, userNameChange, passwChange, confirmPassChange, onKeySubmit} = this;
        let {userNameVal, passwVal, userNameErr, userNameErrStatus, passwErr, passwErrStatus, confirmPassVal, confirmPassStatus, confirmPassErr} = this.state;
        return (
            <SignBar {...{userNameChange, passwChange, userNameVal, passwVal, userNameErr, userNameErrStatus, passwErr, passwErrStatus, onKeySubmit}}>
                <div className={`form-group ${confirmPassStatus ? 'has-error' : null}`}>
                    <div className="col-sm-2 control-label">确认密码</div>
                    <div className="col-sm-8">
                        <input type="password" 
                        value={confirmPassVal} 
                        onChange={confirmPassChange} 
                        onKeyDown={onKeySubmit}
                        className="form-control" 
                        placeholder="确认密码"/>
                        <span style={{color:'#a94442',marginTop:6,display:'block'}}>{confirmPassErr}</span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" onClick={onSubmit} className="btn btn-primary">注册</button>
                    </div>
                </div>
            </SignBar>
        )
    }
}