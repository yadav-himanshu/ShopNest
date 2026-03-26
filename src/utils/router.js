export class Router {
    constructor(rootElement) {
        this.root = rootElement;
        this.routes = {};
        this.currentView = null;
    }

    addRoute(path, ViewClass, guard = null) {
        this.routes[path] = { ViewClass, guard };
    }

    start() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());

        // Intercept link clicks to convert to hash-based navigation if needed
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.getAttribute('href')) {
                const href = link.getAttribute('href');

                // If it's a relative path starting with / (internal link)
                if (href.startsWith('/') && !href.startsWith('//')) {
                    e.preventDefault();
                    this.navigate(href);
                }
            }
        });

        // Initialize on first load
        if (!window.location.hash) {
            window.location.hash = '#/';
        }
        this.handleRoute();
    }

    navigate(path) {
        // Core path is expected as /path
        // If path already starts with #, just use it
        if (path.startsWith('#')) {
            window.location.hash = path;
        } else {
            // Ensure path starts with /
            const cleanPath = path.startsWith('/') ? path : '/' + path;
            window.location.hash = '#' + cleanPath;
        }
    }

    handleRoute() {
        // Extract path from hash: #/login?id=1 -> /login
        let hash = window.location.hash || '#/';
        let path = hash.slice(1) || '/';

        // Strip query params for route matching
        const [cleanPath, queryString] = path.split('?');

        let route = this.routes[cleanPath];

        if (!route) {
            // Default to root
            route = this.routes['/'];
        }

        if (route) {
            // Check guard
            if (route.guard && !route.guard()) {
                return; // Guard handles redirect
            }

            // Unmount current view
            if (this.currentView && typeof this.currentView.unmount === 'function') {
                this.currentView.unmount();
            }

            this.root.innerHTML = '';
            // Pass root element and parsed params to constructor
            const params = new URLSearchParams(queryString || '');
            this.currentView = new route.ViewClass(this.root, params);

            // Render can be async
            const renderResult = this.currentView.render();
            if (renderResult instanceof Promise) {
                renderResult.catch(err => console.error("Render failed:", err));
            }

            window.scrollTo(0, 0);
        }
    }
}
