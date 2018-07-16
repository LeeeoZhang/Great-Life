import React, {Fragment} from 'react'
import {Step, Grid,Affix} from '@icedesign/base'
import Step1Form from './Step1Form'
import Step2Form from './Step2Form'
import Step3Form from './Step3Form'
import Step4Form from './Step4Form'


const {Row, Col} = Grid

export default class GoodsForm extends React.Component {

  static displayName = 'GoodsForm'

  constructor (props) {
    super(props)
    this.state = {}
  }


  renderForm = step => {
    const {step1Data,step2Data,step3Data,step4Data,nextStep,preStep,onReportData,backFromEdit,type} = this.props
    const {goodsNavList,shopIdList,__loading,postStep1Data} = this.props
    switch (step) {
      case 0:
        return (<Step1Form
          type={type}
          step1Data={step1Data}
          shopIdList={shopIdList}
          goodsNavList={goodsNavList}
          __loading={__loading}
          nextStep={nextStep}
          postStep1Data={postStep1Data}
          onReportData={onReportData}
          backFromEdit={backFromEdit}
        />)
      case 1:
        return (<Step2Form
          type={type}
          step1Data={step1Data}
          step2Data={step2Data}
          __loading={__loading}
          nextStep={nextStep}
          preStep={preStep}
          onReportData={onReportData}
          backFromEdit={backFromEdit}
        />)
      case 2:
        return (<Step3Form
          type={type}
          step3Data={step3Data}
          __loading={__loading}
          nextStep={nextStep}
          preStep={preStep}
          onReportData={onReportData}
          backFromEdit={backFromEdit}
        />)
      case 3:
       return (<Step4Form
         type={type}
         step1Data={step1Data}
         step4Data={step4Data}
         __loading={__loading}
         preStep={preStep}
         onReportData={onReportData}
         backFromEdit={backFromEdit}
       />)
      default :
        return null
    }
  }

  render () {
    const {step} = this.props
    return (
      <Row type="wrap">
        <Col xxs="24" s="3" l="3">
          <Affix
            offsetTop={50}
          >
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
          </Affix>
        </Col>
        <Col xxs="24" s="21" l="21">
          {this.renderForm(step)}
        </Col>
      </Row>
    )
  }
}
