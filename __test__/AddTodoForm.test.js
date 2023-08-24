import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddTodoForm from '../components/AddTodoForm';
import '@testing-library/jest-dom';

// モックされたReduxストアを作成
const mockStore = configureStore([]);

describe('AddTodoForm コンポーネントのテスト', () => {
    let store;
    let component;

    beforeEach(() => {
        // 初期状態のステートを作成
        const initialState = {};

        // モックされたストアを作成
        store = mockStore(initialState);

        // テスト対象のコンポーネントをレンダリング
        component = render(
            <Provider store={store}>
                <AddTodoForm />
            </Provider>
        );
    });

    it('クリアボタンがクリックされると、入力がリセットされること', () => {
        // テキスト入力フィールドに値を入力
        const inputField = component.container.querySelector('input[type="text"]');
        userEvent.type(inputField, 'テストの内容');

        // クリアボタンを取得してクリックイベントを発火
        const clearButton = component.getByText('クリア');
        fireEvent.click(clearButton);

        // テキスト入力がリセットされていることを検証
        expect(inputField.value).toBe('');
    });

    it('追加ボタンが無効であること', () => {
        // 追加ボタンが無効であることを検証
        const addButton = component.getByText('追加');
        expect(addButton).toBeDisabled();
    });

    it('追加ボタンが有効になること', () => {
        // テキスト入力フィールドに値を入力
        const inputField = component.container.querySelector('input[type="text"]');
        userEvent.type(inputField, 'テストの内容');

        // 追加ボタンが有効になることを検証
        const addButton = component.getByText('追加');
        expect(addButton).toHaveAttribute('disabled', "");
    });

});
