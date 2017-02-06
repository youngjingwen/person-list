import React, { PropTypes } from 'react';
import axios from 'axios';
import Add from './Add';
import Modify from './Modify';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      data:[],
      show:false,
      editShow:false,
      editId:''
    }
  }
  componentWillMount(){
    axios.get('http://localhost:4000/persons')
    .then(res => this.setState({data:res.data.persons}))
  }
  handleCilck(newData){
    this.setState({
      show:!this.state.show,
      data:this.state.data.concat(newData)
    })
  }
  handleEdit(editData){
    var id = this.state.editId
    var index = this.state.data.findIndex( ele => ele._id==id)
    this.state.data.splice(index,1,editData)
    this.setState({
      editShow:!this.state.editShow,
      data:this.state.data
    })
  }
  handleAddCilck(){
    this.setState({
      show:!this.state.show
    })
  }
  handleEditClick(id){
    this.setState({
      editShow:!this.state.editShow,
      editId:id
    })
  }
  handleDelete(id){
    axios.delete(`http://localhost:4000/persons/${id}`)
    .then(res => this.setState({
      data:this.state.data.filter(function (element) {
        return element._id !== id
      })
    }))
  }
  render () {
    let personsList = this.state.data.map((item,i) =>
      <tr key={i}>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.gender=='m' ? '男' : '女'}</td>
        <td>{item.email}</td>
        <td><span className="edit" onClick={this.handleEditClick.bind(this,item._id)}>修改</span><span className="del" onClick={this.handleDelete.bind(this,item._id)}> 删除</span></td>
      </tr>
    )
    return(
      <div>
        <div className='header'>
          <h1>人员列表页面</h1>
        </div>
        <div className='cover' style={{display:this.state.show ? 'block' : this.state.editShow ? 'block' : 'none'}}></div>
        <div className='main'>
          <table className='person-list'>
            <tr>
              <th>姓名</th>
              <th>年龄</th>
              <th>性别</th>
              <th>Email</th>
              <th>操作</th>
            </tr>
            {personsList}
          </table>
          <span className="add-btn" onClick={this.handleAddCilck.bind(this)}>添加新人员</span>
          <Add show={this.state.show} handleShow={this.handleCilck.bind(this)} />
          <Modify show={this.state.editShow} id={this.state.editId} handleEditClick={this.handleEditClick.bind(this)} handleShow={this.handleEdit.bind(this)} />
        </div>
        <div className='footer'>
          <h3>BEFE coding test,2016</h3>
        </div>
      </div>
    )
  }
}

export default App;
