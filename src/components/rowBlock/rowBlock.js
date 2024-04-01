import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlock = ({left, right}) => {
    return(
        <Row>
            <Col xs='12' md='12' lg='7' className='order-2 order-lg-1'>
                {left}
            </Col>
            <Col xs='12' md='12' lg='5' className='order-1 order-lg-2'>
                {right}
            </Col>
        </Row>
    )
}
export default RowBlock;