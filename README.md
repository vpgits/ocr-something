# Trying to parse some pdfs/images to ocr

Try it out locally. You'll need node.

1. Clone the repository by running the following command in your terminal:

   ```
   git clone https://github.com/vpgits/ocr-something.git
   ```

2. Navigate to the project directory:

   ```
   cd ocr-something
   ```

3. Install the required dependencies by running:

   ```
   npm install
   ```

4. Start the application by running:
   ```
   npm run dev
   ```

Now you can access the app locally and test it out. Enjoy!

This project is currently a work in progress. It is a simple Vite + React application, but it can be transformed into a Next.js app. The PDF.js and Tesseract.js work can be offloaded to a worker or a serverless function. It's worth noting that everything is done on the client side.
