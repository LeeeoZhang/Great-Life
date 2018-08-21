import React, {Fragment} from 'react'
import {Step, Grid,Affix} from '@icedesign/base'
import Step1Form from './Step1Form'
import Step2Form from './Step2Form'
import Step3Form from './Step3Form'
import Step4Form from './Step4Form'


const {Row, Col} = Grid

const StepForm = props => {
  const {step1Data,step2Data,step3Data,step4Data,nextStep,preStep,onReportData,backFromEdit,type,loading,isStock,step} = props
  const {goodsNavList,shopIdList,__loading,postStep1Data} = props
  switch (step) {
    case 0:
      return (<Step1Form
        type={type}
        isStock={isStock}
        step1Data={step1Data}
        shopIdList={shopIdList}
        goodsNavList={goodsNavList}
        __loading={__loading}
        loading={loading}
        nextStep={nextStep}
        postStep1Data={postStep1Data}
        onReportData={onReportData}
        backFromEdit={backFromEdit}
      />)
    case 1:
      return (<Step2Form
        type={type}
        isStock={isStock}
        step1Data={step1Data}
        step2Data={step2Data}
        __loading={__loading}
        loading={loading}
        nextStep={nextStep}
        preStep={preStep}
        onReportData={onReportData}
        backFromEdit={backFromEdit}
      />)
    case 2:
      return (<Step3Form
        type={type}
        isStock={isStock}
        step3Data={step3Data}
        __loading={__loading}
        loading={loading}
        nextStep={nextStep}
        preStep={preStep}
        onReportData={onReportData}
        backFromEdit={backFromEdit}
      />)
    case 3:
      return (<Step4Form
        type={type}
        isStock={isStock}
        step1Data={step1Data}
        step4Data={step4Data}
        __loading={__loading}
        loading={loading}
        preStep={preStep}
        onReportData={onReportData}
        backFromEdit={backFromEdit}
      />)
    default :
      return null
  }
}

export default class GoodsForm extends React.Component {

  static displayName = 'GoodsForm'

  constructor (props) {
    super(props)
    this.state = {}
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
          <StepForm {...this.props}/>
        </Col>
      </Row>
    )
  }
}
