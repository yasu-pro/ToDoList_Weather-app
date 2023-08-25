import React from 'react';
import { deleteTodo, completeTodo, showEditForm} from "../redux/todosReducer";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from './test-data/todos';
import TodoItem from "../components/TodoItem";

const mockStore = configureStore([]);

describe('TodoItem コンポーネント', () => {
    let store;

    beforeEach(() => {
        // モックされたストアを作成
        store = mockStore(initialState);

        // テスト対象のコンポーネントをレンダリング
        render(
            <Provider store={store}>
                <TodoItem todo={ initialState.todos.listData.c3iuwvt } />
            </Provider>
        );
    });

    it('完了ボタンをクリックすると完了状態が切り替わること', () => {
        const completeButton = screen.getByText('完了');

        fireEvent.click(completeButton);

        // アクションをディスパッチした後の dispatchedActions を取得
        const dispatchedActions = store.getActions();

        // アクションオブジェクトを定義
        const expectedAction = completeTodo({id: 'c3iuwvt', isComplete: true});

        // アクションがディスパッチされたことを確認
        expect(dispatchedActions[0]).toEqual(expectedAction);
    });

    it('編集ボタンをクリックすると編集フォームが表示されること', () => {
        const editButton = screen.getByText('編集');

        fireEvent.click(editButton);

        // 編集フォームが表示されていることを確認
        const editForm = screen.getByText('編集');
        expect(editForm).toBeInTheDocument();
    });

    it('削除ボタンをクリックすると削除アクションがディスパッチされること', () => {
        const deleteButton = screen.getByText('削除');

        fireEvent.click(deleteButton);

        // アクションをディスパッチした後の dispatchedActions を取得
        const dispatchedActions = store.getActions();

        // 削除アクションが含まれているか確認
        expect(dispatchedActions).toContainEqual(deleteTodo("c3iuwvt"));
    });

});
