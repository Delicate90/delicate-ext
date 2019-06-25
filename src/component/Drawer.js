import React from 'react';
import Async from './Async'
import {
    Drawer
} from 'antd'
import PropTypes from 'prop-types'

class _Drawer extends Async {

    static propTypes = {
        getRef: PropTypes.func.isRequired
    };

    state = {
        visible: false,
        confirmLoading: false,
        title: '',
        width: 1000,
        modalConfig: {}
    };

    show = async (title, drawerConfig = {})=> {
        await this.setStateAsync({
            title,
            visible: true,
            drawerConfig
        })
    };

    handleClose = async _=> {
        await this.setStateAsync({
            title: '',
            visible: false,
            drawerConfig: {}
        })
    };

    render() {
        const children = this.template();
        const {modalConfig = {}, ...other} = this.state;
        this.props.getRef(this);
        const config = {...other, ...modalConfig};
        return (
            <Drawer {...config} onClose={this.handleClose}>
                {children}
            </Drawer>
        )
    }
}

export default _Drawer