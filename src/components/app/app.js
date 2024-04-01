import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousePage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./app.css"
// import { Switch } from 'react-router-dom/cjs/react-router-dom.min';


export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    };
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }
    onToggleRandomChar = () => {
        this.setState((state) => {
            return {showRandomChar: !state.showRandomChar}
        });
    };
    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        if(this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <Router>
                <div className='app'> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col xs={12} lg={{size: 5, offset: 0}}>
                            {char}
                            <hr className='line-toggle'/>
                            <button 
                            onClick={this.onToggleRandomChar}
                            className='btn-toggle'><img className='img-toggle' src='/icons/toggle.svg' alt='toggle'></img></button>
                        </Col>
                    </Row>
                    <Switch>
                        <Route path='/' exact component={() => 
                            <div className='about'>                              
                                <h4> <img className='icons' src='/icons/arrow_left.svg' alt='vec'></img>ABOUT THE PROJECT<img className='icons' src='/icons/arrow_right.svg' alt='vec'></img></h4>
                                <div className='about_text'>An API of Ice And Fire is the world's greatest source for quantified and structured data from the universe of Ice and Fire (and the HBO series Game of Thrones). We give you access to data about all the Books, Characters and Houses!</div>
                            </div>
                        }></Route>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params
                            return <BooksItem bookId={id}/>}
                        }/>
                    </Switch>
                </Container>
                </div>
            </Router>
        );
    }
    
};
