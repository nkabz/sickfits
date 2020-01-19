import React, { Component } from 'react'

import Meta from './Meta';
import Header from './Header';

export default class Page extends Component {
    render() {
        return (
            <div>
                <Meta></Meta>
                <Header></Header>
                { this.props.children }
            </div>
        )
    }
}
