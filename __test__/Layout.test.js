import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../components/Layout';

describe('Layout コンポーネント', () => {
    it('正しく子要素が表示されること', () => {
        const { getByTestId } = render(
            <Layout>
                <div data-testid="child">TodoList App</div>
            </Layout>
        );

        const childElement = getByTestId('child');
        expect(childElement.textContent).toBe('TodoList App');
    });
});
