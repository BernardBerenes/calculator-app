import React, { useState } from "react";
import styled from "styled-components";
import "../Style/Support.css"

type Props = {
    className?: string;
    id?: string;
    content?: string;
    function?: Function;
}

const Container = styled.div`
    font-family: 'Arial';
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    display: flex;
`

const FormContainer = styled.div`
    width: 42%;
    height: 48%;
    background-color: black;
    color: white;
`
var FormWrapper = styled.form`
    display: flex;
    flex-direction: row;
`

const Left = styled.div`
    width: 50%;    
    margin-left: 10px;
`

const Right = styled.div`
    margin-left: 40px;
    width: 30%;
`

const Header1 = () => {
    return(
        <h1 className="support-header">Support Ticket Form</h1>
    )
}

const Header2: React.FC<Props> = (props) => {
    return(
        <h2 className={props.className}>{props.content}</h2>
    )
}

const Label: React.FC<Props> = (props) => {
    return(
        <label htmlFor={props.className} className={props.className} id={props.id}>{props.content}</label>
    )
}

const Support: React.FC<{}> = () => {

    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        topic: '',
        description: ''
    });
    const [disable, setDisable] = useState<boolean>(true);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });

        if(inputValues.firstName && inputValues.lastName && inputValues.email && inputValues.topic){
            setDisable(false);
            const test = document.getElementById('send-button')
            if(test){
                test.style.backgroundColor = '#F9A31B';
            }
        } else{
            setDisable(true);
            const test = document.getElementById('send-button')
            if(test){
                test.style.backgroundColor = '#585656';
            }
        }
    };

    const submit = () => {
        try {
            const form = document.getElementById('form-wrapper');
            const button = document.getElementById('send-button');
            const message = document.getElementById('message');
            if(form && button && message){
                form.style.display = 'none';
                button.style.display = 'none';
                message.style.display = 'flex';
            }
        } catch (error) {
            alert('Failed to Send')
        }
    }

    const getRandom = () => {
        let random = Math.floor(Math.random() * 9999) + 1
        return String(random).padStart(4, '0');
    }

    return(
        <Container>
            <FormContainer>
                <Header1 />
                <hr id="line"/>
                <FormWrapper id="form-wrapper">
                    <Left>
                        <div className="header-wrapper">
                            <Header2 className="form-header" content="Name" />
                            <span>*</span>
                        </div>
                        <div className="name-wrapper">
                            <div className="form-name">
                                <input onChange={handleInputChange} type="text" name="firstName" id="first-name" />
                                <Label className="name-label" content="First" />
                            </div>
                            <div className="form-name">
                                <input onChange={handleInputChange} type="text" name="lastName" />
                                <Label className="name-label" content="Last" id="last-name-label" />
                            </div>
                        </div>
                        <div className="header-wrapper">
                            <Header2 className="form-header" content="Email"/>
                            <span>*</span>
                        </div>
                        <div className="email-wrapper">
                            <input onChange={handleInputChange} type="email" name="email" autoComplete="none" />
                        </div>
                        <div className="header-wrapper">
                            <Header2 className="form-header" content="Topic" />
                            <span>*</span>
                        </div>
                        <p id="radio-text">What can we help you today?</p>
                        <div className="radio-wrapper">
                            <input checked={inputValues.topic === 'General'} onChange={handleInputChange} type="radio" name="topic" value='General' />
                            <Label className="general" content="General" />
                        </div>
                        <div className="radio-wrapper">
                        <input checked={inputValues.topic === 'Bug'} onChange={handleInputChange} type="radio" name="topic" value='Bug' />
                            <Label className="bug" content="Bug" />
                        </div>
                    </Left>
                    <Right>
                        <div className="header-wrapper">
                            <Header2 className="form-header" content="Description" />
                            <span id="optional">optional</span>
                        </div>
                        <textarea cols={35} rows={17} name="description" id="description" placeholder="Description Report" ></textarea>
                    </Right>
                </FormWrapper>
                <button onClick={submit} disabled={disable} type="submit" id="send-button">SEND</button>
                <div className="success-message" id="message">
                    <span className="success-text">Thank you for sending us your report, we will track the problem now</span>
                    <p className="ticket-number">ticket number: <span>{getRandom()}</span></p>
                </div>
            </FormContainer>
        </Container>
    )

}

export default Support;