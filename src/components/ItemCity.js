import React, { Component } from 'react';


export default class Itemcity extends Component {

    render(){
        const { item} = this.props


        return (
            <div className="item-city" onClick={this.handlerClick.bind(this)}>{item.city}</div>
        )
    }

    handlerClick(){
        const {item, selectClick, autoClick } = this.props
        selectClick(item.city)
        autoClick()

    }

}


