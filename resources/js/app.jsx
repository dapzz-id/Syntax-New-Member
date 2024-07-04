import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import ErrorBoundary from './ErrorBoundary';
import '../css/app.css';
import '../css/style.css'
import './bootstrap';
import 'alpinejs';

const ComponentThatMightFail = () => {
    throw new Error('Error in component');
};

createInertiaApp({
    resolve: name => import(`./Pages/${name}`),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

InertiaProgress.init();