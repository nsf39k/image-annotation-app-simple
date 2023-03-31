# Image Annotation App

A web application that allows users to upload a PNG or JPEG image, annotate objects within the image by drawing rectangles around them, label the objects, and download cropped images of the labeled objects. This is a simplier version of the image annotation app without user authentication or a front-end.

### Prerequisites

Ensure you have Node.js and npm installed on your local machine. You can download Node.js [here](https://nodejs.org/en/download/) and it comes with npm.

### Installation

1. Clone the repository:

```git clone https://github.com/nsf39k/image-annotation-app-simple.git```

2. Install the required dependencies:

```npm install```

3. Start the development server:

```npm start```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000) to try it out.

## Usage

1. Upload an image (PNG or JPEG) using the "Upload Image" section.
2. Annotate objects within the image by drawing rectangles around them and labeling them in the "Image Annotation" section.
3. Download cropped images of the labeled objects using the "Download Cropped Images" section.

## Built With

- [React](https://reactjs.org/) - The frontend JavaScript library
- [react-image-crop](https://github.com/DominicTobias/react-image-crop) - Image cropping library for React
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - File saving library for client-side JavaScript

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

