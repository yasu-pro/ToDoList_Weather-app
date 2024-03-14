import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoItem from "../components/TodoItem";
import { completeTodo, deleteTodo } from "../redux/todosReducer";
import { testTodo1 } from './test-data/testTodos';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('TodoItem コンポーネント', () => {
    let store;
    let component;


    beforeEach(() => {

        store = mockStore({
            todos: {
                listData: {
                    [testTodo1.id]: testTodo1
                }
            }
        });

        component = render(
            <Provider store={store}>
                <TodoItem todo={testTodo1} />
            </Provider>
        );
    });

    it('完了ボタンをクリックすると完了状態が切り替わること', () => {
        const completeButton = screen.getByText('完了');

        fireEvent.click(completeButton);

        // アクションがディスパッチされたことを確認
        const dispatchedActions = store.getActions();
        const expectedAction = completeTodo({ id: testTodo1.id, isComplete: true });
        expect(dispatchedActions[0]).toEqual(expectedAction);
    });

    it('削除ボタンをクリックすると削除アクションがディスパッチされること', () => {
        const deleteButton = screen.getByText('削除');

        fireEvent.click(deleteButton);

        // 削除アクションが含まれていることを確認
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toContainEqual(deleteTodo(testTodo1.id));
    });
});
