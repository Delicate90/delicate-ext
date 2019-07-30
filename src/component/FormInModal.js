import React from 'react'
import {
    Modal
} from 'antd'
import PropTypes from 'prop-types'
import Async from './Async'

export default class FormInModal extends Async{

    static propTypes = {
        getRef: PropTypes.func
    };

    state = {
        visible: false,
        confirmLoading: false,
        title: '',
        width: 700,
        onOk: _=>{},
        modalConfig: {}
    };

    show = async (title, onOk, modalConfig = {})=> {
        await this.setStateAsync({
            title, onOk,
            visible: true,
            modalConfig
        })
    };
    hide = async _=> {
        await this.setStateAsync({
            visible: false
        });
    };

    handleClose = async _=> {
        await this.setStateAsync({
            visible: false,
            confirmLoading: false,
            title: '',
            width: 700,
            onOk: _=>{},
            modalConfig: {}
        });
        this.props.form.resetFields()
    };

    cancel = async _=> {
        await this.setStateAsync({confirmLoading: false});
    };

    set = this.props.form.setFieldsValue;

    get = this.props.form.getFieldsValue;

    validate = _=> {
        return new Promise((resolve, reject) => {
            this.props.form.validateFields((err, val)=>{
                if(err) {
                    reject(err)
                }else {
                    this.setStateAsync({confirmLoading: true});
                    resolve(val)
                }
            })
        })
    };

    render() {
        const children = this.template();
        this.props.getRef(this);
        const {modalConfig = {}, ...other} = this.state;
        return(
            <Modal {...other}
                   {...modalConfig}
                   afterClose={this.handleClose}
                   onCancel={this.hide}>
                {children}
            </Modal>
        )
    }
}