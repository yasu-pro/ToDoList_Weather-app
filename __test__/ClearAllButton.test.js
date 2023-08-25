import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ClearAllButton from "../components/ClearAllButton";

// モックされたReduxストアを作成
const mockStore = configureStore([]);

describe('ClearAllButton コンポーネント', () => {
    let store;

    beforeEach(()=>{
        // 初期状態のステートを作成
        const initialState = {
            todos: {
                listData: {
                    c3iuwvt: {
                        id: 'c3iuwvt',
                        isEditFormVisible: false,
                        text: 'test',
                        completed: false,
                        dueDate: '2023年08月24日',
                        priority: '2',
                        addOrder: 1692860835709,
                        sortBy: 'addOrder',
                        sortOrder: 'asc'
                    },
                    hnn4qj0: {
                        id: 'hnn4qj0',
                        isEditFormVisible: false,
                        text: 'test2',
                        completed: false,
                        dueDate: '2023年08月24日',
                        priority: '3',
                        addOrder: 1692860842939,
                        sortBy: 'addOrder',
                        sortOrder: 'asc'
                    }
                }
            }
        }

        // モックされたストアを作成
        store = mockStore(initialState)

        // テスト対象のコンポーネントをレンダリング
        render(
            <Provider store={store}>
                <ClearAllButton />
            </Provider>
        )
    })

    it('ダイアログが表示されるかどうかのテスト', () => {
        const originalConfirm = window.confirm;
        // ダイアログが表示されたと仮定
        window.confirm = jest.fn().mockReturnValue(true);

        const clearAllButton = screen.getByTestId("clear-all-button");
        fireEvent.click(clearAllButton);

        expect(window.confirm).toHaveBeenCalledWith("タスクを全て削除します。一度削除すると元に戻せません。");

        // テスト後に元に戻す
        window.confirm = originalConfirm;
    });

    it('ダイアログのOKがクリックされると、storeの値が削除されること', () => {
        // ダイアログのOKがクリックされることをシミュレート
        window.confirm = jest.fn().mockReturnValue(true);

        // ClearAllButton をクリックしてアクションをディスパッチ
        const clearAllButton = screen.getByTestId("clear-all-button");
        fireEvent.click(clearAllButton);

        // アクションをディスパッチした後の dispatchedActions を取得
        const dispatchedActions = store.getActions();

        // dispatchedActions にアクションが含まれていることを確認
        expect(dispatchedActions).toContainEqual({ type: 'todos/clearAllTodos' });

        // テスト後に元に戻す
        window.confirm = originalConfirm;
    });

    it('ダイアログのキャンセルがクリックされると、storeの値はそのままであること', () => {
         // ダイアログのキャンセルがクリックされることをシミュレート
        window.confirm = jest.fn().mockReturnValue(false);

        // ClearAllButton をクリックしてアクションをディスパッチ
        const clearAllButton = screen.getByTestId("clear-all-button");
        fireEvent.click(clearAllButton);

        // アクションをディスパッチした後の dispatchedActions を取得
        const dispatchedActions = store.getActions();

        // dispatchedActions にアクションが含まれていないことを確認
        expect(dispatchedActions).toEqual([]);

        // テスト後に元に戻す
        window.confirm = originalConfirm;
    });
})
