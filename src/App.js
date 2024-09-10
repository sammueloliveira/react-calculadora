import Input from './components/Input/index';
import Button from './components/Button/index';

import { Container, Content, Row } from "./components/Styles";
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber(null);
    setOperator(null);
  };

  const handleAddNumber = (num) => {
    setCurrentNumber(prev => prev === '0' ? num : `${prev}${num}`);
  };

  const handleSetOperator = (op) => {
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
    } else if (operator) {
      const result = calculateResult();
      setFirstNumber(result);
      setCurrentNumber('0');
    }
    setOperator(op);
  };

  const handlePercentage = () => {
    if (firstNumber !== null && operator !== null) {
      const result = calculateResult();
      setCurrentNumber(String(Number(result) / 100));
      setFirstNumber(null);
      setOperator(null);
    } else {
      setCurrentNumber(String(Number(currentNumber) / 100));
    }
  };

  const calculateResult = () => {
    switch (operator) {
      case '+':
        return (Number(firstNumber) + Number(currentNumber)).toString();
      case '-':
        return (Number(firstNumber) - Number(currentNumber)).toString();
      case '*':
        return (Number(firstNumber) * Number(currentNumber)).toString();
      case '/':
        return (Number(firstNumber) / Number(currentNumber)).toString();
      default:
        return currentNumber;
    }
  };

  const handleEqual = () => {
    if (firstNumber !== null && operator !== null) {
      const result = calculateResult();
      setCurrentNumber(result);
      setFirstNumber(null);
      setOperator(null);
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="C" onClick={handleOnClear} />
          <Button label="%" onClick={handlePercentage} />
          <Button label="/" onClick={() => handleSetOperator('/')} />
          <Button label="x" onClick={() => handleSetOperator('*')} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="-" onClick={() => handleSetOperator('-')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="+" onClick={() => handleSetOperator('+')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="=" onClick={handleEqual} />
        </Row>
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="." onClick={() => handleAddNumber('.')} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
