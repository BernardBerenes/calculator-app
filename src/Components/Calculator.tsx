import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
    background-color: #585657;
`;

const Wrapper = styled.div`
    background: black;
    padding: 30px 15px 15px 15px;
`;

const Grid = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(4, 60px);
    grid-template-rows: repeat(5, 60px);
`;

const Display = styled.div`
    color: white;
    display: flex;
    justify-content: end;
    align-items: end;
    height: 30px;
    font-size: 56px;
    margin-right: 15px;
    margin-bottom: 5px;
`;

const Calculator: React.FC<{}> = () => {
    const [displayValue, setDisplayValue] = useState<string>('0');
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [histories, setHistories] = useState<string[]>([]);
     
    const handleNumberClick = (number: string) => {
        if(displayValue === 'Err') return;
        else if(displayValue.length > 8) return;
        else if(displayValue === '0' && number === '0'){
            return;
        } else if(displayValue === '0' && number !== '0'){
            setDisplayValue(number);
        } else{
            setDisplayValue(displayValue + number);
        }
    }

    const handleOperatorClick = (operator: string) => {
        if(displayValue === 'Err') return;
        else if(currentValue === null){
            setCurrentValue(parseFloat(displayValue));
            setOperator(operator);
            setDisplayValue('0');
        } else if(operator !== null){
            const result = calculate(currentValue, parseFloat(displayValue), operator);
            setCurrentValue(result);
            setOperator(operator);
            setDisplayValue('0');
            setHistories([
                ...histories, result.toString()
            ]);
        }
    }

    const handleEqualsClick = () => {
        if(displayValue === 'Err') return;
        else if(currentValue !== null && operator !== null){
            if(operator == '/' && parseFloat(displayValue) == 0){
                setDisplayValue("Err");
                return;
            }
            let result = calculate(currentValue, parseFloat(displayValue), operator);
            setCurrentValue(null);
            setOperator(null);
            if(Number.isInteger(result)){
                setDisplayValue(result.toString());
                setHistories([
                    ...histories, result.toString()
                ]);
            } else{
                setDisplayValue(result.toFixed(2).toString());
                setHistories([
                    ...histories, result.toFixed(2).toString()
                ]);
            }
        }
    }

    const calculate = (number1: number, number2: number, operator: string): number => {
        switch (operator) {
            case '+':
                return number1 + number2;
            case '-':
                return number1 - number2;
            case 'X':
                return number1 * number2;
            case '/':
                return number1 / number2;
            default:
                return 0;
        }
    }

    const handleClearClicK = () => {
        setDisplayValue('0');
        setCurrentValue(null);
        setOperator(null);
    }

    const handleDeleteClick = () => {
        if(displayValue === 'Err') return;
        setDisplayValue(displayValue.slice(0, -1));
        console.log(displayValue.length);
        if(displayValue.length == 1){
            setDisplayValue('0');
        }
    }

    const handleHelpClick = () => {
        return;
    }

    return (
        <Container>
            <ul className="history-wrapper">
                {histories.map((history) => (
                    <li className="history">{history}</li>
                ))}
            </ul>
            <Display>{displayValue}</Display>
            <Wrapper>
                <Grid>
                <Button onclick={handleClearClicK} label="C" color="A5A5A5" />
                <Button onclick={handleDeleteClick} label="DEL" color="A5A5A5" />
                <Button onclick={handleHelpClick} label="?" color="836343" help = {true} />
                <Button onclick={handleOperatorClick} label="/" color="F9A31B" />
                <Button onclick={handleNumberClick} label="1" color="A5A5A5" />
                <Button onclick={handleNumberClick} label="2" color="A5A5A5" />
                <Button onclick={handleNumberClick} label="3" color="A5A5A5" />
                <Button onclick={handleOperatorClick} label="X" color="F9A31B" />
                <Button onclick={handleNumberClick} label="4" color="A5A5A5" />
                <Button onclick={handleNumberClick} label="5" color="A5A5A5" />
                <Button onclick={handleNumberClick} label="6" color="A5A5A5" />
                <Button onclick={handleOperatorClick} label="-" color="F9A31B" />
                <Button onclick={handleNumberClick} label="7" color="A5A5A5" />
                <Button onclick={handleNumberClick} label="8" color="A5A5A5" />
                <Button onclick={handleNumberClick} label="9" color="A5A5A5" />
                <Button onclick={handleOperatorClick} label="+" color="F9A31B" />
                <Button onclick={handleNumberClick} label="0" width={2} color="A5A5A5" />
                <Button onclick={handleEqualsClick} label="=" width={2} color="F9A31B" />
                </Grid>
            </Wrapper>
        </Container>
    );
};

export default Calculator;
