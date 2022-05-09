if (typeof window === 'undefined') {
  (async () => {
    const { server } = await import('../mocks/node');
    server.listen();
  })();
} else {
  (async () => {
    const { worker } = await import('../mocks/browser');
    worker.start();
  })();
}
export {};
