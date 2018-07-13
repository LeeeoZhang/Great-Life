import React, {Fragment} from 'react'
import {Step, Grid,Affix} from '@icedesign/base'
import Step1Form from './Step1Form'
import Step2Form from './Step2Form'


const {Row, Col} = Grid

export default class GoodsForm extends React.Component {

  static displayName = 'GoodsForm'

  constructor (props) {
    super(props)
    this.state = {
      step: 1,
    }
  }

  nextStep = () => {
    this.setState({step: this.state.step + 1})
  }

  preStep = ()=> {
    this.setState({step: this.state.step - 1})
  }

  renderForm = step => {
    const {step1Data,step2Data,step3Data,step4Data} = this.props
    const {goodsNavList,shopIdList,__loading,postStep1Data} = this.props
    switch (step) {
      case 0:
        return (<Step1Form
          step1Data={step1Data}
          shopIdList={shopIdList}
          goodsNavList={goodsNavList}
          __loading={__loading}
          nextStep={this.nextStep}
          postStep1Data={postStep1Data}
        />)
      case 1:
        return (<Step2Form
          step1Data={step1Data}
          step2Data={step2Data}
          __loading={__loading}
          nextStep={this.nextStep}
          preStep={this.preStep}
        />)
      case 2:
        break
      case 3:
        break
      default :
        return null
    }
  }

  render () {
    const {step} = this.state
    return (
      <Row type="wrap">
        <Col xxs="24" s="3" l="3">
          <Step
            type="dot"
            direction="vertical"
            current={step}
          >
            <Step.Item title="step1"/>
            <Step.Item title="step2"/>
            <Step.Item title="step3"/>
            <Step.Item title="step4"/>
          </Step>
        </Col>
        <Col xxs="24" s="21" l="21">
          {this.renderForm(this.state.step)}
        </Col>
      </Row>
    )
  }
}
