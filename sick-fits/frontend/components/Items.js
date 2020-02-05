import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components'
import Item from './Item';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${ props => props.theme.maxWidth };
    margin: 0 auto;
    @media(max-width: 762px) {
        grid-template-columns: 1fr;
    }
`;

export default class Items extends Component {
    render() {
        return (
            <>
                <Query query={ ALL_ITEMS_QUERY }>
                    { ({ data, error, loading })  => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error ocurred  ):</p>;
                        return <ItemsList>
                            { data.items.map(item => <Item item={ item } key={ item.id }/>)}
                        </ItemsList>
                    }}
                </Query>
            </>
        )
    }
}
