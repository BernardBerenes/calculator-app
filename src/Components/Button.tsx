import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
    label: string;
    width?: number;
    color: string;
    onclick: Function;
    help?: boolean;
}

const StyledButton = styled.button`
    color: white;
    border: none;
    border-radius: 60px;
    font-size: 20px;
    &:hover {
        cursor: pointer;
    }
`;

const Button: React.FC<Props> = (props) => {
    const styles: React.CSSProperties = {};
    const nav = useNavigate();
    if(props.width) {
        styles.gridColumnEnd = `span ${props.width}`;
    }
    if(props.color){
        styles.backgroundColor = "#" + props.color;
    }
    if(props.help){
        return <StyledButton onClick={() => nav('/Help')} style={styles}>{props.label}</StyledButton>
    }
    return <StyledButton onClick={() => props.onclick(props.label)} style={styles}>{props.label}</StyledButton>;
};

export default Button;