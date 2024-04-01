import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import gotService from '../../services/gotService';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


class BooksPage extends Component {
    gotService = new gotService();

    state = {
        error: false
    };
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}/> 
        const itemDetails = <span className='select-error'>Please select a object of interest</span>
        return ( <RowBlock left={itemList} right={itemDetails}/>
    
        )
    }
}
export default withRouter(BooksPage);