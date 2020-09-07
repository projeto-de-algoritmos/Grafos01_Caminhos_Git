import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Wrapper, Content } from './styles';
import logo from '../../assets/logo.png';
function Logar(props) {
  function handleSubmit({ name, password }) {
    props.history.push({
      pathname: '/home',
      state: { user: name, password },
    });
  }

  return (
    <Wrapper>
      <Content>
        <img src={logo} alt="git" />
        <Form onSubmit={handleSubmit}>
          <Input name="name" type="fieldName" placeholder=" Usuario" />
          <Input name="password" type="password" placeholder=" Senha" />

          <button type="submit">Acessar</button>
        </Form>
      </Content>
    </Wrapper>
  );
}

export default Logar;
