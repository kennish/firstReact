import SignBar from 'signBar/signBar';

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userNameVal: '',
            passwVal: '',
            userNameErr: '',
            passwErr: '',
            userNameErrStatus: false,
            passwErrStatus: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.userNameChange = this.userNameChange.bind(this);
        this.passwChange = this.passwChange.bind(this);
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
    onSubmit(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let {userNameVal, passwVal} = this.state;
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
        }
        let {siginInAjax} = this.props;
        siginInAjax({username: userNameVal, passw: passwVal});
    }
    onKeySubmit(ev) {
        if(ev.keyCode !== 13) return;
        this.onSubmit(ev);
    }
    render() {
        let {onSubmit, userNameChange, passwChange, onKeySubmit} = this;
        let {userNameVal, passwVal, userNameErr, userNameErrStatus, passwErr, passwErrStatus} = this.state;
        return (
            <div>
                <SignBar {...{userNameChange, passwChange, userNameVal, passwVal, userNameErr, userNameErrStatus, passwErr, passwErrStatus, onKeySubmit}}>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-primary" onClick={onSubmit}>登录</button>
                        </div>
                    </div>
                </SignBar>
            </div>
        )
    }
}