import React, {Component} from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';

const Field = ({item, field, label}) => {
    return (
        <li className="list-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
            <hr/>
        </li>
    )
}
export {
    Field
}
export default class ItemDetails extends Component {
    gotService = new gotService();
    state = {
        item: null
    }
    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }
    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
            // this.foo.bar = 0;
    }
    render() {
        if (!this.state.item) {
            return <span className='select-error'>Please select a object of interest</span>
        }
        const {item} = this.state;
        const {name} = item;
        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                   }
                </ul>
            </div>
        );
    }
}