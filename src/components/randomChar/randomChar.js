import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {
    
    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }
    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        // const id = 13000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    render() {
        console.log('render');

        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null ;
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}
RandomChar.defaultProps = {
    interval: 15000
}
// RandomChar.propTypes = {
//     interval: (props, propName, componentName) => {
//         const value = props[propName];
//         if (typeof value === 'number' && !isNaN(value)) {
//             return null
//         } 
//         return new TypeError(`${componentName}: ${propName} must be number`)
//     }
// }
RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
        <h4> <img className='icons' src='/icons/arrow_left.svg' alt='vec'></img>
            Random Character 
            <img className='icons' src='/icons/arrow_right.svg' alt='vec'>
            </img><br/> 
            <span className='name'>{name}</span>
        </h4>
        <ul className="list-group list-group-flush">
            <li className="list-item">
                <span className="term">Gender </span>
                <span>{gender}</span>
                <hr/>
            </li>
            <li className="list-item">
                <span className="term">Born </span>
                <span>{born}</span>
                <hr/>
            </li>
            <li className="list-item">
                <span className="term">Died </span>
                <span>{died}</span>
                <hr/>
            </li>
            <li className="list-item">
                <span className="term">Culture </span>
                <span>{culture}</span>
                <hr/>
            </li>
        </ul>
        </>
    )
}