import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {fetchTodos} from './redux/api'
import {DetailsIcon} from './assets/icons';


class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    todo: {},
    currentPage: 1,
    todosPerPage: 5, 
    show: false,
    showRowsPerPage: false,
    disablePage: false
  }
  this.handleClick = this.handleClick.bind(this);
  this.handleRowsPerPageClick = this.handleRowsPerPageClick.bind(this);

  this.open = this.open.bind(this);
  this.openRowsPerPage = this.openRowsPerPage.bind(this);

  this.handlePrev = this.handlePrev.bind(this);
  this.handleNext = this.handleNext.bind(this);

}


componentDidMount() {
  const {getTodos} = this.props;
  getTodos();
}

handlePrev() {
  const {todos}=this.props;
  const {currentPage, todosPerPage}=this.state;

        
        if(currentPage > 1) {
             this.setState({
       currentPage: currentPage - 1,
    })
        }
     

}

handleNext() {
  const {todos}=this.props;
  const {currentPage, todosPerPage}=this.state;
  let totaPage = [];
  totaPage = todos[todos.length-1];

  const pgn = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pgn.push(i);
        }

        
  if(currentPage  >= 1 && currentPage <= pgn.length) {
       this.setState({
 currentPage: currentPage + 1,
})
  } 

}

handleClick(event) {
  this.setState({
    currentPage: Number(event.target.id)
  });
}
handleRowsPerPageClick(event) {
  this.setState({
    todosPerPage: Number(event.target.id)
  });
}

open() {
  this.setState({
    show: !this.state.show
  });
}

openRowsPerPage() {
  this.setState({
    showRowsPerPage: !this.state.showRowsPerPage
  });
}

  render() {
    const {todos}=this.props;
    const { currentPage, todosPerPage, show, disablePage, showRowsPerPage } = this.state;
    

    const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        const totalTodos = todos.length;

        let snIndex = '';
        snIndex = currentPage * todosPerPage - todosPerPage;

let getPageNumFirstIndex = currentPage * todosPerPage - todosPerPage;
let pageNumFirstIndex = getPageNumFirstIndex +=1;

let i=0;
let getPageNumLastIndex = i += 1 * currentPage;
let pageNumLastIndex = todosPerPage * getPageNumLastIndex ;


        const renderTodos = currentTodos.map((todo, i) => (
          <tr key={todo.id}>
          <td>{i +=1 + snIndex}</td>
          <td>{todo.title}</td>
          <td>{todo.completed ? 'completed' : 'not completed'}</td>
          <td className='icons'><DetailsIcon/></td>
          
                            </tr>
        ));

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

 

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          ) 
        });

        const rowsPerPage = [];
        let a=5;
        for (let i = 10;  i <= 20;  i +=10) {
          rowsPerPage.push(i);
        }
        rowsPerPage.unshift(a)

        const renderRowsPerPage = rowsPerPage.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleRowsPerPageClick}
            >
              {number}
            </li>
          ) 
        });
      


    return (
      <div className='app'>
        <table>
          <thead>
            <tr>
              <td>s/n</td>
              <td>title</td>
              <td>status</td>
              <td>more</td>

            </tr>
          </thead>
      
        {renderTodos}
    
   </table>
        

   <div className='pagination'> 
                <div className='paginate'>
<button className='load-prev' onClick={this.handlePrev} disabled={disablePage}>&#10096;</button>
<span className='show-page'>page {pageNumFirstIndex} - {pageNumLastIndex} of {totalTodos}</span>

    <button className='page' onClick={this.open}>page: <span  className='page-num'>{currentPage}</span>
{show ? 
<ul  className='page-drop-down'>

{renderPageNumbers}
</ul> : ''
}
</button>
                
<button className='page' onClick={this.openRowsPerPage}>rows per page:  <span className='page-num'>{todosPerPage}</span>
{showRowsPerPage ? 
<ul  className='page-drop-down rowsperpage-dropdown'>

{renderRowsPerPage}
</ul> : ''

}
</button>

<button className='load-next' onClick={this.handleNext} disabled={disablePage}>&#10097;</button>
                </div> 


                </div> 

     
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.tableReducer.todosLoading,
    success: state.tableReducer.todosSuccess,
    successMessage:  state.tableReducer.todosSuccessMessage,
    todos:  state.tableReducer.todos &&
    state.tableReducer.todos,
    error:  state.tableReducer.todosError,
    errorMessage:  state.tableReducer.todosErrorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(fetchTodos())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
