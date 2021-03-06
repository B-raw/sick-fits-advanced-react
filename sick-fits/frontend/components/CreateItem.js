import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import SickButton from './styles/SickButton'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
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
    title: 'CoolShoes',
    description: 'I love those context',
    image: null,
    largeImage: null,
    price: 1000,
  };

  handleChange = (e) => {
    //get name type and value
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    // set state
    this.setState({ [name]: val })
  }

  uploadFile = async e => {
    const files = e.target.files;
    // if the user exits the file browser, they can get an error as this function continues to run. Also, any previous image shows in preview. The below if statement fixes that.
    if(files.length == 0) {
      this.setState({ image: null, largeImage: null });
      return;
    }
    const data = new FormData()
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits')

    const res = await fetch('https://api.cloudinary.com/v1_1/dfafgbqu9/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {/* the only child of a query or mutation can be a function. CreateItem is the mutationfunction.  */}
      {(createItem, { loading, error }) => (
        <Form onSubmit={async (e) => {
          //Stop the form from submitting
          e.preventDefault();
          //check if there is a pending file upload
          //to do
          // call the mutation
          const res = await createItem();
          //change the user to single item page
          Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id }
          })
        }}>
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">
              Image
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an Image"
                required
                onChange={this.uploadFile}
              />
              {this.state.image && <img width="200" src={this.state.image} alt="Upload Preview" />}
          </label>

          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              required
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Enter a Description"
              required
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <SickButton type="submit">Submit</SickButton>
        </fieldset>
      </Form>
      )}
    </Mutation>

    )
  }

}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
