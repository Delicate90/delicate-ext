import React from 'react'
import {
    Modal
} from 'antd'
import PropTypes from 'prop-types'

export default class SModal extends React.Component{

    static propTypes = {
        getRef: PropTypes.func
    };

    state = {
        visible: false,
        confirmLoading: false,
        title: '',
        width: 700,
        onOk: _=>{}
    };

    show = (title, onOk)=> {
        this.setState({
            title, onOk,
            visible: true
        })
    };
    hide = _=> {
        this.setState({
            visible: false,
            confirmLoading: false,
            title: '',
            width: 700,
            onOk: _=>{}
        })
    };
    cancel = _=> {
        this.setState({loading: false});
    };

    submit = async _=> {
        this.setState({loading: true});
        await this.submit(this.state.onOk)
    };

    render() {
        const children = this.template();
        this.props.getRef(this);
        return(
            <Modal {...this.state}
                   onCancel={this.hide}>
                {children}
            </Modal>
        )
    }
}