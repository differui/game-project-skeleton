export default class Renderer {
  render(renderer: () => boolean) {
    const renderFrame = () => {
      if (!renderer()) {
        return;
      }
      requestAnimationFrame(renderFrame);
    };

    renderFrame();
  }
}
