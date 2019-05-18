/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    // Caso já existam repositórios no localStorage, eles serão retornados.
    repositories: JSON.parse(localStorage.getItem('repositories')) || [],
  };

  handeAddRepository = async (e) => {
    // Impede o carregamento automatico da página no submit
    e.preventDefault();
    this.setState({ loading: true });

    try {      
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      // Salva o repositório no localStorage do Browser do usuário.
      if (typeof Storage !== 'undefined') {
        if (localStorage.getItem('repositories') === null) {
          localStorage.setItem('repositories', JSON.stringify([]));
        }

        this.setState({
          repositoryInput: '',
          repositories: [...JSON.parse(localStorage.getItem('repositories')), repository],
          repositoryError: false,
        });

        localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
      } else {
        this.setState({
          repositoryInput: '',
          repositories: [...this.state.repositories, repository],
          repositoryError: false,
        });
      }
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  removeRepository = (repoId) => {

    var repos = this.state.repositories;
    var index = repos.indexOf(repos.find((repository) => {
      return repository.id === repoId;
    }));    

    if (index > -1) {
      repos.splice(index, 1);

      // Caso o navegador suporte localStorage, este será usado para armazenar os repositórios
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('repositories', JSON.stringify(repos));

        this.setState({
          repositories: [...JSON.parse(localStorage.getItem('repositories'))],
        })
      } else {
        this.setState({
          repositories: [...repos],
        })
      }
    }   
  };

  refreshRepository = async (repoId) => {

    var repos = this.state.repositories;
    var index = repos.indexOf(repos.find((repository) => {
      return repository.id === repoId;
    }));

    if (index > -1) {
      const { data: repository } = await api.get(`/repos/${repos[index].full_name}`); 
      
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      repos[index] = repository;
      
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('repositories', JSON.stringify(repos));

        this.setState({
          repositories: [...JSON.parse(localStorage.getItem('repositories'))],
        })

      } else {
        this.setState({
          repositories: [...repos],
        })
      }
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handeAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}
          </button>
        </Form>
        <CompareList 
          repositories={this.state.repositories}  
          remove={this.removeRepository} 
          refresh={this.refreshRepository} />
      </Container>
    );
  }
}
