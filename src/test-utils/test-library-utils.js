import { render } from '@testing-library/react';
import AllTheProviders from '../components/AllTheProviders';

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };

export * from '@testing-library/react';
