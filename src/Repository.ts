export default class Repository {
  public images: Hash<HTMLImageElement> = {};

  public loadImage(label: string, url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = url;
      image.onload = () => {
        this.images[label] = image;
        resolve(image);
      };
      image.onerror = (err) => {
        reject(err);
      };
    });
  }
}
