import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
    img {
        width: 180px
    }
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        font-style: normal;
        font-weight: 400;
        margin-right: 20px;
        font-size: 18px;
    }
    @media screen and (max-width: 576px) {
        flex-direction: column;
        margin-top: 30px
    }
`;

const Header = () => {
    return (
        <HeaderBlock>
            <HeaderTitle>
                <Link to="/">
                <img src='/img/logo_got.png' alt='logo'></img>
                </Link>
            </HeaderTitle>
            <HeaderLinks>
                <li>
                    <Link to='/characters/'>CHARACTERS</Link>
                </li>
                <li>
                    <Link to='/houses/'>HOUSES</Link>
                </li>
                <li>
                    <Link to='/books/'>BOOKS</Link>   
                </li>
            </HeaderLinks>
        </HeaderBlock>
    );
};

export default Header;