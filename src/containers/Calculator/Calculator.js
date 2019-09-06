import React, {Component } from 'react';
import Result from '../../components/Result/Result';
import Button from '../../components/UI/Button/Button';
import classes from './Calculator.module.css';

import safeEval from 'safe-eval';
class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyPads: {
                open: {
                    nameBtn:"(",
                    styleBtn:"Operator",
                    display: "("
                },
                ce: {
                    nameBtn:"CE",
                    styleBtn:"Clear",
                    display: "CE"
                },
                close: {
                    nameBtn: ")",
                    styleBtn: "Operator",
                    display: ")"
                },
                clear: {
                    nameBtn: "C",
                    styleBtn: "Clear",
                    display:"C"
                },
                numOne:{
                    nameBtn: "1",
                    styleBtn: "",
                    display: "1"
                },
                numTwo:{
                    nameBtn: "2",
                    styleBtn: "",
                    display: "2"
                },
                numThree:{
                    nameBtn: "3",
                    styleBtn: "",
                    display: "3"
                },
                add: {
                    nameBtn: "+",
                    styleBtn: "Operator",
                    display: "+"
                },
                numFour:{
                    nameBtn: "4",
                    styleBtn: "",
                    display: "4"
                },
                numFive:{
                    nameBtn: "5",
                    styleBtn: "",
                    display: "5"
                },
                numSix:{
                    nameBtn: "6",
                    styleBtn: "",
                    display: "6"
                }, 
                subtract: {
                    nameBtn: "-",
                    styleBtn:"Operator",
                    display: "-"
                },
                numSeven:{
                    nameBtn: "7",
                    styleBtn: "",
                    display: "7"
                },
                numEight:{
                    nameBtn: "8",
                    styleBtn: "",
                    display: "8"
                },
                numNine:{
                    nameBtn: "9",
                    styleBtn: "",
                    display: "9"
                },
                multiple: {
                    nameBtn:"*",
                    styleBtn: "Operator",
                    display: "x"
                },
                decimal: {
                    nameBtn: ".",
                    styleBtn: "Operator",
                    display: '.',
                },
                numZezo:{
                    nameBtn: "0",
                    styleBtn: "",
                    display: "0"
                },
                equal:{
                    nameBtn: "=",
                    styleBtn: "Operator",
                    display: "="
                },
                divide:{
                    nameBtn: "/",
                    styleBtn: "",
                    display: "/"
                }
            },
            result: '0'
        }
    }

    calculate = () => {
        let checkResult = this.state.result;
        let checkDot = false; 
        let regex = /.[0-9]*./g;
        let index = -1;
      
        if(regex.test(checkResult)){
            for(let i = 0 ; i< checkResult.length; i++){
                if(checkResult[i] ==='.'){
                    for(let j= i+1 ; j< checkResult.length; j++){
                        if(checkResult[j] === '+'|| checkResult[j] === '-'|| checkResult[j]=== '*' || checkResult[j] === '/')
                            break;
                        if(checkResult[j] === '.'){
                            index = j;
                            break;
                        }
                    }
                }
            }
          
            let temp = checkResult.split('');
            let final = '';
            for(let i = 0 ; i < temp.length; i++){
                if(i === index)
                    continue;
                final+=temp[i];
            }
            checkResult = final;
        }


        if(checkResult.indexOf('..') !== -1)
            checkDot = true;
        if(checkResult.indexOf('--') !== -1) 
            checkResult = checkResult.replace('--','+')
        if(checkResult.indexOf('*-+') !== -1)
            checkResult = checkResult.replace('*-+','+');
        if(checkResult.indexOf('..') !== -1)
            checkResult = checkResult.replace('..','.');
        if(checkResult.indexOf('++') !== -1)
            checkResult = checkResult.replace('++','+');
      
      
        try {
            let temp = (safeEval(checkResult) || "" ) + "";
            if(temp.indexOf('.') ===-1 && checkDot === true){
                temp = temp +'.0';
            }
            this.setState({
            // eslint-disable-next-line
            result: temp
            })
        } catch (e) {
            this.setState((prevState) => {
                return {...prevState, result: "error"}
            });
        }
    };
    
    

    reset = () => {
        this.setState((prevState) =>{
            return {...prevState, result: '0'}
        });
    };

    backspace = () => {
        if(this.state.result.length <=1){
            this.setState((prevState) =>{
                return {...prevState, result: '0'}
            });
        }else{
            this.setState((prevState) =>{
                return {...prevState, result: prevState.result.slice(0, -1)}
            });
        }
        
      };

    buttonClicked = (event, buttonIdentifier) => {
        switch(buttonIdentifier){
            case '=': this.calculate(); break;
            case 'C': this.reset(); break;
            case 'CE': this.backspace(); break;
            default: {
                let checkKey = false;
                if(this.state.result.indexOf('.') !== -1){
                    for(let i =0; i< this.state.result.length; i++){
                        if(this.state.result[i] === '+' || 
                            this.state.result[i] === '-' ||
                            this.state.result[i] === '*' ||
                            this.state.result[i] === '/'){
                                
                            checkKey = true; 
                            break;
                        }
                    }
                }

                if(checkKey=== false && this.state.result.indexOf('.') !== -1){
                    if(buttonIdentifier === '.')
                        return;
                }

                if(this.state.result === '0' && buttonIdentifier !== '.'){
                    this.setState((prevState) => ({...prevState, result: buttonIdentifier}));
                }else {
                    this.setState((prevState) => ({...prevState, result: prevState.result.concat(buttonIdentifier)}));
                }
            } break;
        }
    }


    render(){
        const arrKeyPads = [];
        for(var keyName in this.state.keyPads){
            arrKeyPads.push({
                id: keyName,
                config: this.state.keyPads[keyName]
            })
        }
        let listKeys = arrKeyPads.map(key =>(
            
            <Button 
                key={key.id} 
                name={key.config.nameBtn} 
                style={key.config.styleBtn}
                clicked={(event) => this.buttonClicked(event, key.config.nameBtn)}>
                {key.config.display}
            </Button>
        ));

        return (
            <div className={classes.Calculator}>
                <Result result={this.state.result}/>
                <div>{listKeys}</div>
            </div>);
    }
}
export default Calculator;