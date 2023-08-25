import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from './test-data/todos';
import ClearAllButton from "../components/ClearAllButton";

// モックされたReduxストアを作成
const mockStore = configureStore([]);

describe('ClearAllButton コンポーネント', () => {
    let store;

    beforeEach(()=>{
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
        const originalConfirm = window.confirm;
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
        const originalConfirm = window.confirm;
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
