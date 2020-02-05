import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router'

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION (
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;
class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0,
    }

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val })
    }
    uploadFile = async e => {
        console.log('uploading file...');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sick-fits-training');

        const res = await fetch('https://api.cloudinary.com/v1_1/drfdvlutd/image/upload', {
            method: 'POST',
            body: data,
        });
        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
        });
    };

    render () {
        return (
            <Mutation
                mutation={ CREATE_ITEM_MUTATION }
                variables={ this.state }
            >
                {(createItem, { loading, error, called, data }) => (

                <Form onSubmit={async e => {
                    e.preventDefault();
                    const res = await createItem();
                    Router.push({
                        pathname: '/item',
                        query: { id: res .data.createItem.id}
                    })
                }
                }>
                    <Error error={ error } />
                    <fieldset aria-busy={ loading }>
                        <label htmlFor="file">
                            Image
                            <input
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Upload an image"
                                required
                                onChange={this.uploadFile}
                            />
                            {this.state.image && (
                                <img width="200" src={this.state.image} alt="Upload Preview" />
                            )}
                        </label>
                        <label htmlFor="title">
                            Title
                            <input
                                type="title"
                                name="title"
                                placeholder="Enter your title."
                                required
                                onChange={ this.handleChange }
                                />
                        </label>
                        <label htmlFor="price">
                            Price
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter your price."
                                required
                                onChange={ this.handleChange }
                                />
                        </label>
                        <label htmlFor="description">
                            Description
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Enter your description."
                                required
                                onChange={ this.handleChange }
                                />
                        </label>
                        <button type="submit">
                            Submit
                        </button>
                    </fieldset>
                </Form>
            )}
        </Mutation>
        )
    }
}
export default CreateItem;
export { CREATE_ITEM_MUTATION };

// import React, { useState } from 'react';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
// import Form from './styles/Form';
// import formatMoney from '../lib/formatMoney';

// function CreateItem() {
//     const [item, setItem] = useState({
//         title: '',
//         description: '',
//         image: '',
//         largeImage: '',
//         price: 0,
//     })
//     const updateField = e => {
//         setItem({
//             ...item,
//             [e.target.name]: e.target.value
//         });
//     };

//     return (
//         <Form>
//             <fieldset>
//                 <label htmlFor="title">
//                     Title
//                     <input
//                         type="title"
//                         name="title"
//                         placeholder="Enter your title."
//                         onChange={ updateField }
//                         required
//                     />
//                 </label>
//             </fieldset>
//         </Form>
//     )
// }

// export default CreateItem;

