const initialState = [
    { id: 1, text: 'laundry' },
    { id: 2, text: 'shopping' }
    // ...
]

class List extends React.Component {

    state = {
        todos: initialState
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
                </ul>
            </div>
        )
    }

}

class List extends React.Component {

    state = {
        todos: initialState,
        filteredTodos: null
    }

    search(searchText) {
        const filteredTodos = this.state.todos.filter(todo => todo.text.indexOf(searchText) > 0)
        this.setState({ filteredTodos: filteredTodos })
    }

    render() {
        // get todos from state
        const {filteredTodos, todos} = this.state

        // if there are filtered todos use them
        const list = filteredTodos === null ? todos : filteredTodos

        return (
            <div>
                <SearchBox onChange={this.search} />
                <ul>
                    {list.map(todo => <li key={todo.id}>{todo.text}</li>)}
                </ul>
            </div>
        )
    }

}


class List extends React.Component {

    state = {
        todos: initialState,
        searchText: null
    }

    search(searchText) {
        this.setState({ searchText: searchText })
    }

    filter(todos) {
        if (!this.state.searchText) {
            return todos
        }

        return todos.filter(todo => todo.text.indexOf(this.state.searchText) > 0)
    }

    render() {
        const {todos} = this.state

        return (
            <div>
                <SearchBox onChange={this.search} />
                <ul>
                    {this.filter(todos).map(todo => <li key={todo.id}>{todo.text}</li>)}
                </ul>
            </div>
        )
    }

}