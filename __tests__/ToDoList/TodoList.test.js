import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoList from '../components/TodoList'

describe('TodoList コンポーネント', () => {
    let store;
    let mockTodos;

    beforeEach(()=>{
        mockTodos = [
            { id: '1', text: 'test1', isComplete: false },
            { id: '2', text: 'test2', isComplete: true },
        ];

        const mockStore = configureStore([]);
        store = mockStore({});

        render(
            <Provider store={store}>
                <TodoList todos={mockTodos} />
            </Provider>
        );
    })

    it('Todoが表示されること', () => {
        const todoItems = screen.getAllByRole('listitem');
        expect(todoItems).toHaveLength(mockTodos.length);

        // モックのTodoが正しく表示されていることを確認
        todoItems.forEach((item, index) => {
            const todo = mockTodos[index];
            expect(item).toHaveTextContent(todo.text);
        });
    });

    it('Todoが空の場合、適切なメッセージが表示されること', () => {
        render(
            <Provider store={store}>
                <TodoList todos={[]} />
            </Provider>
        );

        const emptyMessage = screen.getByText('Todoを追加してください。');
        expect(emptyMessage).toBeInTheDocument();
    });
});
