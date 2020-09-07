import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Wrapper, Content } from './styles';
import logo from '../../assets/logo.png';
function Logar(props) {
  function handleSubmit({ token, name }) {
    props.history.push({
      pathname: '/home',
      state: { token: token, user: name },
    });
  }

  return (
    <Wrapper>
      <Content>
        <img src={logo} alt="git" />
        <a href="https://github.com/settings/tokens" target="_blank">
          Token github
        </a>
        <Form onSubmit={handleSubmit}>
          <Input name="name" type="fieldName" placeholder="Usuario" />

          <Input name="token" type="fieldName" placeholder="Token" />

          <button type="submit">Acessar</button>
        </Form>
      </Content>
    </Wrapper>
  );
}

export default Logar;
