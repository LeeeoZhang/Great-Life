import React ,{Component,Fragment} from 'react'
import {Form,Field,DatePicker,Select,Button,Icon} from "@icedesign/base"

const FormItem = Form.Item
const {RangePicker} = DatePicker

export default class SearchForm extends Component {

  static displayName = 'SearchForm'

  constructor (){
    super()
    this.state = {
      searchType:'0',
      time:[],
    }
  }

  field = new Field(this, {
    onChange: (name, value) => {
      if(name === 'searchType' && value !== '3') {
        this.field.reset('time',true)
      }
      this.field.setValue(name, value)
      this.setState({[name]:value})
    }
  })

  onSearch = () => {
    const values = this.field.getValues()
    this.props.searching({
      searchType:values.searchType ? values.searchType : '0',
      time: values.time ? values.time : [],
    })
  }

  onClear = () => {
    this.setState ({
      searchType:'0',
      time:[],
    })
    this.field.reset(true)
    this.props.clear()
  }

  formatTimePicker = (data, dataStr) => dataStr

  render(){
    const init = this.field.init
    const {searchType} = this.state
    const {__loading} = this.props
    return (
      <Form direction="hoz" field={this.field} size="medium">
        <FormItem>
          <Select
            defaultValue={undefined}
            style={styles.select}
            placeholder="搜索类型"
            {...init('searchType')}
          >
            <Select.Option value="1">昨天和前天比</Select.Option>
            <Select.Option value="2">上个月和前个月比</Select.Option>
            <Select.Option value="3">自定义时间</Select.Option>
          </Select>
        </FormItem>
        {
          searchType === '3' ?
          (<FormItem>
            <RangePicker
              showTime
              {...init('time', {
                getValueFromEvent: this.formatTimePicker
              })}
            />
          </FormItem>) : null
        }
        <FormItem>
          <Button loading={__loading} style={styles.buttonSpace} type="primary" onClick={this.onSearch}><Icon
            type="search"/>搜索</Button>
          <Button loading={__loading} style={styles.buttonSpace} onClick={this.onClear}><Icon
            type="refresh"/>清空</Button>
        </FormItem>
      </Form>
    )
  }
}

const styles = {
  select: {
    width:'200px',
  },
  timePick: {
    width: '150px',
  },
  input: {
    width: '200px',
  },
  buttonSpace: {
    margin: '3px'
  },
}
