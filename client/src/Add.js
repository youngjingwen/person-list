import React, { PropTypes } from 'react';
import axios from 'axios';

class Add extends React.Component {
  constructor(){
    super();
    this.state={
      gender:''
    }
  }
  handleCilck(){
    this.props.handleShow()
  }
  handleSubmit(e){
    e.preventDefault();
    let name = this.refs.name.value
    let age = this.refs.age.value
    let gender =this.state.gender
    let email = this.refs.email.value
    console.log(name,age,gender,email);
    axios.post('http://localhost:4000/persons',{name,age,gender,email})
      .then(res => this.props.handleShow({name,age,gender,email}))
  }
  handleChange(e){
    this.setState({
      gender:e.target.value
    })
    console.log(this.state.gender);
  }
  render () {
    return(
      <div className='add-person' style={{display:this.props.show ? 'block' : 'none'}}>
        <h2>添加人员信息</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='field'>
            <label className="label">姓名</label><input className="input" type='text' name='name' ref='name' />
          </div>
          <div className='field'>
            <label className="label">年龄</label><input className="input" type='text' name='age' ref='age' />
          </div>
          <div className='field'>
            <label className="label">性别</label>
            <input name="gender" value="m" type="radio" onChange={this.handleChange.bind(this)} />男
            <input name="gender" value="f" type="radio" onChange={this.handleChange.bind(this)} />女
          </div>
          <div className='field'>
            <label className="label">Email</label><input className="input" type='text' name='email' ref='email' />
          </div>
          <div className='actions'>
            <button className='button'>提交</button>
            <span onClick={this.handleCilck.bind(this)} className='cancel'>取消</span>
          </div>
        </form>
      </div>
    )
  }
}

export default Add;
