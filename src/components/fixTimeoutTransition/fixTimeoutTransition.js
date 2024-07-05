/* import Router from 'next/router'

export const fixTimeoutTransition = (timeout) => {
    Router.events.on('beforeHistoryChange', () => {
        const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
        const copies = [...nodes].map((el) => el.cloneNode(true));

        for (let copy of copies) {
            copy.removeAttribute('data-n-p');
            copy.removeAttribute('data-n-href');

            document.head.appendChild(copy);
        }

        const handler = () => {
            Router.events.off('routeChangeComplete', handler);

            window.setTimeout(() => {
                for (let copy of copies) {
                    if (document.head.contains(copy)) {
                        document.head.removeChild(copy);
                    }
                }
            }, timeout);
        };

        Router.events.on('routeChangeComplete', handler);
    });
}; */