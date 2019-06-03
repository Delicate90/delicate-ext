import React from 'react'
import {
    Form
} from 'antd'
import PropTypes from 'prop-types'

export default class SForm extends React.Component{

    static propTypes = {
        getRef: PropTypes.func
    };

    set = this.props.form.setFieldsValue;

    get = this.props.form.getFieldsValue();

    validate = _=> {
        return new Promise((resolve, reject) => {
            this.props.form.validateFields((err, val)=>{
                if(err) {
                    reject(err)
                }else {
                    resolve(val)
                }
            })
        })
    };

    formConfig = _=> {
        return {}
    };

    render() {
        const config = this.formConfig();
        this.props.getRef(this);
        return(
            <Form {...config}>
                {this.template()}
            </Form>
        )
    }
}