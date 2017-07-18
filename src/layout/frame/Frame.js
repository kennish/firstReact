import {Route, Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import Details from 'details/details';
import List from 'list/list';
import BoxOffice from 'boxOffice/boxOffice';
import About from 'about/About';
import SignIn from 'sign/signIn';
import SignUp from 'sign/signUp';
import cfg from 'config/config.json';

export default class Layout extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg: null,
            hasLoginReq: false
        }
        this.siginInAjax = this.siginInAjax.bind(this);
        this.siginUpAjax = this.siginUpAjax.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleMask = this.toggleMask.bind(this);
        this.maskTouchMove = this.maskTouchMove.bind(this);
    }

    siginInAjax(reqData) {
        $.post(`${cfg.url}/login`, reqData).done(res => {
            let {code, data} = res;
            console.log(res)
            if(code == 0){
                layer.msg(res.msg, {
                    offset:'t',
                    icon: 6,
                    time: 2000
                });
                setTimeout(() => {
                    this.setState({
                        myInfo: res.data
                    })
                },2000)
            } else{
                layer.msg(res.msg, {
                    offset:'t',
                    icon: 5,
                    time: 2000
                });
            }
        })
    }

    siginUpAjax(reqData) {
        $.post(`${cfg.url}/register`, reqData).done(res => {
            let {code, data} = res;
            console.log(res)
            if(code == 0){
                layer.msg(res.msg, {
                    offset:'t',
                    icon: 6,
                    time: 2000
                });
                setTimeout(() => {
                    this.setState({
                        myInfo: res.data
                    })
                },2000)
            } else{
                layer.msg(res.msg, {
                    offset:'t',
                    icon: 5,
                    time: 2000
                });
            }
        })
    }

    
    logout() {
        $.post(`${cfg.url}/logout`).done((res) => {
            console.log(res);
            let {code, data} = res;
            if(code == 0){
                this.setState({
                    myInfo: null
                })
            }
        })
    }

    toggleMask() {
        let _body = $("body");
        if(_body.width() >= 768) return;

        if(_body.hasClass("maskIn")){
            _body.removeClass("maskIn");
        } else{
            _body.addClass("maskIn");
        }
    }

    maskTouchMove(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    }

    componentDidMount() {
        $.post(`${cfg.url}/autologin`).done((res) => {
            let {code, data} = res;
            if(code == 0){
                this.setState({
                    myInfo: data
                })
            }
            this.setState({
                hasLoginReq: true
            })
        })
    }

    render() {
        let {siginInAjax, siginUpAjax, logout, toggleMask, maskTouchMove} = this;
        let {signInMsg, myInfo, hasLoginReq} = this.state;

        if(!hasLoginReq){
            return(
                <div></div>
            )
        }

        return (
            <div>
                <Nav {...{myInfo, logout, toggleMask, maskTouchMove}}/>
                <div className="mask" onTouchMove={maskTouchMove}></div>
                <Route exact path="/" component={Home}/>
                <Route path="/details" component={Details}/>
                <Route path="/list" component={List}/>
                <Route path="/boxOffice" component={BoxOffice}/>
                <Route path="/about" render={
                    (props) => (
                        myInfo ? <About /> : <Redirect to="/sign_in"/>
                    )
                } />
                <Route path="/sign_in" render={
                    (props) => (
                        myInfo ? <Redirect to="/"/> : <SignIn {...{siginInAjax}} />
                    )
                } />
                <Route path="/sign_up" render={
                    (props) => (
                        myInfo ? <Redirect to="/"/> : <SignUp {...{siginUpAjax}} />
                    )
                } />
            </div>
        )
    }
}